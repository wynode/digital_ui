import { Navigate, useNavigate, } from "react-router-dom";
import { Table, Space, Dropdown, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import { PlayCircleFilled,MoreOutlined } from "@ant-design/icons"

interface DataItem {
    key: string;
    head: string;
    messges: string;
    time: string;
    ready: string;
    // action: string;
}
const items = [
    { key: '1', label: (<Button type="text" onClick={Download}>下载</Button>) },
    { key: '2', label: (<Button type="text" onClick={caption}>下载字幕</Button>) },
    { key: '3', label: (<Button type="text" onClick={edit}>编辑</Button>) },
    { key: '4', label: (<Button type="text" onClick={copy}>创建副本</Button>) },
    { key: '5', label: (<Button type="text" onClick={template}>设为模板</Button>) },
    { key: '6', label: (<Button type="text" onClick={moveto}>移动到</Button>) },
    { key: '7', label: (<Button type="text" onClick={rename}>重命名</Button>) },
    { key: '8', label: (<Button type="text" onClick={del}>删除</Button>) }
];
function Download() {
    console.log("下载");
}
function caption() {
    console.log("下载字幕");
}
function edit() {
    console.log("编辑");
}
function copy() {
    console.log("创建副本");
}
function template() {
    console.log("设为模板");
}
function moveto() {
    console.log("移动到");
}
function rename() {
    console.log("重命名");
}
function del() {
    console.log("删除");
}

const RecycleBinContent = () => {

    const navigate = useNavigate()
    function video(item: any) {
        console.log("video")
    }
    function template() {
        console.log("template")
    }

    const [data, setData] = useState<DataItem[]>([
        {
            key: '1',
            head: '头像',
            messges: "市场调研成果动画演示",
            time: "00:06:45",
            ready: "准备就绪",

        },
        {
            key: '2',
            head: '头像',
            messges: "未命名视频",
            time: "",
            ready: "",

        },
        {
            key: '3',
            head: '头像',
            messges: "2023年04月05日临时",
            time: "00:02:19",
            ready: "准备就绪",

        },
        {
            key: '4',
            head: '头像',
            messges: "2023年04月05日临时",
            time: "00:02:19",
            ready: "准备就绪",

        },
        {
            key: '5',
            head: '头像',
            messges: "市场调研成果动画演示",
            time: "00:06:45",
            ready: "准备就绪",

        },
        {
            key: '6',
            head: '头像',
            messges: "市场调研成果动画演示",
            time: "00:06:45",
            ready: "准备就绪",

        },
        {
            key: '7',
            head: '头像',
            messges: "市场调研成果动画演示",
            time: "00:06:45",
            ready: "准备就绪",

        },
    ]);

    const [selectedRowKey, setSelectedRowKey] = useState<string | null>(null);

    const handleMouseEnter = (record: DataItem) => {
        setSelectedRowKey(record.key);
        // console.log(record)
    };

    const handleMouseLeave = () => {
        setSelectedRowKey(null);
        // console.log("移除该行")
    };
    //播放视频
    const palyVideo = (record: any) => {
        console.log(record.key)
    }
    const columns: ColumnsType<DataItem> = [
        {
            title: 'Head',
            dataIndex: 'head',
            width: 40,
            key: 'head',
            render: (record) => {
                return (
                    <img src={record.image} alt="" style={{ width: '30px', height: '30px', borderRadius: '15%' }} />
                )
            }
        },
        {
            title: 'Messges',
            dataIndex: 'messges',
            key: 'messges',
            width: 200,
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            width: 100,
        },
        {
            title: 'Ready',
            dataIndex: 'ready',
            key: 'ready',
            width: 100,
        },
        {
            title: 'Video',
            dataIndex: 'video',
            key: 'video',
            width: 50,
            render: (text: string, record: DataItem) => (
                selectedRowKey == record.key ?
                    <Space size="middle">
                        <PlayCircleFilled onClick={palyVideo} style={{ color: "#999999" }} rev={undefined} />
                    </Space>
                    :
                    ''
            )
        },
        {
            title: 'Action',
            key: 'action',
            width: 50,
            render: (text: string, record: DataItem) => (
                selectedRowKey == record.key ?
                    <Space size="middle">
                        <Dropdown menu={{ items }}>
                        <MoreOutlined rev={undefined} style={{cursor:"pointer"}} />
                        </Dropdown>
                    </Space>
                    :
                    ''
            )
        },
    ];

    const paginationProps = {
        pageSize: 10, // 每页条数
    };
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "row", }}>
                <div style={{ width: "10%" }} onClick={video}>视频</div>
                <div style={{ width: "10%" }} onClick={template}>模板</div>
            </div>
            <div style={{ marginTop: "10px" }}>
                <Table
                    dataSource={data}
                    columns={columns}
                    showHeader={false}
                    rowKey="key"
                    pagination={paginationProps}
                    onRow={(record) => ({
                        onMouseEnter: () => handleMouseEnter(record),
                        onMouseLeave: handleMouseLeave,
                    })}
                />
            </div>
        </div>
    )
}

export default RecycleBinContent