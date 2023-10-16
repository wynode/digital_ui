import React from "react"
import { List, Card, Dropdown, Menu, Button, message, Modal } from "antd"
import { format } from "date-fns"
import { MoreOutlined, PlayCircleOutlined, CloseCircleOutlined } from "@ant-design/icons"
import { deleteLive, postStartLive, postStopLive, postGetLiveStatus, postGetStreamUrl } from "~/apis/main"
import { useNavigate } from "react-router-dom"
interface Image {
  id: number
  preview_url: string
  name: string
  date_created: string
}

interface ImageListProps {
  images: Image[]
  onGetListData: () => void
  onEditLive: (image: any) => void
}

const ImageList: React.FC<ImageListProps> = ({ images, onGetListData, onEditLive }) => {
  const navigate = useNavigate()
  const handleConfigure = (image: any) => {
    // 配置直播相关的方法
    navigate(`/personal/live/${image.id}`)
  }

  const handleEditLive = (image: any) => {
    onEditLive(image)
  }

  const [liveAdList, setLiveAdList] = React.useState<string[]>(Array(images.length).fill(""))

  const handleGetStream = (image: any) => {
    postGetStreamUrl({ key: image.address.replace(/\s/g, "") }).then((res: any) => {
      const newLiveAdList = [...liveAdList]
      images.forEach((item, index) => {
        if (item.id === image.id) {
          newLiveAdList[index] = res.url
          setLiveAdList(newLiveAdList)
        }
      })
      navigator.clipboard
        .writeText(res.url)
        .then(() => {
          message.success("获取直播流成功，直播流地址已复制到剪切板")
        })
        .catch((error) => {
          console.error("复制失败: ", error)
        })
    })
  }

  const [isdModalVisible, setIsdModalVisible] = React.useState(false)
  const [rowId, setrowId] = React.useState("")

  const handleDelete = () => {
    deleteLive(rowId, {}).then(() => {
      setIsdModalVisible(false)
      onGetListData()
    })
  }

  const handleCancel = () => {
    setIsdModalVisible(false)
  }

  const showModal = (row: any) => {
    setIsdModalVisible(true)
    setrowId(row.id)
  }

  const items = (image: any) => {
    return [
      {
        key: "3",
        label: (
          <Button
            block
            type="text"
            onClick={() => {
              handleEditLive(image)
            }}
          >
            编辑
          </Button>
        ),
      },
      {
        key: "1",
        label: (
          <Button
            block
            type="text"
            onClick={() => {
              handleConfigure(image)
            }}
          >
            配置直播
          </Button>
        ),
      },
      {
        key: "2",
        label: (
          <Button
            block
            type="text"
            onClick={() => {
              handleGetStream(image)
            }}
          >
            获取直播流
          </Button>
        ),
      },
      {
        key: "4",
        label: (
          <Button
            block
            type="text"
            onClick={() => {
              showModal(image)
            }}
          >
            删除
          </Button>
        ),
      },
    ]
  }
  const [playingList, setPlayingList] = React.useState<string[]>(Array(images.length).fill(""))

  const handleButtonClick = (image: any, index: any) => {
    // 创建新的播放状态数组，并更新对应索引的状态
    const newPlayingList = [...playingList]

    // 发送请求的逻辑
    // ...
    if (newPlayingList[index] === "start") {
      postStopLive({ key: image.address.replace(/\s/g, "") }).then(() => {
        newPlayingList[index] = "notStart"
        setPlayingList(newPlayingList)
        message.success("停止直播成功")
      })
    } else {
      postGetStreamUrl({ key: image.address.replace(/\s/g, "") }).then(() => {
        postStartLive({ key: image.address.replace(/\s/g, "") }).then(() => {
          newPlayingList[index] = "start"
          setPlayingList(newPlayingList)
          message.success("开始直播成功")
        })
      })
    }
  }

  const newPlayingList = [...playingList]

  const [over, setOver] = React.useState(false)

  React.useEffect(() => {
    images.map(async (item: any, index) => {
      const res: any = await postGetLiveStatus({ key: item.address ? item.address.replace(/\s/g, "") : item.address })
      if (res.url && res.url.status === "starting") {
        newPlayingList[index] = "start"
      } else {
        newPlayingList[index] = "notStart"
      }
    })
    setTimeout(() => {
      setPlayingList(newPlayingList)
    }, 500)
  }, [images])

  const [isLive, setIsLive] = React.useState(false)

  const handleToggleLive = () => {
    if (!isLive) {
      // 发送请求开始直播
      // ...

      setIsLive(true)
    } else {
      // 发送请求停止直播
      // ...

      setIsLive(false)
    }
  }

  return (
    <div>
      <div className="live-list">
        <div className="live-item"></div>
        <div className="live-item"></div>
      </div>
      <List
        style={{ padding: "20px 3%" }}
        grid={{ gutter: 20, column: 5 }}
        dataSource={images}
        renderItem={(image, index) => (
          <List.Item>
            <div className="imageBox" style={{ position: "relative", paddingTop: "177.78%", marginBottom: "120px" }}>
              <img
                src={image.preview_url}
                alt={image.name}
                className={playingList[index] === "notStart" ? "imgShadow" : ""}
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
              {playingList[index] && (
                <Button
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "#fff",
                  }}
                  type="primary"
                  danger={playingList[index] === "start"}
                  onClick={() => handleButtonClick(image, index)}
                  icon={
                    playingList[index] === "start" ? (
                      <CloseCircleOutlined rev={undefined} />
                    ) : (
                      <PlayCircleOutlined rev={undefined} />
                    )
                  }
                >
                  {playingList[index] === "start" ? "关闭直播" : "开始直播"}
                </Button>
              )}
              {/* <div className="imageAd">{liveAdList[index] ? `直播流地址：${liveAdList[index] }`: ''}</div> */}
              <div
                className="imageBottom"
                style={{
                  position: "absolute",
                  bottom: -100,
                  left: 0,
                  width: "100%",
                  height: "100px",
                  padding: "16px 24px",
                  background: "#fff",
                  color: "#333",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span className="imageTitle">{image.name}</span>
                  <Dropdown menu={{ items: items(image) }} trigger={["click"]}>
                    <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                      <MoreOutlined
                        className="live-more-nfo"
                        style={{ fontSize: "16px", color: "#08c" }}
                        rev={undefined}
                      />
                    </a>
                  </Dropdown>
                </div>
                {/* <div className="imageAd">{liveAdList[index] ? `直播流地址：${liveAdList[index] }`: ''}</div> */}
                <div className="imageDes">{`更新于${format(new Date(image.date_created || new Date()), "yyyy-MM-dd HH:mm:ss")}`}</div>
              </div>
            </div>
            {/* <Card
              type="inner"
              bordered={false}
              cover={
                // <div style={{ minHeight: 400, minWidth: 90, maxHeight: 400, objectFit: "cover" }}>
                //   <img
                //     alt={image.name}
                //     src={image.preview_url}
                //     style={{ minWidth: '200px', width: '100%', height: 'auto', objectFit: "cover" }}
                //   />
                //   <Button
                //     style={{ position: "absolute" }}
                //     type="default"
                //     onClick={handleToggleLive}
                //     icon={isLive ? <CloseCircleOutlined /> : <PlayCircleOutlined />}
                //   />
                // </div>
                <img
                  alt={image.name}
                  src={image.preview_url}
                  style={{ minWidth: "200px", width: "100%", height: "auto", objectFit: "cover" }}
                />
              }
            >
              <Card.Meta
                title={
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>{image.name}</span>{" "}
                    <Dropdown menu={{ items: items(image) }} trigger={["click"]}>
                      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                        <MoreOutlined
                          className="live-more-nfo"
                          style={{ fontSize: "16px", color: "#08c" }}
                          rev={undefined}
                        />
                      </a>
                    </Dropdown>
                  </div>
                }
                description={`更新于${format(new Date(image.date_created), "yyyy-MM-dd HH:mm:ss")}`}
              />
            </Card> */}
          </List.Item>
        )}
      />
      <Modal
        title="确认删除"
        open={isdModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
        <p>确定要执行删除操作吗？</p>
      </Modal>
    </div>
  )
}

export default ImageList
