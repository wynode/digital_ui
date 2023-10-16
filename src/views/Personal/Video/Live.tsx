import React, { useState, } from "react"
import { Navigate, useNavigate, } from "react-router-dom";
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
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Button, MenuProps,Modal, Popconfirm } from 'antd';
import Logo from "~/components/Logo";
import LiveContent from "~/components/LiveContent/LiveContent";
import LiveHeader from "~/components/LiveHeader/LiveHeader";
import CreateDocument from "~/components/CreateVideo"
import MySide from "../MySide"


const { Header, Content, Footer, Sider } = Layout;
// const history = useHistory();
type MenuItem = Required<MenuProps>['items'][number];
function getItem(
    label: React.ReactNode,
    key: React.Key,
    path: string,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        path,
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('首页', '1', "/personal", <HomeFilled style={{ color: "#666666" }} rev={undefined} />),
    getItem('AI产品', 'sub1', '/personal/video', <PlayCircleFilled style={{ color: "#666666" }} rev={undefined} />,
        [getItem('直播', '2', "/personal/video", <PlayCircleFilled style={{ color: "#666666" }} rev={undefined} />),
        getItem('直播', 'sub1-1', "/personal/video/liveroadcast", <VideoCameraFilled style={{ color: "#666666" }} rev={undefined} />,
            [getItem('直播列表', '3', "", < VideoCameraFilled style={{ color: "#666666" }} rev={undefined} />),
            getItem('直播配置', '4', "", < VideoCameraFilled style={{ color: "#666666" }} rev={undefined} />),
            getItem('文案管理', '5', "/personal/video/liveroadcast/copywrite", < VideoCameraFilled rev={undefined} />),
            getItem('直播提交', '6', "", <VideoCameraFilled style={{ color: "#666666" }} rev={undefined} />)]),
        getItem('回收站', '7', "/personal/video/recycleBin", <DeleteFilled style={{ color: "#666666" }} rev={undefined} />),
        ]),
    getItem('资源广场', 'sub2', "", <TeamOutlined style={{ color: "#666666" }} rev={undefined} />, [
        getItem('AI语音', '8', "", <FolderOpenFilled style={{ color: "#666666" }} rev={undefined} />),
        getItem('数字人', '9', "", <UserOutlined style={{ color: "#666666" }} rev={undefined} />)]),
    getItem('其他', 'sub3', "", <TeamOutlined style={{ color: "#666666" }} rev={undefined} />, [
        getItem('语音定制', '10', "", <FolderOpenFilled style={{ color: "#666666" }} rev={undefined} />),
        getItem('数字人定制', '11', "", <UserOutlined style={{ color: "#666666" }} rev={undefined} />)]),
    getItem('账号管理', 'sub4', "", <TeamOutlined style={{ color: "#666666" }} rev={undefined} />, [
        getItem('套餐开通', '12', "", <FolderOpenFilled style={{ color: "#666666" }} rev={undefined} />),
        getItem('订单管理', '13', "", <UserOutlined style={{ color: "#666666" }} rev={undefined} />)]),
];


const Video: React.FC = () => {
    const confirm = (e: React.MouseEvent<HTMLElement>) => {
        // console.log(e);
        navigate("/login");
    };

    const cancel = (e: React.MouseEvent<HTMLElement>) => {
        // console.log(e);
    };
    const [createVideo, setCreateVideo] = useState(false);//控制创建文档模态框
    const navigate = useNavigate()
    //修改路由
    function changeRoute(items: any) {
        // const route = items.item.props.path
        // console.log(items.keyPath)
        navigate('/live')
    }
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout style={{ overflow: "auto", backgroundColor: "white" }}>
            <MySide></MySide>
            <Layout style={{ backgroundColor: "white", overflow: "auto" }}>
                <Header style={{ margin: "0 3%", padding: 0, background: colorBgContainer, display: "flex", flexDirection: "row", justifyContent: "space-between", backgroundColor: "white", borderBottom: "1px solid #f4f6f8" }}>
                    <div>直播</div>
                    <div>
                        <Button style={{ marginRight: "10px", fontSize: "12px" }}>新建文件夹</Button>
                        <Button type="primary" style={{ margin: "0 10", fontSize: "12px"}} onClick={() => changeRoute(true)}>创建直播</Button>
                    </div>
                </Header>
                <Content style={{ margin: '0 0px' }}>
                    <div style={{ margin: "0", backgroundColor: "white", display: "flex", flexDirection: "column" }}>
                        {/* <div style={{ padding: "3%" }}>直播模板</div> */}
                        <div style={{ overflow: "hidden", padding: "0 3%", display: "flex", flexDirection: "row" }}>
                            <LiveHeader></LiveHeader>
                        </div>
                    </div>
                    <div style={{ minHeight: "95%", background: colorBgContainer }}>
                        <div style={{ padding: "2% 3%" }}>
                            <LiveContent />
                        </div>
                    </div>
                </Content>
                <Modal
                    title="选择模板"
                    centered
                    footer={false}
                    open={createVideo}
                    onOk={() => setCreateVideo(false)}
                    onCancel={() => setCreateVideo(false)}
                    style={{ top: 20 }}
                    width={"75%"}
                >
                    <CreateDocument />
                </Modal>
            </Layout>
        </Layout>
    )
}
export default Video