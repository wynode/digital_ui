import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { styled, ThemeProvider, DarkTheme, LightTheme } from "baseui"
import { Theme } from "baseui/theme"
import { Button, KIND } from "baseui/button"
// import Logo from "~/components/Icons/Logo"
import Logo from "./logo.jpg"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import Play from "~/components/Icons/Play"
import { Block } from "baseui/block"
import { useEditor } from "@layerhub-io/react"
import useEditorType from "~/hooks/useEditorType"
import { IScene } from "@layerhub-io/types"
import loading from "~/components/Logo/loading.gif"
import useAppContext from "~/hooks/useAppContext"
import { loadTemplateFonts } from "~/utils/fonts"
import { loadVideoEditorAssets } from "~/utils/video"
import DesignTitle from "./DesignTitle"
import { IDesign } from "~/interfaces/DesignEditor"
import { getDefaultTemplate } from "~/constants/design-editor"
import { nanoid } from "nanoid"
import {
  postWebcast,
  patchVideo,
  patchWebcast,
  postVideo,
  getVideosById,
  getWebcastById,
  generateLiveNew,
  getVideoProgress,
  generateVideo,
  postVideoTemplate,
} from "~/apis/main"
import Github from "~/components/Icons/Github"
import { message } from "antd"
import { Navigate, useNavigate } from "react-router-dom"
import { BACK_API_ASSETS } from "~/config"

const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  height: "64px",
  background: $theme.colors.black,
  display: "grid",
  padding: "0 1.25rem",
  gridTemplateColumns: "380px 1fr 380px",
  alignItems: "center",
}))

const Navbar = () => {
  const {
    setDisplayPreview,
    setScenes,
    setCurrentDesign,
    currentDesign,
    scenes,
    uploadAudio,
    uploadText,
    uploadVoice,
    uploadLanguage,
    uploadVoiceName,
    templateId,
    uploadScript,
    uploadVtuber,
    uploadLive,
    setTemplateId,
    setUploadVoice,
    setUploadScript,
    setUploadVtuber,
    setUploadLanguage,
    setUploadVoiceName,
    setUploadFile,
    setUploadLive,
    setUploadText,
    setCurrentScene,
    setUploadAudio,
  } = useDesignEditorContext()

  const editorType = useEditorType()
  const editor = useEditor()
  const inputFileRef = React.useRef<HTMLInputElement>(null)

  const originToUpload = (origin: any, otype: string, text?: any) => {
    const mapType: any = {
      StaticImage: "Image",
      StaticText: "Text",
      StaticVideo: "Video",
    }

    const getLayerType = (layer: any) => {
      if (layer.src && layer.src.includes("?vtuber=true")) {
        return "Vtuber"
      } else {
        return mapType[layer.type] ? mapType[layer.type] : layer.type
      }
    }
    return {
      id: origin.id,
      name: origin.name,
      frame: {
        width: origin.frame.width,
        height: origin.frame.height,
        fps: 25,
        backgroundAudio: null,
      },
      wenan: text || uploadText,
      scenes: [
        {
          trans: "WaterWave",
          transDuration: 1.5,
          backgroundColor: origin.scenes[0].layers[0].fill,
          script: {
            content: origin.scenes[0].script.content,
            audio: origin.scenes[0].script.audio,
            voice: origin.scenes[0].script.voice,
            vtuber: origin.scenes[0].script.vtuber,
            video: origin.scenes[0].script.video,
            language: origin.scenes[0].script.language,
            voiceName: origin.scenes[0].script.voiceName,
          },
          layers: origin.scenes[0].layers.map((layer: any) => {
            let result: any = {
              id: layer.id,
              type: getLayerType(layer),
              left: layer.left,
              top: layer.top,
              width: layer.width,
              height: layer.height,
              opacity: layer.opacity,
              scaleX: layer.scaleX,
              scaleY: layer.scaleY,
            }
            if (layer.src && layer.src.includes("?vtuber=true")) {
              result.url = layer.src.split("?vtuber=true")[1] || layer.metadata.url
              result.vtuber_img = `${layer.src.split("?vtuber=true")[0]}?vtuber=true`
            } else {
              result.url = layer.src
            }
            if (layer.type === "StaticText") {
              result = {
                ...layer,
                id: layer.id,
                type: "Text",
                content: layer.text,
                left: layer.left,
                top: layer.top,
                width: layer.width,
                height: layer.height,
                fontFamily: layer.fontFamily,
                color: layer.fill,
                backgroundColor: "#ffffff",
                opacity: layer.opacity,
              }
            } else if (layer.type === "Background") {
              result = { ...layer }
            }
            return result
          }),
        },
      ],
      type: otype,
      metadata: {},
      preview: false,
    }
  }

  const parseGraphicJSON = (otype: string) => {
    const currentScene = editor.scene.exportToJSON()

    const updatedScenes = scenes.map((scn) => {
      if (scn.id === currentScene.id) {
        return {
          id: currentScene.id,
          name: currentScene.name,
          script: {
            content: uploadText,
            audio: uploadAudio,
            voice: uploadVoice,
            language: uploadLanguage,
            voiceName: uploadVoiceName,
          },
          layers: currentScene.layers,
        }
      }
      return {
        id: scn.id,
        name: scn.name,
        script: {
          content: uploadText,
          audio: uploadAudio,
          voice: uploadVoice,
          language: uploadLanguage,
          voiceName: uploadVoiceName,
        },
        layers: scn.layers,
      }
    })

    if (currentDesign) {
      const graphicTemplate: IDesign = {
        id: currentDesign.id,
        type: otype,
        name: currentDesign.name,
        frame: currentDesign.frame,
        scenes: updatedScenes,
        metadata: {},
        preview: false,
      }

      const formattedJsonData = originToUpload(graphicTemplate, otype)
      // makeDownload(formattedJsonData)
      return formattedJsonData
    } else {
      console.log("NO CURRENT DESIGN")
    }
  }

  const [intervalId, setIntervalId] = React.useState<any>(null)
  const [editLoading, setEditLoading] = React.useState<any>(false)

  const downloadLiveOrderVideo = async () => {
    if (location.pathname.includes("video")) {
      const templetData = await saveLiveOrVideoTemplate()
      const payload = {
        video_id: templetData.data.id,

        // method: "generate",
      }
      await generateVideo(payload)
      message.success("已下发生成任务，请到个人中心视频列表等待查看。")
      setTimeout(() => {
        document.title = "AI 工具_视频 - 探形  - 把工作交给数字人"
        navigate("/personal/video")
      })
      // if (taskData.data) {
      //   const startTime = new Date().getTime()
      //   const interId = setInterval(async () => {
      //     const progressData: any = await getVideoProgress({ taskId: taskData.data.id })
      //     if (progressData.file_id) {
      //       makeDownloadVideo(`${BACK_API_ASSETS}${progressData.file_id}`)
      //       clearInterval(interId)
      //       clearInterval(interId)
      //     }
      //     if (new Date().getTime() - startTime > 30000) {
      //       clearInterval(interId)
      //     }
      //   }, 3000)
      //   setIntervalId(interId)
      // }
    } else {
      if (!uploadScript) {
        message.error("请选择直播文案")
        return
      }
      // const scriptArray = uploadScript.split("---")
      uploadLive.map(async (item: any) => {
        const templetData = await saveLiveTemplate(item.split("--")[1], item.split("--")[0], item.split("--")[3])
        const payload = {
          webcast: templetData.data.id,
          script: item.split("--")[2],
        }
        await generateLiveNew(payload)
      })
      message.success("已下发生成任务，请到个人中心直播列表等待查看。")
      setTimeout(() => {
        document.title = "AI 工具_直播 - 探形  - 把工作交给数字人"
        navigate("/personal/live")
      })
      // if (taskData.data.id) {
      //   const interId = setInterval(async () => {
      //     const progressData: any = await getVideoProgress({ taskId: taskData.data.id })
      //     if (progressData.file_id) {
      //       makeDownloadVideo(`${BACK_API_ASSETS}${progressData.file_id}`)
      //       clearInterval(interId)
      //     }
      //   }, 3000)
      //   setIntervalId(interId)
      // }
    }
  }
  // 保存模版
  const saveLiveOrVideoTemplate = async () => {
    if (location.pathname.includes("video")) {
      if (!uploadText) {
        message.warning("请填写文案")
        return
      }
      if (!uploadLanguage) {
        message.warning("请选择数字人声音")
        return
      }
      const formData: any = parseGraphicJSON("VIDEO")
      const payload = {
        ratio: "16:9",
        is_template: false,
        cover: null,
        result: null,
        video_data: formData,
      }
      const video_id = location.pathname.split("video/")[1]
      let res: any
      if (video_id) {
        res = await patchVideo(video_id, payload)
      } else {
        res = await postVideo(payload)
      }
      message.success("保存视频模版成功")
      if (res.data.id) {
        setTemplateId(res.data.id)
      }
      return res
    } else {
      const formData: any = parseGraphicJSON("GRAPHIC")
      const payload = {
        ratio: "9:16",
        is_template: false,
        video_data: formData,
      }
      const live_id = location.pathname.split("live/")[1]
      let res: any
      if (live_id) {
        res = await patchWebcast(live_id, payload)
      } else {
        res = await postWebcast(payload)
      }
      message.success("提交直播模版成功")
      if (res.data.id) {
        setTemplateId(res.data.id)
      }
      return res
    }
  }

  const saveLiveTemplate = async (text: any, voice: any, audio: any) => {
    const currentScene = editor.scene.exportToJSON()

    const updatedScenes = scenes.map((scn) => {
      if (scn.id === currentScene.id) {
        return {
          id: currentScene.id,
          name: currentScene.name,
          script: {
            content: text,
            audio: audio,
            voice: voice,
            language: uploadLanguage,
            voiceName: uploadVoiceName,
          },
          layers: currentScene.layers,
        }
      }
      return {
        id: scn.id,
        name: scn.name,
        script: {
          content: text,
          audio: audio,
          voice: voice,
          language: uploadLanguage,
          voiceName: uploadVoiceName,
        },
        layers: scn.layers,
      }
    })

    const graphicTemplate: IDesign = {
      id: currentDesign.id,
      type: "GRAPHIC",
      name: currentDesign.name,
      frame: currentDesign.frame,
      scenes: updatedScenes,
      metadata: {},
      preview: false,
    }

    const formData = originToUpload(graphicTemplate, "GRAPHIC", text)
    const payload = {
      ratio: "9:16",
      is_template: false,
      video_data: formData,
    }
    const live_id = location.pathname.split("live/")[1]
    let res: any
    if (live_id) {
      res = await patchWebcast(live_id, payload)
    } else {
      res = await postWebcast(payload)
    }
    message.success("提交直播模版成功")
    if (res.data.id) {
      setTemplateId(res.data.id)
    }
    return res
  }

  const parsePresentationJSON = () => {
    const currentScene = editor.scene.exportToJSON()

    const updatedScenes = scenes.map((scn) => {
      if (scn.id === currentScene.id) {
        return {
          id: currentScene.id,
          duration: 5000,
          layers: currentScene.layers,
          name: currentScene.name,
        }
      }
      return {
        id: scn.id,
        duration: 5000,
        layers: scn.layers,
        name: scn.name,
      }
    })

    if (currentDesign) {
      const presentationTemplate: IDesign = {
        id: currentDesign.id,
        type: "PRESENTATION",
        name: currentDesign.name,
        frame: currentDesign.frame,
        scenes: updatedScenes,
        metadata: {},
        preview: false,
      }
      makeDownload(presentationTemplate)
    } else {
      console.log("NO CURRENT DESIGN")
    }
  }

  const parseVideoJSON = () => {
    const currentScene = editor.scene.exportToJSON()
    const updatedScenes = scenes.map((scn) => {
      if (scn.id === currentScene.id) {
        return {
          id: scn.id,
          duration: scn.duration,
          layers: currentScene.layers,
          name: currentScene.name ? currentScene.name : "",
        }
      }
      return {
        id: scn.id,
        duration: scn.duration,
        layers: scn.layers,
        name: scn.name ? scn.name : "",
      }
    })
    if (currentDesign) {
      const videoTemplate: IDesign = {
        id: currentDesign.id,
        type: "VIDEO",
        name: currentDesign.name,
        frame: currentDesign.frame,
        scenes: updatedScenes,
        metadata: {},
        preview: false,
      }
      makeDownload(videoTemplate)
    } else {
      console.log("NO CURRENT DESIGN")
    }
  }

  const makeDownload = (data: Object) => {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`
    const a = document.createElement("a")
    a.href = dataStr
    a.download = "template.json"
    a.click()
  }

  const makeDownloadVideo = (href: string) => {
    const a = document.createElement("a")
    a.href = href
    a.click()
  }

  // const makeDownloadTemplate = async () => {
  //   if (editor) {
  //     if (editorType === "GRAPHIC") {
  //       return parseGraphicJSON()
  //     } else if (editorType === "PRESENTATION") {
  //       return parsePresentationJSON()
  //     } else {
  //       return parseVideoJSON()
  //     }
  //   }
  // }

  // const makeDownloadVideo = async () => {
  //   if (editor) {
  //     if (editorType === "GRAPHIC") {
  //       return parseGraphicJSON()
  //     } else if (editorType === "PRESENTATION") {
  //       return parsePresentationJSON()
  //     } else {
  //       return parseVideoJSON()
  //     }
  //   }
  // }

  const loadGraphicTemplate = async (payload: IDesign) => {
    const scenes = []
    const { scenes: scns, ...design } = payload

    for (const scn of scns) {
      const scene: IScene = {
        name: scn.name,
        frame: payload.frame,
        id: scn.id,
        layers: scn.layers,
        metadata: {},
      }
      const loadedScene = await loadVideoEditorAssets(scene)
      await loadTemplateFonts(loadedScene)
      console.log(loadedScene)
      const preview = (await editor.renderer.render(loadedScene)) as string
      scenes.push({ ...loadedScene, preview })
    }

    return { scenes, design }
  }

  const loadPresentationTemplate = async (payload: IDesign) => {
    const scenes = []
    const { scenes: scns, ...design } = payload

    for (const scn of scns) {
      const scene: IScene = {
        name: scn.name,
        frame: payload.frame,
        id: scn,
        layers: scn.layers,
        metadata: {},
      }
      const loadedScene = await loadVideoEditorAssets(scene)

      const preview = (await editor.renderer.render(loadedScene)) as string
      await loadTemplateFonts(loadedScene)
      scenes.push({ ...loadedScene, preview })
    }
    return { scenes, design }
  }

  const loadVideoTemplate = async (payload: IDesign) => {
    const scenes = []
    const { scenes: scns, ...design } = payload

    for (const scn of scns) {
      const design: IScene = {
        name: "Awesome template",
        frame: payload.frame,
        id: scn.id,
        layers: scn.layers,
        metadata: {},
        duration: scn.duration,
      }
      const loadedScene = await loadVideoEditorAssets(design)

      const preview = (await editor.renderer.render(loadedScene)) as string
      await loadTemplateFonts(loadedScene)
      scenes.push({ ...loadedScene, preview })
    }
    return { scenes, design }
  }

  const randomCoding = () => {
    //创建26个字母数组
    let arr = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ]
    let idvalue = ""
    let n = 14 //这个值可以改变的，对应的生成多少个字母，根据自己需求所改
    for (let i = 0; i < n; i++) {
      idvalue += arr[Math.floor(Math.random() * 26)]
    }
    return idvalue
  }

  const importToOrigin = (jsonData: any) => {
    return {
      id: jsonData.id,
      type: jsonData.type,
      name: jsonData.name,
      frame: {
        width: jsonData.frame.width,
        height: jsonData.frame.height,
      },
      scenes: [
        {
          id: randomCoding(),
          name: jsonData.name,
          script: {
            ...jsonData.scenes[0].script,
          },
          duration: 5000,
          layers: jsonData.scenes[0].layers.map((layer: any) => {
            if (layer.type === "Image") {
              return {
                ...layer,
                type: "StaticImage",
                src: layer.url,
              }
            } else if (layer.type === "Vtuber") {
              return {
                ...layer,
                type: "StaticImage",
                src: layer.vtuber_img,
                url: layer.url,
                metadata: {
                  url: layer.url,
                },
              }
            } else if (layer.type === "Text") {
              return {
                ...layer,
                id: randomCoding(),
                type: "StaticText",
                name: "StaticText",
              }
            } else if (layer.type === "Video") {
              return {
                ...layer,
                type: "StaticVideo",
                name: "StaticVideo",
                src: layer.url,
              }
            } else {
              return {
                ...layer,
              }
            }
          }),
        },
      ],
      metadata: {},
      preview: false,
    }
  }

  const params: any = useParams()

  const initScence = async () => {
    const defaultTemplate = getDefaultTemplate({
      width: 1920,
      height: 1080,
    })
    if (editor.scene) {
      await editor.scene.importFromJSON(defaultTemplate)
      setCurrentDesign({
        id: nanoid(),
        frame: defaultTemplate.frame,
        metadata: {},
        name: "未命名视频",
        preview: "",
        scenes: [],
        type: "VIDEO",
      })
      console.log("init")
      const initialDesign = editor.scene.exportToJSON() as any
      const preview = await editor.renderer.render(initialDesign)
      setCurrentScene({ ...initialDesign, preview: preview, duration: 5000 })
      setScenes([{ ...initialDesign, preview: preview, duration: 5000 }])
    }
  }
  const { setActivePanel } = useAppContext()

  useEffect(() => {
    setTimeout(() => {
      if (params.id) {
        document.getElementsByClassName("importBtn")[0].click()
      }
    }, 1000)
    return () => {
      initScence()
      setUploadText("")
      setUploadFile([])
      setUploadLive([])
      setUploadAudio("")
      setUploadLanguage("")
      setUploadVoice("")
      setUploadScript("")
      setUploadVtuber("")
      const name: any = "Customize"
      setActivePanel(name)
    }
  }, [0])

  const handleImportTemplate = React.useCallback(
    async (data: any) => {
      let template
      let tempData: any = data
      if (data.video_data) {
        tempData = data.video_data
      }
      tempData = importToOrigin(tempData)
      if (tempData.type === "GRAPHIC") {
        template = await loadGraphicTemplate(tempData)
      } else if (tempData.type === "PRESENTATION") {
        template = await loadPresentationTemplate(tempData)
      } else if (tempData.type === "VIDEO") {
        template = await loadVideoTemplate(tempData)
      } else {
        template = await loadGraphicTemplate(tempData)
      }
      setEditLoading(false)
      //   @ts-ignore
      setScenes(template.scenes)
      //   @ts-ignore
      setCurrentDesign(template.design)
      console.log("import")
    },
    [editor]
  )

  const previewVideo = () => {
    if (location.pathname.includes("video")) {
      if (!uploadText) {
        message.warning("请填写文案")
        return
      }
      if (!uploadLanguage) {
        message.warning("请选择数字人声音")
        return
      }
    } else {
      if (!uploadScript) {
        message.error("请选择直播文案")
        return
      }
    }
    setDisplayPreview(true)
  }

  const handleInputFileRefClick = async () => {
    // setScenes([])
    // //   @ts-ignore
    // setCurrentDesign({ name: "1" })
    setEditLoading(true)
    // initScence()
    if (location.pathname.includes("video")) {
      getVideosById(params.id, {}).then((res: any) => {
        const { audio, voice, language, voiceName, content } = res.data.video_data.scenes[0].script
        setUploadAudio(audio)
        setUploadVoice(voice)
        setUploadLanguage(language)
        setUploadVoiceName(voiceName)
        setUploadText(content)
        handleImportTemplate(res.data)
      })
    } else {
      getWebcastById(params.id, {}).then((res: any) => {
        handleImportTemplate(res.data)
      })
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (res) => {
        const result = res.target!.result as string
        const design = JSON.parse(result)
        handleImportTemplate(design)
      }
      reader.onerror = (err) => {
        console.log(err)
      }

      reader.readAsText(file)
    }
  }

  const navigate = useNavigate()

  const changeRoute = () => {
    initScence()
    setUploadText("")
    setUploadFile([])
    setUploadLive([])
    setUploadAudio("")
    setUploadLanguage("")
    setUploadVoice("")
    setUploadVtuber("")
    setUploadScript("")
    const name: any = "Customize"
    setActivePanel(name)
    navigate("/")
  }

  return (
    // @ts-ignore
    <ThemeProvider theme={LightTheme} className="home_con">
      <Container className="home_con">
        <div>
          <img
            className="my-logo"
            style={{ marginTop: "10px", cursor: "pointer" }}
            src={Logo}
            alt=""
            onClick={changeRoute}
          />
        </div>
        <DesignTitle />
        <Block $style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
          {editLoading ? <div className="loading_template">模版加载中，请稍后...</div> : ""}
          <input
            multiple={false}
            onChange={handleFileInput}
            type="file"
            id="file"
            ref={inputFileRef}
            style={{ display: "none" }}
          />
          <Button
            size="compact"
            className="importBtn"
            onClick={handleInputFileRefClick}
            kind={KIND.tertiary}
            style={{ visibility: "hidden" }}
            overrides={{
              StartEnhancer: {
                style: {
                  marginRight: "4px",
                },
              },
            }}
          >
            导入模版
          </Button>

          <Button
            size="compact"
            onClick={saveLiveOrVideoTemplate}
            kind={KIND.tertiary}
            overrides={{
              StartEnhancer: {
                style: {
                  marginRight: "4px",
                },
              },
            }}
          >
            保存模版
          </Button>

          <Button
            size="compact"
            onClick={() => previewVideo()}
            kind={KIND.tertiary}
            overrides={{
              StartEnhancer: {
                style: {
                  marginRight: "4px",
                },
              },
            }}
          >
            {location.pathname.includes("video") ? "预览视频" : "预览直播"}
          </Button>

          <Button
            size="compact"
            onClick={downloadLiveOrderVideo}
            kind={KIND.tertiary}
            overrides={{
              StartEnhancer: {
                style: {
                  marginRight: "4px",
                },
              },
            }}
          >
            {location.pathname.includes("video") ? "生成视频" : "生成直播"}
          </Button>

          {/* <Button
            size="compact"
            onClick={() => window.location.replace("https://github.com/layerhub-io/react-design-editor")}
            kind={KIND.tertiary}
          >
            <Github size={24} />
          </Button> */}
          {/* 
          <Button
            style={{ marginLeft: "0.5rem" }}
            size="compact"
            onClick={() => window.location.replace("https://app.scenify.io")}
            kind={KIND.primary}
          >
            Try PRO
          </Button> */}
        </Block>
      </Container>
    </ThemeProvider>
  )
}

export default Navbar
