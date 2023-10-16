import React from "react"
import { useStyletron } from "baseui"
import { Block } from "baseui/block"
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft"
import Scrollable from "~/components/Scrollable"
import { images } from "~/constants/mock-data"
import { useEditor } from "@layerhub-io/react"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import {
  getAvatar,
  getDavinci,
  getScenario,
  getScript,
  getBackground,
  getForeground,
  getVoice,
  getVideos,
  postFile,
} from "@/apis/main.ts"
import { Button, SIZE } from "baseui/button"
import { nanoid } from "nanoid"
import { captureFrame, loadVideoResource } from "~/utils/video"
import { ILayer } from "@layerhub-io/types"
import { toBase64 } from "~/utils/data"
import { BACK_API_ASSETS } from "@/config"
import { message } from "antd"

// getAvatar().then((res: any) => {
//   console.log(res, 'avatar')

// })
// getDavinci().then((res: any) => {
//   console.log(res, 'getDavinci')

// })
// getScenario().then((res: any) => {
//   console.log(res, 'getScenario')

// })
// getScript().then((res: any) => {
//   console.log(res, 'getScript')

// })
// getBackground().then((res: any) => {
//   console.log(res, 'getBackground')

// })
// getForeground().then((res: any) => {
//   console.log(res, 'getForeground')

// })
// getVoice().then((res: any) => {
//   console.log(res, 'getVoice')

// })
// getVideos().then((res: any) => {
//   console.log(res, 'getVideos')

// })

const Images = () => {
  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()
  // const { uploadVtuber, setUploadVtuber } = useDesignEditorContext()
  const addObject = React.useCallback(
    (url: string) => {
      const {layers} = editor.scene.exportToJSON()
      let haveVtuber = false
      layers.forEach((item:any) => {
        if (item.src && item.src.includes('vtuber')) {
          haveVtuber = true
        }
      })
      if (editor && !haveVtuber) {
        const options = {
          type: "StaticImage",
          src: url.split("--")[0] + `?vtuber=true${url.split("--")[1]}`,
          // video_src: url.split("--")[1],
        }
        editor.objects.add(options)
      } else {
        message.error('当前页面只能有一个数字人')
      }
    },
    [editor]
  )

  const [avatar, setAvatar] = React.useState<any[]>([])
  const inputFileRef = React.useRef<HTMLInputElement>(null)
  const [uploads, setUploads] = React.useState<any[]>([])

  React.useEffect(() => {
    getAvatar().then((res: any) => {
      setAvatar(res.data)
    })
  }, [])

  const handleDropFiles = async (files: FileList) => {
    const file = files[0]
    const formData = new FormData()

    formData.append("title", "image")
    formData.append("file", file)

    const res = await postFile(formData)
    console.log(res)
    const isVideo = file.type.includes("video")
    const base64 = (await toBase64(file)) as string
    let preview = base64
    if (isVideo) {
      const video = await loadVideoResource(base64)
      const frame = await captureFrame(video)
      preview = frame
    }

    const type = isVideo ? "StaticVideo" : "StaticImage"

    const upload = {
      id: nanoid(),
      src: base64,
      preview: preview,
      type: type,
    }

    setUploads([...uploads, upload])
  }

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click()
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDropFiles(e.target.files!)
  }

  const addImageToCanvas = (props: Partial<ILayer>) => {
    editor.objects.add(props)
  }

  return (
    <Block $style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Block
        $style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
          justifyContent: "space-between",
          padding: "1.5rem",
        }}
      >
        <Block>数字人</Block>

        <Block onClick={() => setIsSidebarOpen(false)} $style={{ cursor: "pointer", display: "flex" }}>
          <AngleDoubleLeft size={18} />
        </Block>
      </Block>
      <Scrollable>
        <Block padding={"0 1.5rem"}>
          {/* <Button
            onClick={handleInputFileRefClick}
            size={SIZE.compact}
            overrides={{
              Root: {
                style: {
                  width: "100%",
                },
              },
            }}
          >
            上传图片
          </Button>
          <input onChange={handleFileInput} type="file" id="file" ref={inputFileRef} style={{ display: "none" }} /> */}

          <div
            style={{
              marginTop: "1rem",
              display: "grid",
              gap: "0.5rem",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            {uploads.map((upload) => (
              <div
                key={upload.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => addImageToCanvas(upload)}
              >
                <div>
                  <img width="100%" src={upload.preview ? upload.preview : upload.url} alt="preview" />
                </div>
              </div>
            ))}
          </div>
        </Block>
        <Block padding="0 1.5rem">
          <div style={{ display: "grid", gap: "8px", gridTemplateColumns: "1fr 1fr" }}>
            {avatar.map((image, index) => {
              return (
                <ImageItem
                  key={index}
                  onClick={() => addObject(`${BACK_API_ASSETS}${image.photo}--${BACK_API_ASSETS}${image.video}`)}
                  preview={`${BACK_API_ASSETS}${image.photo}/?quality=10`}
                />
              )
            })}
          </div>
        </Block>
      </Scrollable>
    </Block>
  )
}

const ImageItem = ({ preview, onClick }: { preview: any; onClick?: (option: any) => void }) => {
  const [css] = useStyletron()
  return (
    <div
      onClick={onClick}
      className={css({
        position: "relative",
        background: "#f8f8fb",
        cursor: "pointer",
        borderRadius: "8px",
        overflow: "hidden",
        "::before:hover": {
          opacity: 1,
        },
      })}
    >
      <div
        className={css({
          backgroundImage: `linear-gradient(to bottom,
          rgba(0, 0, 0, 0) 0,
          rgba(0, 0, 0, 0.006) 8.1%,
          rgba(0, 0, 0, 0.022) 15.5%,
          rgba(0, 0, 0, 0.047) 22.5%,
          rgba(0, 0, 0, 0.079) 29%,
          rgba(0, 0, 0, 0.117) 35.3%,
          rgba(0, 0, 0, 0.158) 41.2%,
          rgba(0, 0, 0, 0.203) 47.1%,
          rgba(0, 0, 0, 0.247) 52.9%,
          rgba(0, 0, 0, 0.292) 58.8%,
          rgba(0, 0, 0, 0.333) 64.7%,
          rgba(0, 0, 0, 0.371) 71%,
          rgba(0, 0, 0, 0.403) 77.5%,
          rgba(0, 0, 0, 0.428) 84.5%,
          rgba(0, 0, 0, 0.444) 91.9%,
          rgba(0, 0, 0, 0.45) 100%)`,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0,
          transition: "opacity 0.3s ease-in-out",
          height: "100%",
          width: "100%",
          ":hover": {
            opacity: 1,
          },
        })}
      />
      <img
        src={preview}
        className={css({
          width: "100%",
          height: "100%",
          objectFit: "contain",
          pointerEvents: "none",
          verticalAlign: "middle",
        })}
      />
    </div>
  )
}

export default Images
