import React, { useEffect, useState } from "react"
import { List, Button, Card, Image, Tabs, message } from "antd"
import {
  postFile,
  getLiveList,
  postLiveProfile,
  patchLiveProfile,
  deleteLive,
  postStartLive,
  postStopLive,
  postGetLiveStatus,
  postGetStreamUrl,
} from "~/apis/main"
import {
  HomeOutlined,
  PlayCircleOutlined,
  MessageOutlined,
  VideoCameraOutlined,
  MoreOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons" // 导入图标

import Logo from "~/components/Logo/Logo.png"

const { TabPane } = Tabs

const App: React.FC = () => {
  const [activeKey, setActiveKey] = useState("live")

  useEffect(() => {
    // 在这里可以添加从远程获取直播列表的逻辑，并更新liveStreams状态
    // 例如，可以使用fetch或Axios来获取数据
  }, [])

  const [liveList, setLiveList] = useState([])
  const [playingList, setPlayingList] = React.useState<string[]>(Array(liveList.length).fill(""))
  const newPlayingList = [...playingList]

  const fetchData = async () => {
    try {
      const res = await getLiveList({})
      setLiveList(res.data)
      await Promise.all(
        res.data.map(async (item: any, index: number) => {
          const res: any = await postGetLiveStatus({
            key: item.address ? item.address.replace(/\s/g, "") : item.address,
          })
          if (res.url && res.url.status === "starting") {
            newPlayingList[index] = res.url.url
          } else {
            newPlayingList[index] = "notStart"
          }
          return res
        })
      )
      setPlayingList(newPlayingList)
    } catch (error) {
      console.error("您还未开通直播权限，请联系管理员！", error)
      setActiveKey("chat")
    }
  }

  const [innerHeight, setInnerHeight] = useState(0)

  useEffect(() => {
    fetchData()
    setInnerHeight(document.documentElement.clientHeight - 80)
    window.addEventListener("resize", function () {
      setInnerHeight(document.documentElement.clientHeight - 80)
    })
  }, [])

  const handleButtonClick = (image: any, index: any) => {
    // 创建新的播放状态数组，并更新对应索引的状态
    const newPlayingList = [...playingList]

    // 发送请求的逻辑
    // ...
    if (newPlayingList[index].includes("/")) {
      postStopLive({ key: image.address.replace(/\s/g, "") }).then(() => {
        newPlayingList[index] = "notStart"
        setPlayingList(newPlayingList)
        message.success("停止直播成功")
      })
    } else {
      postGetStreamUrl({ key: image.address.replace(/\s/g, "") }).then((stream: any) => {
        postStartLive({ key: image.address.replace(/\s/g, "") }).then(() => {
          newPlayingList[index] = stream.url
          setPlayingList(newPlayingList)
          message.success("开始直播成功")
        })
      })
    }
  }

  const handleIframeClick = () => {
    console.log("click le")
  }

  const onChange = (key: string) => {
    setActiveKey(key)
    window.scrollTo(0, 0)
  }

  const copyToClipboard = async (val: string) => {
    try {
      if (navigator.clipboard && navigator.permissions) {
        await navigator.clipboard.writeText(val)
      } else {
        const textArea: any = document.createElement("textArea")
        textArea.value = val
        textArea.style.width = 0
        textArea.style.position = "fixed"
        textArea.style.left = "-999px"
        textArea.style.top = "10px"
        textArea.setAttribute("readonly", "readonly")
        document.body.appendChild(textArea)

        textArea.select()
        document.execCommand("copy")
        document.body.removeChild(textArea)
      }
      message.success("复制直播流地址成功")
    } catch {
      message.error("复制失败，请联系管理员")
    }
  }

  return (
    <div>
      <Tabs
        activeKey={activeKey}
        onChange={onChange}
        tabPosition="bottom"
        defaultActiveKey="live"
        tabBarStyle={{ marginBottom: 0 }}
        className="live-mobile-tabs"
        style={{ height: innerHeight }}
      >
        <TabPane
          tab={
            <span>
              <HomeOutlined rev={undefined} /> 主页
            </span>
          }
          key="home"
        >
          <div className="live-mobile-default">
            <img src={Logo} alt="" />
            <div>暂未支持移动端预览，敬请期待适配～</div>
          </div>
          {/* 主页内容 */}
        </TabPane>
        <TabPane
          tab={
            <span>
              <VideoCameraOutlined rev={undefined} />
              视频
            </span>
          }
          key="video"
        >
          <div className="live-mobile-default">
            <img src={Logo} alt="" />
            <div>暂未支持移动端预览，敬请期待适配～</div>
          </div>
          {/* 视频内容 */}
        </TabPane>
        <TabPane
          tab={
            <span>
              <MessageOutlined rev={undefined} />
              对话
            </span>
          }
          key="chat"
          className="live-tab-pane"
        >
          {/* 对话内容 */}
          <div style={{ margin: "0 0px", width: "100vw", height: "100%" }}>
            <iframe src="/out/index.html" style={{ border: "none", width: "100%", height: "100%" }}></iframe>
          </div>
        </TabPane>
        <TabPane
          tab={
            <span>
              <PlayCircleOutlined rev={undefined} /> 直播
            </span>
          }
          key="live"
        >
          <img src={Logo} alt="" />
          <List
            grid={{ gutter: 16, column: 1 }}
            className="live-mobile-list"
            dataSource={liveList}
            renderItem={(item: any, index) => (
              <List.Item>
                <Card>
                  <div style={{ background: "#000", width: "100%", position: "relative" }}>
                    <img
                      className={playingList[index] === "notStart" ? "imgShadow live-mobile-img" : "live-mobile-img"}
                      src={item.preview_url}
                    />
                    {playingList[index] && (
                      <Button
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          color: "#fff",
                        }}
                        type="primary"
                        danger={playingList[index].includes("/")}
                        onClick={() => handleButtonClick(item, index)}
                        icon={
                          playingList[index].includes("/") ? (
                            <CloseCircleOutlined rev={undefined} />
                          ) : (
                            <PlayCircleOutlined rev={undefined} />
                          )
                        }
                      >
                        {playingList[index].includes("/") ? "关闭直播" : "开始直播"}
                      </Button>
                    )}
                  </div>
                  <div>
                    <h2>
                      {item.name}
                      <span style={{ fontSize: "12px", marginLeft: "4px", color: "#666" }}>{`（抖音）`}</span>
                    </h2>
                    <p style={{ whiteSpace: "normal", wordBreak: "break-all" }}>
                      探形直播流：
                      <span style={{ whiteSpace: "normal", wordBreak: "break-all" }}>
                        {playingList[index] && playingList[index].includes("/") ? playingList[index] : "暂未开始直播"}
                      </span>
                      <Button
                        style={{ marginLeft: 2 }}
                        type="primary"
                        size="small"
                        onClick={() => copyToClipboard(playingList[index])}
                      >
                        复制
                      </Button>
                    </p>
                  </div>
                </Card>
              </List.Item>
            )}
          />
          <p style={{ textAlign: "center", fontSize: "12", color: "#999", marginBottom: "40px" }}>没有更多直播啦～</p>
        </TabPane>
        <TabPane
          tab={
            <span>
              <MoreOutlined rev={undefined} /> 其他
            </span>
          }
          key="other"
        >
          {/* 其他内容 */}
          <div className="live-mobile-default">
            <img src={Logo} alt="" />

            <div>暂未支持移动端预览，敬请期待适配～</div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default App
