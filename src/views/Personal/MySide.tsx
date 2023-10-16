import React from "react"
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
  ProfileFilled,
  SoundFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  QuestionCircleFilled,
  LogoutOutlined,
  MehFilled,
  MessageFilled,
  MailOutlined,
  ShopFilled,
  FireFilled,
  FireTwoTone,
  FireOutlined,
} from "@ant-design/icons"
import { Breadcrumb, Layout, Menu, theme, Button, MenuProps, Modal, Popconfirm } from "antd"
import Logo from "~/components/Logo/Logo.png"
import Logo2 from "~/components/Logo/Logo2.png"
import Avatar from "~/components/Logo/avatar.png"

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>["items"][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  path: string,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    path,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

const items: MenuProps["items"] = [
  getItem("首页", "home", "/", <HomeFilled style={{ color: "#666666" }}></HomeFilled>),
  getItem(
    "AI工具",
    "sub1",
    "",
    null,
    [
      getItem("视频", "/video", "/personal/video", <PlayCircleFilled style={{ color: "#666666" }}></PlayCircleFilled>),
      getItem("对话", "/chat", "/chat", <MessageFilled style={{ color: "#666666" }}></MessageFilled>),
      getItem(
        <div>
          直播{" "}
          <span style={{ color: "#f5222d", marginLeft: '14px', border: '1px solid #f5222d', borderRadius: '6px', padding: '2px 4px' }}>
            <FireFilled style={{ color: "#f5222d", marginRight: '6px'}} />
            hot
          </span>
        </div>,
        "/live",
        "/personal/live",
        <VideoCameraFilled style={{ color: "#666666" }}></VideoCameraFilled>
      ),
    ],
    "group"
  ),
  getItem(
    "资源广场",
    "3",
    "",
    null,
    [
      getItem("数字人", "/vtuber", "/personal/vtuber", <MehFilled style={{ color: "#666666" }}></MehFilled>),
      getItem("AI语音", "/sound", "/personal/audio", <SoundFilled style={{ color: "#666666" }}></SoundFilled>),
    ],
    "group"
  ),
  // getItem(
  //   "订单管理",
  //   "4",
  //   "",
  //   null,
  //   [getItem("套餐开通", "/combo", "/combo", <ShopFilled style={{ color: "#666666" }}></ShopFilled>)],
  //   "group"
  // ),
]

// const history = useHistory();

interface Props {
  setPopVis?: React.Dispatch<React.SetStateAction<boolean>>
  setPopVis1?: React.Dispatch<React.SetStateAction<boolean>>
  setPopVis2?: React.Dispatch<React.SetStateAction<boolean>>
}

const App: React.FC<Props> = (props: any) => {
  const { setPopVis, setPopVis1, setPopVis2 } = props
  const [collapsed, setCollapsed] = React.useState(false)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const changeRoute: MenuProps["onClick"] = (items: any) => {
    const route = items.item.props.path
    console.log(items.keyPath)
    if (route === "/personal/video") {
      document.title = "AI工具_视频 - 探形  - 把工作交给数字人"
    } else if (route === "/personal/live") {
      document.title = "AI工具_直播 - 探形  - 把工作交给数字人"
    } else if (route === "/personal/vtuber") {
      document.title = "资源广场_数字人 - 探形  - 把工作交给数字人"
    } else if (route === "/personal/audio") {
      document.title = "资源广场_AI语音 - 探形  - 把工作交给数字人"
    } else if (route === "/combo") {
      document.title = "订单管理_套餐开通 - 探形  - 把工作交给数字人"
    } else {
      document.title = "探形  - 把工作交给数字人"
    }
    if (window.innerWidth < 700 && !route.includes("chat")) {
      setCollapsed(true)
      navigate("/")
    } else {
      navigate(route)
    }
  }

  // function changeRoute(items: any) {
  //   const route = items.item.props.path
  //   console.log(items.keyPath)
  //   navigate(route)
  // }

  const navigate = useNavigate()

  const confirm = (e: React.MouseEvent<HTMLElement>) => {
    // console.log(e);
    localStorage.clear()
    navigate("/login")
  }

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    // console.log(e);
  }
  const [showSide, setShowSide] = React.useState(true)

  const a = "1111"

  const openPopup = () => {
    if (location.href.includes("/video")) {
      setPopVis(true)
    } else if (location.href.includes("/chat")) {
      setPopVis1(true)
    } else if (location.href.includes("/live")) {
      setPopVis2(true)
    }
  }

  const openNewUrl = () => {
    window.open("https://www.etsow.com/index.php?c=category&id=26", "_blank")
  }

  React.useEffect(() => {
    const handleResize = () => {
      setShowSide(window.innerWidth < 700)
      setCollapsed(window.innerWidth < 700) // 根据视口宽度设置是否展示 side 组件
    }

    window.addEventListener("resize", handleResize)
    handleResize() // 初始化时执行一次

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <Sider width="248" trigger={null} collapsible collapsed={collapsed}>
      <div className="my-side">
        {showSide ? (
          <Button className="my-side-fold" type="default" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        ) : (
          ""
        )}
        <div style={{ fontSize: "20px" }}>
          {collapsed ? <img className="my-logo" src={Logo2} alt="" /> : <img className="my-logo" src={Logo} alt="" />}
        </div>
        <Menu
          onClick={changeRoute}
          // style={{ width: 248 }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
          className="my-menu"
        />
        {collapsed ? (
          <div className="my-side-bottom">
            <div className="my-side-avatar">
              <img src={Avatar} alt="" />
            </div>
          </div>
        ) : (
          <div className="my-side-bottom">
            <div style={{ color: "#8e8f91" }} onClick={openNewUrl}>
              <ProfileFilled style={{ marginRight: "5px" }} rev={undefined} />
              <span style={{ cursor: "pointer" }}>产品公告</span>
            </div>
            <div style={{ color: "#8e8f91" }} onClick={openPopup}>
              <QuestionCircleFilled style={{ marginRight: "5px", marginTop: "15px" }} rev={undefined} />
              <span style={{ cursor: "pointer" }}>使用说明</span>
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
            <div className="my-side-avatar">
              <img src={Avatar} alt="" />
              <span>{localStorage.getItem("userName")}</span>
            </div>
          </div>
        )}
      </div>
    </Sider>
  )
}

export default App
