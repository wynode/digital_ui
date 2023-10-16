import React, { useState } from "react"
import { Layout, Tabs, Form, Switch, Select, Button, Radio, message } from "antd"
import { ArrowLeftOutlined, QuestionCircleOutlined } from "@ant-design/icons"
import MySide from "../Personal/MySide"
import { useNavigate, useParams } from "react-router-dom"
import AddBlacklistModal from "./AddBlackUser"
import { postBlackUser, getBlackUser, getLiveProfile, getVoice, patchLiveProfile } from "~/apis/main"
import TableComponent from "./TableComp"
import male from "../Personal/male.png"
import loading from "~/components/Logo/loading.gif"
import female from "../Personal/female.png"
import AudioPlayer from "../Personal/AudioPlayer"
import { BACK_API_ASSETS } from "~/config"
import PopupLive from "./PopupLive"
import ReplyConfig from "./ReplyConfig"
import ConfigTable from "./ConfigTable"
import AIConfig from "./newLiveConfig/AIConfig"

const { Header, Content, Footer, Sider } = Layout

const { TabPane } = Tabs
const { Option } = Select

const ConfigureLiveDetails = () => {
  const navigator = useNavigate()
  const [form] = Form.useForm()
  const [activeTab, setActiveTab] = useState("1")
  const [blackUserVis, setBlackUserVis] = useState(false)
  const [profile, setProfile] = useState({ name: "", voice_name: "" })
  const [voice, setVoice] = useState("")
  const [blackUserData, setBlackUserData] = useState([])

  const handleTabChange = (key: any) => {
    if (key !== "1" && key !== "2") {
      message.warning("您的套餐暂不支持")
    } else {
      setActiveTab(key)
    }
  }

  const handleModalSubmit = (values: any) => {
    console.log(values)
    // 处理表单数据提交
  }

  const handleAddBlacklist = (type: any) => {
    console.log(type)
    setBlackUserVis(true)
    // 执行添加黑名单的逻辑
  }

  const [audioData, setAudioData] = useState([])
  const params = useParams()

  const handleAddBlacklistSubmit = async (value: any) => {
    await postBlackUser({ nickname: value, brodcast_assis: params.id })
    getBlackUserList()
    return 123
  }

  const getProfile = async () => {
    const res = await getLiveProfile(params.id, {})
    setProfile(res.data)
    setVoice(res.data.voice_name)
  }

  const getBlackUserList = async () => {
    const res = await getBlackUser({ "filter[_and][0][brodcast_assis]": params.id })
    setBlackUserData(res.data)
  }

  const goLive = () => {
    navigator("/personal/live")
  }

  const getVoiceFn = () => {
    getVoice({ limit: 100 }).then((res: any) => {
      // setAudioData(res.data)
      const newData = res.data.map((item: any, index: number) => {
        const previewUrl = `${BACK_API_ASSETS}${item.avatar}`
        if (item.id) {
          const img = new Image()
          img.src = previewUrl
          img.onload = () => {
            const updatedArray: any = [...res.data]
            updatedArray[index].previewUrl = previewUrl

            setAudioData(updatedArray)
          }
        }
        return {
          ...item,
          previewUrl: loading,
        }
      })

      setAudioData(newData)
    })
  }

  const handleChangeAudio = (value: any) => {
    patchLiveProfile(params.id, { voice_name: value })
    setVoice(value)
  }

  const [liveType, setLiveType] = useState("help")

  const handleLiveTypeChange = (e: any) => {
    if (e.target.value === "live") {
      message.warning("您的套餐暂不支持")
      form.setFieldValue("live_type", "help")
      setLiveType("help")
    } else {
      setLiveType("help")
    }
  }

  const [busType, setBusType] = useState("keyword")

  const handleBusTypeChange = (e: any) => {
    if (e.target.value === "staff") {
      message.warning("您的套餐暂不支持")
      form.setFieldValue("bus_type", "keyword")
      setBusType("keyword")
    } else {
      setBusType("keyword")
    }
  }

  React.useEffect(() => {
    getProfile()
    getBlackUserList()
    getVoiceFn()
  }, [])

  const [popVis2, setPopVis2] = React.useState(false)
  const handleSwitchPop = (value: boolean) => {
    setPopVis2(value)
  }

  return (
    <Layout>
      <MySide setPopVis2={setPopVis2}></MySide>
      <PopupLive visible={popVis2} switchVis={handleSwitchPop}></PopupLive>
      <Layout style={{ backgroundColor: "white", overflow: "auto" }}>
        <Header
          style={{
            margin: "0 3%",
            padding: 0,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "white",
            fontWeight: "bold",
            fontSize: "20px",
            position: "relative",
          }}
        >
          <div>
            <ArrowLeftOutlined onClick={goLive} className="left-icon" rev={undefined} />
            {profile.name} 的直播间
          </div>

          <div>{/* <Button style={{ marginRight: "10px", fontSize: "12px" }}>新建文件夹</Button> */}</div>
        </Header>
        <div style={{ margin: "0 3%" }} className="youyou">
          <Tabs activeKey={activeTab} onChange={handleTabChange} type="card" className="live-tabs">
            <TabPane tab="直播间配置" key="1">
              <Form form={form} onFinish={handleModalSubmit} style={{ maxWidth: "760px", paddingTop: "10px" }}>
                <Form.Item name="live_type" label="直播模式" rules={[{ required: true }]}>
                  <Radio.Group defaultValue="help" value={liveType} onChange={handleLiveTypeChange}>
                    <Radio value="help" checked>
                      实景AI助播
                    </Radio>
                    <Radio value="live">实景AI直播</Radio>
                  </Radio.Group>
                  <div style={{ position: "absolute", right: -34, top: 6, color: "#666", fontSize: "14px" }}>
                    <QuestionCircleOutlined
                      rev={undefined}
                      style={{ marginRight: "10px", fontSize: "14px" }}
                    ></QuestionCircleOutlined>
                    实景AI助手仅引导客户，实景AI直播将以全流程方式正常直播
                  </div>
                </Form.Item>
                <Form.Item
                  name="sound"
                  label="声音"
                  style={{ maxWidth: "440px" }}
                  className="audio-item"
                  rules={[{ required: true }]}
                >
                  <div style={{ display: "none" }}>{voice}</div>
                  <Select className="la-list" value={voice} style={{ height: "50px" }} onChange={handleChangeAudio}>
                    {audioData.map((item: any) => (
                      <Option value={item.id} label={item.id} key={item.id}>
                        <div className="la-item">
                          <div className="la-item-center">
                            <img className="la-item-img" src={item.previewUrl} alt="" />
                            <p className="la-item-title">
                              <span style={{ width: "88px", display: "flex", alignItems: "center" }}>
                                {item.name}
                                {item.sex === "male" ? <img src={male} alt="" /> : <img src={female} alt="" />}
                              </span>
                              <span>
                                {item.lang === "zh-CN" ? "中文" : "英文"}
                                {item.emotion ? `-${item.emotion}` : ""}
                              </span>
                            </p>
                          </div>
                          <div
                            style={{ paddingTop: "2px", paddingRight: "16px" }}
                            onClick={(e) => {
                              e.stopPropagation()
                            }}
                          >
                            <AudioPlayer audioSrc={`${BACK_API_ASSETS}${item.audition}`} />
                          </div>
                        </div>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                {/* <Form.Item name="bus_type" label="直播总控" rules={[{ required: true }]}>
                  <Radio.Group defaultValue="keyword" value={busType} onChange={handleBusTypeChange}>
                    <Radio value="keyword">关键词触发</Radio>
                    <Radio value="staff">AI员工总控</Radio>
                  </Radio.Group>
                  <div style={{ position: "absolute", right: -74, top: 6, color: "#666", fontSize: "14px" }}>
                    <QuestionCircleOutlined
                      rev={undefined}
                      style={{ marginRight: "10px", fontSize: "14px" }}
                    ></QuestionCircleOutlined>
                    AI员工总控是指通过训练自有AI主播，达成所有直播由它负责的效果
                  </div>
                </Form.Item> */}
                <Form.Item name="aiManager" label="智能导播" valuePropName="checked">
                  <Switch disabled={true} defaultChecked />
                  <div style={{ position: "absolute", left: 130, top: 6, color: "#666", fontSize: "14px" }}>
                    <QuestionCircleOutlined
                      rev={undefined}
                      style={{ marginRight: "10px", fontSize: "14px" }}
                    ></QuestionCircleOutlined>
                    由AI来决定什么时间点、什么频率、什么方式来与用户互动
                  </div>
                </Form.Item>
                <Form.Item name="rejectAnswer" label="智能拒答" valuePropName="checked">
                  <Switch disabled={true} defaultChecked />
                  <div style={{ position: "absolute", left: 130, top: 6, color: "#666", fontSize: "14px" }}>
                    <QuestionCircleOutlined
                      rev={undefined}
                      style={{ marginRight: "10px", fontSize: "14px" }}
                    ></QuestionCircleOutlined>
                    对于不符合国家相关规定的话题，直接忽略
                  </div>
                </Form.Item>
                <Form.Item name="rejectAnswer" label="智能合规" valuePropName="checked">
                  <Switch disabled={true} defaultChecked />
                  <div style={{ position: "absolute", left: 130, top: 6, color: "#666", fontSize: "14px" }}>
                    <QuestionCircleOutlined
                      rev={undefined}
                      style={{ marginRight: "10px", fontSize: "14px" }}
                    ></QuestionCircleOutlined>
                    对于不符平台规则的内容，由AI进行掌控
                  </div>
                </Form.Item>
                {/* <Form.Item label="黑名单用户设置">
                  <Button type="primary" onClick={() => handleAddBlacklist("user")}>
                    添加黑名单
                  </Button>
                </Form.Item>
                <TableComponent data={blackUserData} onGetListData={getBlackUserList}></TableComponent> */}
                {/* <Form.Item label="黑名单话题设置">
                  <Button onClick={() => handleAddBlacklist("topic")}>添加黑名单话题</Button>
                </Form.Item> */}
              </Form>
            </TabPane>
            <TabPane tab="探形AI配置" key="2" className="tanxing-ai-config">
              <AIConfig></AIConfig>
            </TabPane>
            {/* <TabPane tab="直播间回复配置" key="3">
              <ConfigTable></ConfigTable>
            </TabPane> */}
            <TabPane tab="训练AI主播" key="3"></TabPane>
            <TabPane tab="直播数据分析" key="4"></TabPane>
          </Tabs>
        </div>
      </Layout>
      <AddBlacklistModal
        visible={blackUserVis}
        onCancel={() => {
          setBlackUserVis(false)
        }}
        onAddBlacklist={handleAddBlacklistSubmit}
      ></AddBlacklistModal>
    </Layout>
  )
}

export default ConfigureLiveDetails
