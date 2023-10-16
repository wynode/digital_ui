import React, { useState, useEffect } from "react"
import { postLogin } from "~/apis/login"
import { useParseUserInfo } from "~/utils/utils"
import { TOKEN_NAME, REFRESH_TOKEN, USER_INFO } from "~/config"
import { Navigate, useNavigate } from "react-router-dom"
// import Popup from './Popup'
import {
  HomeFilled,
  FileOutlined,
  TeamOutlined,
  PlayCircleFilled,
  DeleteFilled,
  VideoCameraFilled,
  FolderOpenFilled,
  UserOutlined,
  SoundFilled,
  QuestionCircleFilled,
  LogoutOutlined,
  MailOutlined,
} from "@ant-design/icons"
import { Layout, Menu, theme, Button, MenuProps, Modal, Popconfirm } from "antd"
import Logo from "~/components/Logo"
import PersonalContent from "~/components/PersonalContent"
import PersonalHeader from "~/components/PersonalHeader"
import CreateDocument from "~/components/CreateVideo"
import MySide from "./MySide"

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
  getItem("资源广场", "sub2", "/personal/else", <TeamOutlined style={{ color: "#666666" }} rev={undefined} />, [
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

const Dashboard = () => {
  const confirm = (e: React.MouseEvent<HTMLElement>) => {
    // console.log(e);
    navigate("/login")
  }

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    // console.log(e);
  }
  const navigate = useNavigate()

  const [openDocument, setOpenDocument] = useState(false) //控制创建文档模态框
  const [email, setEmail] = useState("")
  const [password, setpassword] = useState("")
  const handleInputChange = (value: string, itype: string) => {
    if (itype === "email") {
      setEmail(value)
    } else if (itype === "password") {
      setpassword(value)
    }
  }
  const loginOrRegister = () => {
    if (email && password) {
      const payload = {
        email: "manager@etsow.com",
        password: "1234qwer",
        mode: "json",
        otp: "string",
      }
      postLogin(payload).then((res: any) => {
        localStorage.setItem(TOKEN_NAME, res.data.access_token)
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh_token)
        const userInfo: any = useParseUserInfo(res.data.access_token)
        localStorage.setItem(USER_INFO, JSON.stringify(userInfo))
        location.replace("/")
      })
      // fetch('/apis/items/avatar')
    }
  }

  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  //改变路由
  function changeRoute(items: any) {
    const route = items.item.props.path
    console.log(items.keyPath)
    navigate(route)
  }

  const [showSide, setShowSide] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowSide(window.innerWidth > 700); // 根据视口宽度设置是否展示 side 组件
      if (window.innerWidth < 700 && !location.href.includes('mobile')) {
        navigate('/chat')
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 初始化时执行一次

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Layout className="my-home">
      <MySide></MySide>
      {/* <Popup></Popup> */}
      {showSide ?       <Content className="my-home-box">
        <div className="my-home-header">
          <p>首页</p>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            {/* <Button style={{ marginRight: "10px", fontSize: "12px" }}>导入PPT文搞</Button> */}
            {/* <Button type="primary" style={{ margin: "0 10", fontSize: "12px" }} onClick={() => setOpenDocument(true)}>
              创建视频
            </Button> */}
          </div>
        </div>
        <div className="my-home-content">
          <div className="my-home-video">
            <div className="mhv-title">视频模版</div>
            <div className="mhv-content">
              <PersonalHeader />
            </div>
          </div>
          <div className="my-home-lately">
            <div className="mhl-title">最近打开</div>
            <div className="mhl-content">
              <PersonalContent />
            </div>
          </div>
          <Modal
            title="选择模板"
            centered
            footer={false}
            open={openDocument}
            onOk={() => setOpenDocument(false)}
            onCancel={() => setOpenDocument(false)}
            style={{ top: 20 }}
            width={"75%"}
          >
            <CreateDocument />
          </Modal>
        </div>
      </Content> : <div className="show_tip"><p>该页面暂未适配移动端，请您在电脑端浏览，以获取完整的用户体验！</p><p>目前已适配移动端页面： AI对话</p></div>}
    </Layout>
  )
}

export default Dashboard
