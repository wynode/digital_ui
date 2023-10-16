import React, { useState, useEffect } from "react"
import { Layout } from "antd"
import MySide from "./MySide"
import PopupChat from "./PopupChat"

function ChatBox() {
  const { Header, Content, Footer, Sider } = Layout
  const iframeStyle = {
    width: "100%",
    height: "99.5vh", // 使用'vh'单位以铺满整个屏幕
    border: "none", // 可选，根据需要设置iframe的边框样式
  }
  const [showSide, setShowSide] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      setShowSide(window.innerWidth > 800) // 根据视口宽度设置是否展示 side 组件
    }

    window.addEventListener("resize", handleResize)
    handleResize() // 初始化时执行一次

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const [popVis1, setPopVis1] = React.useState(false)
  const handleSwitchPop = (value: boolean) => {
    setPopVis1(value)
  }

  return (
    <Layout style={{ overflow: "auto", backgroundColor: "white" }}>
      {showSide && <MySide setPopVis1={setPopVis1}></MySide>}
      {showSide && <PopupChat visible={popVis1} switchVis={handleSwitchPop}></PopupChat>}
      {/* <MySide></MySide> */}
      <Layout style={{ backgroundColor: "white", overflow: "auto" }}>
        <Content style={{ margin: "0 0px" }}>
          <iframe src="/out/index.html" style={iframeStyle}></iframe>
        </Content>
      </Layout>
    </Layout>
    // <div style={{ width: '100%' }}>
    //   <iframe src="http://chat.wynode.com/" style={iframeStyle}></iframe>
    // </div>
  )
}

export default ChatBox
