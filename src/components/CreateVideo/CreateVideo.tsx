import React, { useState } from "react"
import { PlusOutlined } from "@ant-design/icons"
import "./index.css"
import { Navigate, useNavigate } from "react-router-dom"

const CreateDocument = () => {
  const boxes = [
    {
      image: "http://console.etsow.com/assets/549ffc92-d320-485c-a961-bc04cf8970e2",
      description: "模板1",
    },
    {
      image: "http://console.etsow.com/assets/ab13b9e4-02aa-4f98-8a84-cb2cc579749d",
      description: "模板2",
    },
    {
      image: "http://console.etsow.com/assets/ab13b9e4-02aa-4f98-8a84-cb2cc579749d",
      description: "模板3",
    },
    {
      image: "http://console.etsow.com/assets/549ffc92-d320-485c-a961-bc04cf8970e2",
      description: "模板3",
    },
  ]
  //跳转路由
  const navigate = useNavigate()

  //去操作台
  function toCanvas() {
    document.title = "AI工具_视频编辑 - 探形 -把工作交给数字人"
    navigate("/video")
  }
  //打开导入PPT文案模态框
  function importDocument() {}
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "30%",
            padding: "2%",
            backgroundColor: "#f1f4f8",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={toCanvas}
        >
          <div style={{ width: "40px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <PlusOutlined rev={undefined} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginLeft: "10px" }}>
            <div style={{ fontSize: "13px" }}>空白页面</div>
            <div style={{ fontSize: "12px", color: "#babbbd" }}>新建空白页面开始制作</div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "30%",
            padding: "2%",
            backgroundColor: "#f1f4f8",
            marginLeft: "10px",
            borderRadius: "5px",
          }}
        >
          <div style={{ width: "40px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <PlusOutlined rev={undefined} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginLeft: "10px" }}>
            <div style={{ fontSize: "13px" }}>AI生成</div>
            <div style={{ fontSize: "12px", color: "#babbbd" }}>通过AI算法生成一个视频</div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "30%",
            padding: "2%",
            backgroundColor: "#f1f4f8",
            marginLeft: "10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          <div style={{ width: "40px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <PlusOutlined rev={undefined} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginLeft: "10px" }}>
            <div style={{ fontSize: "13px" }}>导入PPT文稿</div>
            <div style={{ fontSize: "12px", color: "#babbbd" }}>使用幻灯片作为场景背景</div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "10px" }}>
        <div style={{ fontWeight: "600", marginLeft: "10px" }}>使用模板创建视频</div>
        <div style={{ display: "flex", marginTop: "10px" }}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {boxes.map((box, index) => (
              <div
                key={index}
                style={{
                  marginLeft: "10px",
                  marginBottom: "10px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
                className="box"
              >
                <img src={box.image} alt="图片" style={{ height: "110px", borderRadius: "5px" }} />
                <p className="hover-text">
                  <PlusOutlined style={{ marginRight: "2px" }} rev={undefined} />
                  使用此模板
                </p>
                <p style={{ margin: "0" }}>{box.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default CreateDocument
