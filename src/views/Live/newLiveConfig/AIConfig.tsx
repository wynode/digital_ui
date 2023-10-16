import React from "react"
import { Tabs, Button, Tooltip } from "antd"
import type { TabsProps } from "antd"
import {
  DesktopOutlined,
  QuestionCircleOutlined,
  CodeSandboxOutlined,
  FileDoneOutlined,
  UserSwitchOutlined,
  InteractionOutlined,
  NotificationOutlined,
  CarryOutOutlined,
} from "@ant-design/icons"
import Opening from "./Opening"
import ProductIntro from "./ProductIntro"
import Finish from "./Finish"
import Objection from "./Objection"
import EventHandle from "./EventHandle"
import ContactMe from "./ContactMe"

const onChange = (key: string) => {
  console.log(key)
}

const items: TabsProps["items"] = [
  {
    key: "title1",
    label: (
      <div className="ai-tab-title">
        AI主播配置
        <div>
          <Tooltip title="AI主播配置说明文本" key={"4096ff"} placement="right">
            <QuestionCircleOutlined
              rev={undefined}
              style={{ marginLeft: "60px", fontSize: "20px", cursor: "pointer" }}
            ></QuestionCircleOutlined>
          </Tooltip>
        </div>
      </div>
    ),
    children: "Content of Tab Pane 1",
    disabled: true,
  },
  {
    key: "1",
    label: (
      <div className="ai-tab-item">
        <DesktopOutlined rev={undefined} className="ai-tab-item-icon" />
        <div className="ai-tab-item-label">
          <p>开场白</p>
          <span>直播开始时用于吸引用户分享、关注</span>
        </div>
      </div>
    ),
    children: <Opening></Opening>,
  },
  {
    key: "2",
    label: (
      <div className="ai-tab-item">
        <CodeSandboxOutlined rev={undefined} className="ai-tab-item-icon" />
        <div className="ai-tab-item-label">
          <p>产品介绍</p>
          <span>对直播的产品主动介绍、吸引用户购买</span>
        </div>
      </div>
    ),
    children: <ProductIntro></ProductIntro>,
  },
  {
    key: "3",
    label: (
      <div className="ai-tab-item">
        <FileDoneOutlined rev={undefined} className="ai-tab-item-icon" />
        <div className="ai-tab-item-label">
          <p>结束语</p>
          <span>对直播的产品主动介绍、吸引用户购买</span>
        </div>
      </div>
    ),
    children: <Finish></Finish>,
  },
  {
    key: "title2",
    label: (
      <div className="ai-tab-title">
        AI助播配置
        <div>
          <Tooltip title="AI助播配置说明文本" key={"4096f"} placement="right">
            <QuestionCircleOutlined
              rev={undefined}
              style={{ marginLeft: "60px", fontSize: "20px", cursor: "pointer" }}
            ></QuestionCircleOutlined>
          </Tooltip>
        </div>
      </div>
    ),
    children: "Content of Tab Pane 1",
    disabled: true,
  },
  {
    key: "4",
    label: (
      <div className="ai-tab-item">
        <InteractionOutlined rev={undefined} className="ai-tab-item-icon" />
        <div className="ai-tab-item-label">
          <p>异议处理</p>
          <span>对直播的产品主动介绍、吸引用户购买</span>
        </div>
      </div>
    ),
    children: <Objection></Objection>,
  },
  {
    key: "5",
    label: (
      <div className="ai-tab-item">
        <NotificationOutlined rev={undefined} className="ai-tab-item-icon" />
        <div className="ai-tab-item-label">
          <p>氛围活跃</p>
          <span>对直播的产品主动介绍、吸引用户购买</span>
        </div>
      </div>
    ),
    children: <EventHandle></EventHandle>,
  },
  {
    key: "title3",
    label: (
      <div className="ai-tab-title">
        AI场控
        <div>
          <Tooltip title="AI场控说明文本" key={"4096"} placement="right">
            <QuestionCircleOutlined
              rev={undefined}
              style={{ marginLeft: "100px", fontSize: "20px", cursor: "pointer" }}
            ></QuestionCircleOutlined>
          </Tooltip>
        </div>
      </div>
    ),
    children: "Content of Tab Pane 1",
    disabled: true,
  },
  {
    key: "6",
    label: (
      <div className="ai-tab-item">
        <CarryOutOutlined rev={undefined} className="ai-tab-item-icon" />
        <div className="ai-tab-item-label">
          <p>流程说明</p>
          <span>对直播过程中如何进行运转进行说明</span>
        </div>
      </div>
    ),
    children: <ContactMe></ContactMe>,
  },
]

const App: React.FC = () => {
  return (
    <>
      <Tabs
        defaultActiveKey="1"
        className="ai-config-tab"
        destroyInactiveTabPane
        tabPosition="left"
        items={items}
        onChange={onChange}
      />
    </>
  )
}

export default App
