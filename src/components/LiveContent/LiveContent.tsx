import React, { useEffect, useState, useRef } from "react"
import { Table, Space, Dropdown, Button, Modal, message, ConfigProvider, Image } from "antd"
import type { ColumnsType } from "antd/es/table"
import { PlayCircleFilled, CloseCircleFilled, MoreOutlined } from "@ant-design/icons"
import { getWebcastList, deleteWebcastById } from "~/apis/main"
import PlayVideo from "~/components/PlayVideo"
import { BACK_API_ASSETS } from "~/config"
import { format } from "date-fns"
import preview from "~/components/Logo/preview.png"
import { useNavigate } from "react-router-dom"
import "./index.css"
import zhCN from "antd/locale/zh_CN"

interface DataItem {
  key: string
  head: string
  messges: string
  ratio: string
  status: string
  date_created: string
  video: string
  id: string
  cover: string
}

const videoContent: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([])
  const [selectedRowKey, setSelectedRowKey] = useState<string | null>(null)
  const [selectedRowKeyVideo, setselectedRowKeyVideo] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [videoData, setVideoData] = useState({ video: "" })
  const [videoContent, setVideoContent] = useState<string | null>(null)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [loadingMap, setLoadingMap] = useState<any>({ id: 1 })
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  //播放视频
  const palyVideo = (record: any) => {
    setVideoData(record)
    setIsModalOpen(true)
  }

  const handleChangePage = (page: any, page_size: any) => {
    setCurrentPage(page)
    setPageSize(page_size)
    getData({ page: page, limit: page_size })
  }

  const video = videoRef.current
  const cancelVideo = () => {
    video?.pause()
    setIsModalOpen(false)
  }

  const navigate = useNavigate()

  function EditItem(record: any) {
    navigate(`/live/${record.webcast.id}`)
  }

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
    deleteWebcastById(record.id, {}).then(() => {
      message.success("删除成功")
      setCurrentPage(1)
      getData({ page: 1, limit: 10 })
    })
  }

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
      title: "直播标题",
      dataIndex: "title",
      width: 100,
    },
    {
      title: "直播文案",
      dataIndex: "wenan",
      width: 200,
    },
    {
      title: "画布比例",
      dataIndex: "ratio",
      width: 20,
    },
    {
      title: "生成状态",
      dataIndex: "status",
      width: 50,
      render: (text: string, record: DataItem) => (record.video ? "已生成" : "正在生成中..."),
    },
    {
      title: "创建时间",
      dataIndex: "date_created",
      width: 160,
      render: (text: string, record: DataItem) =>
        // text
        format(new Date(record.date_created), "yyyy-MM-dd HH:mm:ss"),
    },
    {
      title: "视频播放",
      dataIndex: "video",
      width: 50,
      render: (text: string, record: DataItem) =>
        record.video ? (
          <PlayCircleFilled
            onClick={() => palyVideo(record)}
            style={{ marginLeft: "20px", color: "#999999" }}
            rev={undefined}
          />
        ) : (
          ""
        ),
    },
    {
      title: "操作",
      key: "action",
      width: 120,
      render: (text: string, record: DataItem, index: number) => {
        return (
          <div>
            {
              <Space size="middle">
                <Dropdown menu={{ items: items(record) }}>
                  <MoreOutlined rev={undefined} style={{ cursor: "pointer" }} />
                </Dropdown>
              </Space>
            }
          </div>
        )
      },
    },
  ]

  function Download(record: any) {
    setLoadingMap((prevState: any) => ({
      ...prevState,
      [record.id]: true,
    }))
    fetch(`${BACK_API_ASSETS}${record.video}`)
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

  const getData = (params: object) => {
    getWebcastList({ ...params }).then((res: any) => {
      setTotalCount(res.meta.filter_count)
      setData(
        res.data.map((item: any) => {
          setVideoContent(item.video_data)
          setStatus(item.status)
          const { video_data = {} } = item.webcast
          return {
            ...item,
            key: item.id,
            id: item.id,
            status: item.status,
            ratio: item.webcast.ratio,
            date_created: item.date_created,
            wenan: video_data.wenan,
            title: video_data.name,
          }
        })
      )
    })
  }

  // 渲染数据
  useEffect(() => {
    getData({ limit: 10 })
    const timer = setInterval(() => {
      getData({ limit: 10 })
    }, 5000)
    return () => {
      clearInterval(timer)
    }
  }, [])
  //获取数据

  return (
    <div>
      <ConfigProvider locale={zhCN}>
        <Table
          dataSource={data}
          columns={columns}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: totalCount,
            onChange: handleChangePage,
          }}
        />
      </ConfigProvider>

      <Modal
        open={isModalOpen}
        footer={false}
        width={546}
        // style={{ padding: "20px"}}
        closable={false}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => cancelVideo()}
        // wrapClassName="modalcss"
      >
        <video ref={videoRef} controls style={{ width: "500px" }} src={`${BACK_API_ASSETS}${videoData.video}`}></video>
      </Modal>
    </div>
  )
}
export default videoContent
