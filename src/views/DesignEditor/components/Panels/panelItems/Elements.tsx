import React from "react"
import { Button, SIZE } from "baseui/button"
import { textComponents } from "~/constants/editor"
import { useStyletron } from "styletron-react"
import { useEditor } from "@layerhub-io/react"
import { FontItem } from "~/interfaces/common"
import { loadFonts } from "~/utils/fonts"
import { Checkbox, Col, Row, Popover } from "antd"
import { ILayer, IStaticText } from "@layerhub-io/types"
// import type { CheckboxValueType } from "antd/es/checkbox/Group"
import { nanoid } from "nanoid"
import { Block } from "baseui/block"
// import { Input } from "baseui/input"
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft"
import Scrollable from "~/components/Scrollable"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import { useSelector } from "react-redux"
import { selectPublicComponents } from "~/store/slices/components/selectors"
import api from "~/services/api"
import { IComponent } from "~/interfaces/DesignEditor"
import { getScript, deleteScriptById, getVoice, postScript } from "~/apis/main"
import { message, Input, Radio, Space } from "antd"
import { BACK_API_ASSETS } from "~/config"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
// import { set } from "lodash"

const textOptions = {
  id: nanoid(),
  type: "StaticText",
  width: 420,
  text: "添加一些字幕",
  fontSize: 92,
  fontFamily: "OpenSans-Regular",
  textAlign: "center",
  fontStyle: "normal",
  fontURL:
    "https://fonts.gstatic.com/s/opensans/v27/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0C4nY1M2xLER.ttf",
  fill: "#333333",
  metadata: {},
}

export default function () {
  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const components = useSelector(selectPublicComponents)

  const addObject = async () => {
    if (editor) {
      const font: FontItem = {
        name: "OpenSans-Regular",
        url: "https://fonts.gstatic.com/s/opensans/v27/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0C4nY1M2xLER.ttf",
      }
      await loadFonts([font])
      const options = {
        id: nanoid(),
        type: "StaticText",
        width: 420,
        text: "添加一些字幕",
        fontSize: 92,
        fontFamily: font.name,
        textAlign: "center",
        fontStyle: "normal",
        fontURL: font.url,
        fill: "#333333",
        metadata: {},
      }
      editor.objects.add(options)
    }
  }
  let textAreaText = ""
  const [showAddScript, setShowAddScript] = React.useState<boolean>(false)
  const [deleteLoading, setDeleteLoading] = React.useState<boolean>(false)
  const [scriptBtnText, setScriptBtnText] = React.useState<string>("添加直播文案")
  const addScriptFn = async () => {
    if (!showAddScript) {
      setScriptBtnText("保存该直播文案")
      setShowAddScript(!showAddScript)
    } else {
      setScriptBtnText("保存中...")
      postScript({
        status: "published",
        text: textAreaText,
        type: "introduce",
        voice: value,
      }).then((ress) => {
        message.success("保存文案成功")
        setScriptBtnText("添加直播文案")
        setShowAddScript(!showAddScript)
        setScript([].concat(ress.data, ...script))
        // setTimeout(() => {

        //   // getScript({}).then((res: any) => {
        //   //   setScript(res.data)
        //   // })
        // }, 200)
      })
    }
  }
  const onChangeChecked = (checkedValues: any) => {
    console.log("checked = ", checkedValues)
  }
  const onChangeText = (e: any) => {
    textAreaText = e.target.value
  }
  const [voice, setVoice] = React.useState<any[]>([])
  const [script, setScript] = React.useState<any[]>([])
  // ${BACK_API_ASSETS}
  const {
    uploadText,
    setUploadText,
    uploadLive,
    uploadVoice,
    setUploadLive,
    setUploadVoice,
    uploadScript,
    setUploadScript,
    setUploadAudio,
  } = useDesignEditorContext()

  React.useEffect(() => {
    getVoice({}).then((res: any) => {
      // console.log(res.data)
      setVoice(res.data)
    })
    getScript({}).then((res: any) => {
      setScript(res.data)
    })
  }, [])

  const [value, setValue] = React.useState("")
  const [wenAn, setWenAn] = React.useState([])

  const onChange = (e: any) => {
    setValue(e.target.value)
    // setUploadVoice(e.target.value)
  }

  const onWenAnChange = (checkedValues: any) => {
    // setWenAn(checkedValues[0])
    setUploadVoice(checkedValues[0]?.split("--")[0])
    setUploadText(checkedValues[0]?.split("--")[1])
    setUploadScript(checkedValues[0]?.split("--")[2])
    setUploadAudio(`${BACK_API_ASSETS}${checkedValues[0]?.split("--")[3]}`)
    setUploadLive(checkedValues)
  }
  function handleDelete(id: any) {
    setDeleteLoading(true)
    deleteScriptById(id, {}).then(() => {
      getScript({}).then((res: any) => {
        setDeleteLoading(false)
        setScript(res.data)
      })
    })
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
        <Block>直播文案</Block>

        <Block onClick={() => setIsSidebarOpen(false)} $style={{ cursor: "pointer", display: "flex" }}>
          <AngleDoubleLeft size={18} />
        </Block>
      </Block>
      <Scrollable>
        <Block padding={"0"}>
          <div style={{ padding: "0 1.5rem" }}>
            <Button
              onClick={addScriptFn}
              size={SIZE.compact}
              overrides={{
                Root: {
                  style: {
                    width: "100%",
                    magin: "20px",
                  },
                },
              }}
            >
              {scriptBtnText}
            </Button>
            {showAddScript ? (
              <div>
                <p style={{ fontSize: "14px", margin: "20px 0 4px" }}>请选择您喜欢的虚拟人声音：</p>
                <Radio.Group onChange={onChange} value={value} style={{ margin: "10px" }}>
                  <Space direction="vertical">
                    {voice.map((vitem) => (
                      <Radio value={`${vitem.id}`} key={vitem.id}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {vitem.name}
                          <audio
                            controls
                            style={{ width: "120px", height: "34px", marginLeft: "30px" }}
                            src={`${BACK_API_ASSETS}${vitem.audition}`}
                          ></audio>
                        </div>
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
                <textarea onChange={onChangeText} cols={30} rows={20} placeholder="请输入直播文案"></textarea>
              </div>
            ) : (
              ""
            )}
          </div>

          <Block
            $style={{
              width: "100%",
              margin: "14px",
            }}
          >
            <Checkbox.Group onChange={onWenAnChange} value={uploadLive}>
              <Row>
                {script.map((sitem) => (
                  <Col span={24} key={sitem.speech} style={{ marginTop: "10px" }}>
                    <Popover
                      style={{ width: 100 }}
                      title=""
                      content={
                        <Button
                          size="compact"
                          type="reset"
                          colors={{ backgroundColor: "#fff", color: "#000" }}
                          onClick={() => handleDelete(sitem.id)}
                        >
                          {deleteLoading ? "正在删除..." : "删除"}
                        </Button>
                      }
                    >
                      <Checkbox value={`${sitem.voice}--${sitem.text}--${sitem.id}--${sitem.speech}`}>
                        <div style={{ display: "flex", alignItems: "center" }}>{sitem.text}</div>
                      </Checkbox>
                    </Popover>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
            {/* <Radio.Group onChange={onWenAnChange} value={wenAn} style={{ margin: "10px" }}>
              <Space direction="vertical">
                {script.map((sitem) => (
                  <Radio value={`${sitem.voice}--${sitem.text}--${sitem.id}--${sitem.speech}`} key={sitem.id}>
                    <div style={{ display: "flex", alignItems: "center" }}>{sitem.text}</div>
                  </Radio>
                ))}
              </Space>
            </Radio.Group> */}
          </Block>
        </Block>
      </Scrollable>
    </Block>
  )
}

function TextComponentItem({
  component,
  onClick,
  onDragStart,
}: {
  component: IComponent
  onDragStart: (ev: React.DragEvent<HTMLDivElement>) => void
  onClick: (option: any) => void
}) {
  const [css] = useStyletron()
  return (
    <div
      onClick={() => onClick(component.id)}
      onDragStart={onDragStart}
      className={css({
        position: "relative",
        height: "84px",
        background: "#f8f8fb",
        cursor: "pointer",
        padding: "12px",
        borderRadius: "8px",
        overflow: "hidden",
        "::before:hover": {
          opacity: 1,
        },
        userSelect: "all",
      })}
    >
      <img
        src={component.preview}
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
