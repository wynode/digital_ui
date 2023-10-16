import useEditorType from "~/hooks/useEditorType"
import SelectEditor from "./SelectEditor"
import GraphicEditor from "./GraphicEditor"
import PresentationEditor from "./PresentationEditor"
import VideoEditor from "./VideoEditor"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import Preview from "./components/Preview"
import ContextMenu from "./components/ContextMenu"
import { REFRESH_TOKEN, TOKEN_NAME } from "~/config"
import React from "react"

const DesignEditor = () => {
  const { displayPreview, setDisplayPreview, setEditorType } = useDesignEditorContext()
  let editorType = "GRAPHIC"
  if (location.pathname.includes("video")) {
    editorType = "VIDEO"
  }

  React.useEffect(() => {
    if (location.pathname.includes("video")) {
      document.title = 'AI工具_视频编辑 - 探形 -把工作交给数字人';
      setEditorType("VIDEO")
    } else {
      document.title = 'AI工具_直播编辑 - 探形 -把工作交给数字人'
      setEditorType("GRAPHIC")
    }
  }, [])

  return (
    <>
      {displayPreview && <Preview isOpen={displayPreview} setIsOpen={setDisplayPreview} />}
      {
        {
          NONE: <SelectEditor />,
          PRESENTATION: <PresentationEditor />,
          VIDEO: <VideoEditor />,
          GRAPHIC: <GraphicEditor />,
        }[editorType]
      }
    </>
  )
}

export default DesignEditor
