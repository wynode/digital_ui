import React, { useEffect } from "react"
import { Block } from "baseui/block"
import { useStyletron } from "baseui"
import { Checkbox, Col, Row, Popover } from "antd"
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft"
import Scrollable from "~/components/Scrollable"
import { Button, SIZE } from "baseui/button"
import DropZone from "~/components/Dropzone"
import { useEditor } from "@layerhub-io/react"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import { nanoid } from "nanoid"
import { captureFrame, loadVideoResource } from "~/utils/video"
import { ILayer } from "@layerhub-io/types"
import { toBase64 } from "~/utils/data"
import { getMaterials, postMaterials, postFile, deleteMaterialById } from "~/apis/main"
import { BACK_API_ASSETS } from "~/config"

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

export default function () {
  const inputFileRef = React.useRef<HTMLInputElement>(null)
  const [uploads, setUploads] = React.useState<any[]>([])
  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const [deleteLoading, setDeleteLoading] = React.useState<boolean>(false)
  const [getLoading, setGetLoading] = React.useState<boolean>(false)
  // const { uploadFile, setUploadFile } = useDesignEditorContext()
  const handleDropFiles = async (files: FileList) => {
    if (files.length) {
      let haveUploads: any = []
      const upload = Array.from(files).map(async (file: any) => {
        const formData = new FormData()

        formData.append("title", "image")
        formData.append("file", file)

        const fileUpload: any = await postFile(formData)
        const payload = {
          name: file.name || "tupian",
          path: fileUpload.data.id,
        }

        const materialsRes = await postMaterials(payload)

        const isVideo = file.type.includes("video")
        const type = isVideo ? "StaticVideo" : "StaticImage"
        // let upload = {}
        // if (isVideo) {
        //   const base64 = (await toBase64(file)) as string
        //   let preview = base64
        //   const video = await loadVideoResource(base64)
        //   const frame = await captureFrame(video)
        //   preview = frame
        //   upload = {
        //     id: nanoid(),
        //     src: `${BACK_API_ASSETS}${payload.path}`,
        //     preview: preview,
        //     type: type,
        //   }
        // }
        const upload = {
          id: nanoid(),
          name: file.name,
          src: `${BACK_API_ASSETS}${payload.path}`,
          preview: `${BACK_API_ASSETS}${payload.path}?quality=10`,
          type: type,
        }

        // getMaterials({})
        haveUploads.push(upload)
        setUploads([...haveUploads, ...uploads])
      })
      // setUploads([...uploads, ...upload])
    }
  }

  React.useEffect(() => {
    setGetLoading(true)
    getMaterials({}).then((res: any) => {
      // console.log(res.data)
      const uploadData = res.data.map((item: any) => {
        const isVideo = item.name && (item.name.includes("mp4") || item.name.includes("wmv"))
        const type = isVideo ? "StaticVideo" : "StaticImage"
        return {
          id: nanoid(),
          name: item.name,
          src: `${BACK_API_ASSETS}${item.path}`,
          preview: `${BACK_API_ASSETS}${item.path}?quality=10`,
          type: type,
        }
      })
      setGetLoading(false)
      setUploads(uploadData)
    })
  }, [])

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click()
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDropFiles(e.target.files!)
  }

  const addImageToCanvas = (props: Partial<ILayer>) => {
    editor.objects.add(props)
  }

  function handleDelete(id: any) {
    setDeleteLoading(true)
    deleteMaterialById(id, {}).then(() => {
      getMaterials({}).then((res: any) => {
        const uploadData = res.data.map((item: any) => {
          const isVideo = item.name && (item.name.includes("mp4") || item.name.includes("wmv"))
          const type = isVideo ? "StaticVideo" : "StaticImage"
          return {
            id: nanoid(),
            name: item.name,
            src: `${BACK_API_ASSETS}${item.path}`,
            preview: `${BACK_API_ASSETS}${item.path}?quality=10`,
            type: type,
          }
        })
        setDeleteLoading(false)
        setUploads(uploadData)
      })
    })
  }
  return (
    <DropZone handleDropFiles={handleDropFiles}>
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
          <Block>视频或图片</Block>

          <Block onClick={() => setIsSidebarOpen(false)} $style={{ cursor: "pointer", display: "flex" }}>
            <AngleDoubleLeft size={18} />
          </Block>
        </Block>
        <Scrollable>
          <Block padding={"0 1.5rem"}>
            <Button
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
              上传视频或图片
            </Button>
            <input
              onChange={handleFileInput}
              multiple
              type="file"
              id="file"
              ref={inputFileRef}
              style={{ display: "none" }}
            />
            {/* 
            <div
              style={{
                marginTop: "1rem",
                display: "grid",
                gap: "0.5rem",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              {uploadFile.map((upload: any) => (
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
            </div> */}
          </Block>
          <Block padding="0 1.5rem">
            <div style={{ display: "grid", marginTop: "1rem", gap: "8px", gridTemplateColumns: "1fr 1fr" }}>
              {getLoading ? "加载中..." : ""}
              {uploads.map((image: any, index: number) => {
                return (
                  // <Popover
                  //   style={{ width: 100 }}
                  //   content={
                  //     <Button
                  //       size="compact"
                  //       type="reset"
                  //       colors={{ backgroundColor: "#fff", color: "#000" }}
                  //       onClick={() => handleDelete(image.id)}
                  //     >
                  //       {deleteLoading ? "正在删除..." : "删除"}
                  //     </Button>
                  //   }
                  // >
                  //   <div>
                  <div>
                    {image.name && (image.name.includes("mp4") || image.name.includes("wmv")) ? (
                      <video
                        key={index}
                        onClick={() => addImageToCanvas(image)}
                        style={{ width: "125px", maxHeight: "200px", cursor: "pointer" }}
                        src={`${image.preview}`}
                      ></video>
                    ) : (
                      <ImageItem key={index} onClick={() => addImageToCanvas(image)} preview={image.preview} />
                    )}
                  </div>
                  //   </div>
                  // </Popover>
                )
              })}
            </div>
          </Block>
        </Scrollable>
      </Block>
    </DropZone>
  )
}
