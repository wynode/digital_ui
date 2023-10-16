import React from "react"
import { Block } from "baseui/block"
import ReactPlayer from "react-player"
import { useEditor } from "@layerhub-io/react"
import Loading from "~/components/Loading"
import { IDesign } from "~/interfaces/DesignEditor"

import { BACK_API, BACK_API_ASSETS } from "~/config"
import useDesignEditorPages from "~/hooks/useDesignEditorScenes"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import { message } from "antd"
import { postVideoTemplate, getVideoPreviewProgress } from "~/apis/main"

const Video = () => {
  const editor = useEditor()
  const pages = useDesignEditorPages()
  const [loading, setLoading] = React.useState(true)
  const [state, setState] = React.useState({
    video: "",
  })

  const {
    setCurrentDesign,
    currentDesign,
    scenes,
    uploadAudio,
    uploadText,
    uploadVoice,
    uploadLanguage,
    uploadVoiceName,
  } = useDesignEditorContext()

  const originToUpload = (origin: any, otype: string) => {
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
      scenes: [
        {
          trans: "WaterWave",
          transDuration: 1.5,
          backgroundColor: "#fff",
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
            if (layer.type === "StaticText") {
              return {
                ...layer,
                type: getLayerType(layer),
              }
            }
            if (layer.type === "StaticVideo") {
              return {
                ...layer,
                type: getLayerType(layer),
                url: layer.src && layer.src.includes("?vtuber=true") ? layer.src.split("?vtuber=true")[1] : layer.src,
              }
            }
            return {
              type: getLayerType(layer),
              left: layer.left,
              top: layer.top,
              width: layer.width,
              height: layer.height,
              opacity: layer.opacity,
              url: layer.src && layer.src.includes("?vtuber=true") ? layer.src.split("?vtuber=true")[1] : layer.src,
              // url: layer.video_src,
            }
          }),
        },
      ],

      type: otype,
      metadata: {},
      preview: true,
    }
  }

  const parseGraphicJSON = (otype: string) => {
    if (!uploadText) {
      message.warning('请填写文案')
      return
    }
    if (!uploadLanguage) {
      message.warning('请选择数字人声音')
      return
    }
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
        preview: "",
      }

      const formattedJsonData = originToUpload(graphicTemplate, otype)
      // makeDownload(formattedJsonData)
      return formattedJsonData
    } else {
      console.log("NO CURRENT DESIGN")
    }
  }

  const [intervalId, setIntervalId] = React.useState<any>(null)

  const makePreview = React.useCallback(async () => {
    const formData: any = parseGraphicJSON("VIDEO")

    // const options = {
    //   outPath: "./position.mp4",
    //   verbose: false,
    //   duration: 5,
    //   fps: 25,
    //   dimension: template.frame,
    //   clips: clips,
    // }
    try {
      const taskData: any = await postVideoTemplate(formData)
      // message.success('正在生成视频，请耐心等候...')
      if (taskData.data.id) {
        const startTime = new Date().getTime()
        const interId = setInterval(async () => {
          const progressData: any = await getVideoPreviewProgress({ taskId: taskData.data.id })

          if (progressData.file_id) {
            setState({ video: `${BACK_API_ASSETS}${progressData.file_id}` })
            setLoading(false)
            clearInterval(interId)
          }
          if (new Date().getTime() - startTime > 300000) {
            clearInterval(interId)
          }
        }, 3000)
        setIntervalId(interId)
      }
    } catch (err: any) {
      message.error(err.response.data)
    }
  }, [editor])

  React.useEffect(() => {
    makePreview()
    return () => {
      clearInterval(intervalId)
    }
  }, [editor])

  return (
    <Block $style={{ flex: 1, alignItems: "center", justifyContent: "center", display: "flex", padding: "5rem" }}>
      {loading ? (
        <Loading text="正在生成预览" />
      ) : (
        <ReactPlayer
          muted={false}
          className="react-player"
          width="100%"
          height="100%"
          controls
          autoPlay
          url={state.video}
        />
      )}
    </Block>
  )
}

export default Video
