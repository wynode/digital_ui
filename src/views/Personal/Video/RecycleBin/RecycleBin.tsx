import React, { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import {
  HomeFilled,
  FileOutlined,
  TeamOutlined,
  PlayCircleFilled,
  DeleteFilled,
  VideoCameraFilled,
  FolderOpenFilled,
  UserOutlined,
  QuestionCircleFilled,
  LogoutOutlined,
  SoundFilled,
} from "@ant-design/icons"
import { Breadcrumb, Layout, Menu, theme, Button, Popconfirm, MenuProps, Row } from "antd"
import Logo from "~/components/Logo"
import RecycleBinContent from "~/components/RecycleBin/RecycleBinContent/RecycleBinContent"
import RecycleBinHeader from "~/components/RecycleBin/RecycleBinHeader/RecycleBinHeader"

const { Header, Content, Footer, Sider } = Layout
// const history = useHistory();
type MenuItem = Required<MenuProps>["items"][number]
function getItem(
  label: React.ReactNode,
  key: React.Key,
  path: string,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    path,
    key,
    icon,
    children,
    label,
  } as MenuItem
}

const items: MenuItem[] = [
  getItem("首页", "1", "/personal", <HomeFilled style={{ color: "#666666" }} rev={undefined} />),
  getItem("AI产品", "sub1", "/personal/video", <PlayCircleFilled style={{ color: "#666666" }} rev={undefined} />, [
    getItem("视频", "2", "/personal/video", <PlayCircleFilled style={{ color: "#666666" }} rev={undefined} />),
    getItem(
      "直播",
      "sub1-1",
      "/personal/video/liveroadcast",
      <VideoCameraFilled style={{ color: "#666666" }} rev={undefined} />,
      [
        getItem("直播列表", "3", "", <VideoCameraFilled style={{ color: "#666666" }} rev={undefined} />),
        getItem("直播配置", "4", "", <VideoCameraFilled style={{ color: "#666666" }} rev={undefined} />),
        getItem("文案管理", "5", "/personal/video/liveroadcast/copywrite", <VideoCameraFilled rev={undefined} />),
        getItem("直播提交", "6", "", <VideoCameraFilled style={{ color: "#666666" }} rev={undefined} />),
      ]
    ),
    getItem("回收站", "7", "/personal/video/recycleBin", <DeleteFilled style={{ color: "#666666" }} rev={undefined} />),
  ]),
  getItem("资源广场", "sub2", "", <TeamOutlined style={{ color: "#666666" }} rev={undefined} />, [
    getItem("AI语音", "8", "", <FolderOpenFilled style={{ color: "#666666" }} rev={undefined} />),
    getItem("数字人", "9", "", <UserOutlined style={{ color: "#666666" }} rev={undefined} />),
  ]),
  getItem("其他", "sub3", "", <TeamOutlined style={{ color: "#666666" }} rev={undefined} />, [
    getItem("语音定制", "10", "", <FolderOpenFilled style={{ color: "#666666" }} rev={undefined} />),
    getItem("数字人定制", "11", "", <UserOutlined style={{ color: "#666666" }} rev={undefined} />),
  ]),
  getItem("账号管理", "sub4", "", <TeamOutlined style={{ color: "#666666" }} rev={undefined} />, [
    getItem("套餐开通", "12", "", <FolderOpenFilled style={{ color: "#666666" }} rev={undefined} />),
    getItem("订单管理", "13", "", <UserOutlined style={{ color: "#666666" }} rev={undefined} />),
  ]),
]

const RecycleBin: React.FC = () => {
  const confirm = (e: React.MouseEvent<HTMLElement>) => {
    // console.log(e);
    navigate("/login")
  }

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    // console.log(e);
  }

  const openPopup = () => {
    console.log(this)
  }

  const openNewUrl = () => {
    window.open("https://www.etsow.com/index.php?c=category&id=26", "_blank")
  }

  // function openPopup() {
  //     console.log(this)
  // }
  const navigate = useNavigate()
  //修改路由
  function changeRoute(items: any) {
    const route = items.item.props.path
    console.log(items.keyPath)
    navigate(route)
  }
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  return (
    <Layout style={{ overflow: "auto", backgroundColor: "white" }}>
      <Sider style={{ background: colorBgContainer, backgroundColor: "white" }}>
        <div style={{ fontSize: "20px" }}>
          <Logo></Logo>
        </div>
        <Menu
          defaultSelectedKeys={["7"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
          style={{ backgroundColor: "white", color: "#8e8f91" }}
          inlineCollapsed={false}
          onClick={changeRoute}
        ></Menu>
      </Sider>
      <Layout style={{ backgroundColor: "white" }}>
        <Header
          style={{
            margin: "0 3%",
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "white",
            borderBottom: "1px solid #f4f6f8",
          }}
        >
          <div style={{ fontWeight: 540, fontSize: "16px" }}>回收站</div>
        </Header>
        <Content style={{ margin: "0 0px" }}>
          <div style={{ margin: "0", backgroundColor: "white", display: "flex", flexDirection: "column" }}>
            {/* <div style={{ padding: "3%" }}>视频模板</div> */}
            <div style={{ overflow: "hidden", padding: "0 3%", display: "flex", flexDirection: "row" }}>
              <RecycleBinHeader></RecycleBinHeader>
            </div>
          </div>
          <div style={{ minHeight: "95%", background: colorBgContainer }}>
            <div style={{ padding: "2% 3%" }}>
              <RecycleBinContent />
            </div>
          </div>
        </Content>
      </Layout>
      <div
        className="positioningBox"
        style={{ position: "absolute", left: "40px", bottom: "30px", display: "flex", flexDirection: "column" }}
      >
        <div style={{ fontSize: "12px", color: "#8e8f91" }} onClick={openNewUrl}>
          <SoundFilled style={{ marginRight: "5px" }} rev={undefined} />
          <span>产品公告</span>
        </div>
        <div style={{ fontSize: "12px", color: "#8e8f91" }} onClick={openPopup}>
          <QuestionCircleFilled style={{ marginRight: "5px", marginTop: "15px" }} rev={undefined} />
          <span>使用说明</span>
        </div>
        <Popconfirm
          title="提示"
          description="您真的要退出吗？"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button type="text" style={{ color: "#8e8f91", marginTop: "10px", padding: "0" }}>
            <LogoutOutlined rev={undefined} />
            退出登录
          </Button>
        </Popconfirm>
      </div>
    </Layout>
  )
}
export default RecycleBin
