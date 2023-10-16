import React, { useEffect, useState, useRef } from "react"
import { Table, Space, Dropdown, Button, Modal, message, ConfigProvider, Image } from "antd"
import type { ColumnsType } from "antd/es/table"
import { PlayCircleFilled, CloseCircleFilled, MoreOutlined } from "@ant-design/icons"
import { getVideos, deleteVideosById } from "~/apis/main"
import PlayVideo from "~/components/PlayVideo"
import { BACK_API_ASSETS } from "~/config"
import { format } from "date-fns"
import { useNavigate } from "react-router-dom"
import "./index.css"
import preview from "~/components/Logo/preview.png"

import zhCN from "antd/locale/zh_CN"

interface DataItem {
  id: string
  key: string
  head: string
  messges: string
  ratio: string
  status: string
  date_created: string
  result: string
  cover: string
  name: string
  // action: string;
}

// const items = [
//   {
//     key: "1",
//     label: (
//       <Button type="text" onClick={Download}>
//         下载
//       </Button>
//     ),
//   },
//   {
//     key: "3",
//     label: (
//       <Button type="text" onClick={edit}>
//         编辑
//       </Button>
//     ),
//   },
//   {
//     key: "8",
//     label: (
//       <Button type="text" onClick={del}>
//         删除
//       </Button>
//     ),
//   },
//   // {
//   //   key: "2",
//   //   label: (
//   //     <Button type="text" onClick={caption}>
//   //       下载字幕
//   //     </Button>
//   //   ),
//   // },

//   // {
//   //   key: "4",
//   //   label: (
//   //     <Button type="text" onClick={copy}>
//   //       创建副本
//   //     </Button>
//   //   ),
//   // },
//   // {
//   //   key: "5",
//   //   label: (
//   //     <Button type="text" onClick={template}>
//   //       设为模板
//   //     </Button>
//   //   ),
//   // },
//   // {
//   //   key: "6",
//   //   label: (
//   //     <Button type="text" onClick={moveto}>
//   //       移动到
//   //     </Button>
//   //   ),
//   // },
//   // {
//   //   key: "7",
//   //   label: (
//   //     <Button type="text" onClick={rename}>
//   //       重命名
//   //     </Button>
//   //   ),
//   // },

// ]

// function Download() {
//   console.log("下载")
// }
function caption() {
  console.log("下载字幕")
}
function edit() {
  console.log("编辑")
}
function copy() {
  console.log("创建副本")
}
function template() {
  console.log("设为模板")
}
function moveto() {
  console.log("移动到")
}
function rename() {
  console.log("重命名")
}
function del() {
  console.log("删除")
}

const videoContent: React.FC = () => {
  // 表格数据
  const [data, setData] = useState<DataItem[]>([])
  //修改操作按钮状态
  const [selectedRowKey, setSelectedRowKey] = useState<string | null>(null)
  //修改video的icon状态
  const [selectedRowKeyVideo, setselectedRowKeyVideo] = useState<string | null>(null)
  //修改视频本身状态
  const [status, setStatus] = useState<string | null>(null)
  //模态框状态
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [videoData, setVideoData] = useState({ result: "" })

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalCount, setTotalCount] = useState<number>(0)
  const handleChangePage = (page: any, page_size: any) => {
    setCurrentPage(page)
    setPageSize(page_size)
    // getData({ page: page, limit: page_size })
  }

  // const [record, setRecord] = useState({ id: "", result: '' })
  let records = { id: "", result: "" }

  const [videoContent, setVideoContent] = useState<string | null>(null)

  const [loadingMap, setLoadingMap] = useState<any>({ id: 1 })

  const items = (record: any) => [
    {
      key: "1",
      label: (
        <Button type="text" onClick={() => Download(record)}>
          下载
        </Button>
      ),
    },
    {
      key: "3",
      label: (
        <Button type="text" onClick={() => EditItem(record)}>
          编辑
        </Button>
      ),
    },
    {
      key: "8",
      label: (
        <Button type="text" onClick={() => delItem(record)}>
          删除
        </Button>
      ),
    },
  ]

  function delItem(record: any) {
    deleteVideosById(record.id, {}).then(() => {
      message.success("删除成功")
      setCurrentPage(1)
      getData({ page: 1, limit: 10 })
    })
  }
  function Download(record: any) {
    setLoadingMap((prevState: any) => ({
      ...prevState,
      [record.id]: true,
    }))
    fetch(`${BACK_API_ASSETS}${record.result}`)
      .then((response) => response.blob())
      .then((blob) => {
        // 创建一个链接元素
        const link = document.createElement("a")
        link.href = URL.createObjectURL(blob)
        link.download = "video.mp4" // 设置下载文件的名称
        link.click()

        // 清除创建的链接元素
        link.remove()
        setLoadingMap((prevState: any) => ({
          ...prevState,
          [record.id]: false,
        }))
      })
      .catch(() => {
        message.error("下载视频失败")
      })
  }

  const [timer, setTimer] = React.useState<NodeJS.Timeout | undefined>(undefined)

  // 渲染数据
  // useEffect(() => {
  //   getData({ limit: 10 })
  //   const timer1 = setInterval(() => {
  //     getData({ limit: 10 })
  //   }, 5000)
  //   setTimer(timer1)
  //   return () => {
  //     clearInterval(timer)
  //   }
  // }, [])
  useEffect(() => {
    getData({ limit: 10, page: currentPage })
    if (timer) {
      clearInterval(timer)
    }
    const currentTimer = setInterval(() => {
      getData({ limit: 10, page: currentPage })
    }, 5000)
    setTimer(currentTimer)
    return () => {
      clearInterval(currentTimer)
    }
  }, [currentPage])
  //获取数据
  const getData = (params: object) => {
    getVideos({ ...params }).then((res: any) => {
      setTotalCount(res.meta.filter_count)
      setData(
        res.data.map((item: any) => {
          return {
            ...item,
            key: item.id,
            id: item.id,
            status: item.status,
            ratio: item.ratio,
            date_created: item.date_created,
            messges: "未命名视频",
            video_title: item.video_data ? item.video_data.name : "未命名视频",
            messgess: item.video_data && item.video_data.scenes ? item.video_data.scenes[0].script.content : "视频文案",
            // messges:item.video_data.scenes.map((item:any)=>{
            //     return(item.script.content)
            // })
          }
        })
      )
    })
  }

  //显示模态框
  const showModal = () => {
    setIsModalOpen(true)
  }
  //点击ok
  const handleOk = () => {
    setIsModalOpen(false)
  }
  //点击取消
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  //鼠标移入
  const handleMouseEnter = (record: DataItem) => {
    setSelectedRowKey(record.key)
    setselectedRowKeyVideo(record.status)
    // console.log(record.status)
  }
  //鼠标移除
  const handleMouseLeave = () => {
    setSelectedRowKey(null)
    setselectedRowKeyVideo(null)
    // console.log("移除该行")
  }
  //表头设置
  const columns: ColumnsType<DataItem> = [
    {
      title: "预览图",
      dataIndex: "cover",
      width: 160,
      key: "cover",
      render: (text: string, record: DataItem) =>
        record.cover ? (
          <Image
            width={160}
            style={{ maxHeight: "90px", objectFit: "cover" }}
            src={`${BACK_API_ASSETS}${record.cover}?quality=50`}
            placeholder={<Image preview={false} src={`${BACK_API_ASSETS}${record.cover}?quality=1`} width={160} />}
          />
        ) : (
          // <img style={{ width: "90px" }} src={`${BACK_API_ASSETS}${record.cover}?quality=10`} alt="" />
          <img src={preview} style={{ width: "160px", maxHeight: "90px", objectFit: "cover" }} alt="" />
        ),
    },
    {
      title: "视频标题",
      dataIndex: "video_title",
      key: "video_title",
      width: 100,
    },
    {
      title: "视频文案",
      dataIndex: "messgess",
      key: "messgess",
      width: 200,
    },
    {
      title: "画布比例",
      dataIndex: "ratio",
      key: "ratio",
      width: 70,
    },
    {
      title: "创建时间",
      key: "date_created",
      width: 160,
      render: (text: string, record: DataItem) =>
        // text
        format(new Date(record.date_created), "yyyy-MM-dd HH:mm:ss"),
    },
    {
      title: "生成状态",
      dataIndex: "status",
      key: "status",
      width: 80,
      render: (text: string, record: DataItem) => (record.result ? "已生成" : "正在生成中..."),
    },

    {
      title: "视频播放",
      dataIndex: "video",
      key: "video",
      width: 50,
      render: (text: string, record: DataItem) =>
        record.result ? (
          <PlayCircleFilled
            onClick={() => palyVideo(record)}
            style={{ marginLeft: "20px", color: "#999999" }}
            rev={undefined}
          />
        ) : (
          // <PlayVideo />
          ""
        ),
    },
    {
      title: "操作",
      key: "action",
      width: 120,
      render: (text: string, record: DataItem, index: number) => {
        // const download = record.result ? (
        //   <Button type="primary" loading={loadingMap[record.id]} onClick={() => Download(record, index)}>
        //     下载
        //   </Button>
        // ) : (
        //   ""
        // )
        // const edit = (
        //   <Button type="primary" className="edit-btn-action" onClick={() => EditItem(record, index)}>
        //     编辑
        //   </Button>
        // )
        // return (
        //   <div>
        //     {download}
        //     {edit}
        //   </div>
        // )
        return (
          <div>
            {
              <Space size="middle">
                <Dropdown menu={{ items: items(record) }}>
                  <MoreOutlined onClick={() => handleSetRecord(record)} rev={undefined} style={{ cursor: "pointer" }} />
                </Dropdown>
              </Space>
            }
          </div>
        )
      },
    },
  ]

  function handleSetRecord(record: any) {
    records = record
  }
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const video = videoRef.current
  const cancelVideo = () => {
    video?.pause()
    setIsModalOpen(false)
  }
  //播放视频
  const palyVideo = (record: any) => {
    console.log(record)
    setVideoData(record)
    setIsModalOpen(true)
  }

  const navigate = useNavigate()

  function EditItem(record: any) {
    navigate(`/video/${record.id}`)
  }

  return (
    <div>
      <ConfigProvider locale={zhCN}>
        <Table
          dataSource={data}
          columns={columns}
          showHeader={true}
          rowKey="key"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: totalCount,
            onChange: handleChangePage,
          }}
          onRow={(record) => ({
            onMouseEnter: () => handleMouseEnter(record),
            onMouseLeave: handleMouseLeave,
          })}
        />
      </ConfigProvider>

      <Modal
        open={isModalOpen}
        footer={false}
        width={960}
        closable={false}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => cancelVideo()}
        // wrapClassName="modalcss"
      >
        <video
          ref={videoRef}
          controls
          style={{ width: "920px", maxHeight: "700px" }}
          src={`${BACK_API_ASSETS}${videoData.result}`}
        ></video>
        {/* <PlayVideo className="playVideo" videoData={videoData}></PlayVideo> */}
        {/* <CloseCircleFilled onClick={handleCancel} className='closeIcon' rev={undefined} /> */}
      </Modal>
    </div>
  )
}
export default videoContent
