import React, { useState } from "react"
import { Button } from "antd"
import { LinkOutlined, CustomerServiceFilled } from "@ant-design/icons"

const ContactMe: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <video
        width="800"
        height="450"
        controls
        src="https://etsow.oss-rg-china-mainland.aliyuncs.com/other/202309011.mp4" // 替换为您的视频链接
      />
      <div
        style={{
          width: 800,
          marginTop: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <span>教程平台</span>
          <LinkOutlined rev={undefined} style={{ marginLeft: 10, marginRight: 4 }}></LinkOutlined>
          <a href="https://www.etsow.com" target="_blank" rel="noopener noreferrer">
            https://www.etsow.com
          </a>
        </div>
        <div style={{ display: "flex", marginTop: 20 }}>
          <CustomerServiceFilled rev={undefined} style={{ fontSize: 30 }} />
          <div style={{ marginLeft: 20 }}>
            <p>称呼：阿狼</p>
            <p>微信：alang</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactMe
