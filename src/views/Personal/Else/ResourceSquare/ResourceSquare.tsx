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
    UserOutlined
} from '@ant-design/icons';
import { MenuProps, Row } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Button } from 'antd';
import Logo from "~/components/Logo";



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
    getItem('视频', 'sub1', '/personal/video', <PlayCircleFilled style={{ color: "#666666" }} rev={undefined} />,
        [getItem('视频', '3', "/personal/video", <PlayCircleFilled style={{ color: "#666666" }} rev={undefined} />),
        getItem('回收站', '4', "/personal/video/recycleBin", <DeleteFilled style={{ color: "#666666" }} rev={undefined} />),
        getItem('直播', 'sub3', "/personal/video/liveroadcast", <VideoCameraFilled style={{ color: "#666666" }} rev={undefined} />,
            [getItem('直播配置', '11', "", < VideoCameraFilled style={{ color: "#666666" }} rev={undefined} />),
            getItem('文案管理', '10', "/personal/video/liveroadcast/copywrite", < VideoCameraFilled rev={undefined} />),
            getItem('直播提交', '12', "", <VideoCameraFilled style={{ color: "#666666" }} rev={undefined} />)]),
        ]),
    getItem('其他', 'sub2', "/personal/else", <TeamOutlined style={{ color: "#666666" }} rev={undefined} />, [
        getItem('资源广场', '6', "/personal/else/ResourceSquare", <FolderOpenFilled style={{ color: "#666666" }} rev={undefined} />),
        getItem('数字人', '8', "/personal/else/digitalpeople", <UserOutlined style={{ color: "#666666" }} rev={undefined} />)]),
    getItem('Files', '9', "/personal/files", <FileOutlined style={{ color: "#666666" }} rev={undefined} />),
];


const ResourceSquare: React.FC = () => {

    const navigate = useNavigate()
    //修改路由
    function changeRoute(items: any) {
        const route = items.item.props.path
        console.log(items.keyPath)
        navigate(route)
    }
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout style={{   }}>
            <Sider style={{ background: colorBgContainer, backgroundColor: "white", }}>
                <div style={{ fontSize: "20px" }}>
                    <Logo></Logo>
                </div>
                <Menu defaultSelectedKeys={['6']} defaultOpenKeys={['sub1', "sub2",]} mode="inline" items={items} style={{ backgroundColor: "white", color: "#8e8f91" }} inlineCollapsed={false} onClick={changeRoute}></Menu>
            </Sider>
            <Layout style={{ backgroundColor: "white" }}>
                <Header style={{ margin: "0 3%", padding: 0, background: colorBgContainer, display: "flex", flexDirection: "row", justifyContent: "space-between", backgroundColor: "white", borderBottom: "1px solid #f4f6f8" }}>
                    <div style={{ fontWeight: 540, fontSize: "16px" }}>资源广场</div>
                </Header>
                <Content style={{ margin: '0 0px' }}>
                    <div style={{ margin: "0", backgroundColor: "white", display: "flex", flexDirection: "column" }}>
                        {/* <div style={{ padding: "3%" }}>视频模板</div> */}
                        <div style={{ overflow: "hidden", padding: "0 3%", display: "flex", flexDirection: "row" }}>

                        </div>
                    </div>
                    <div style={{ minHeight: "95%", background: colorBgContainer }}>
                        <div style={{ padding: "2% 3%" }}>

                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}
export default ResourceSquare