import React, { useState } from "react"
import ImageList from "./ImageList"
import { postFile, getLiveList, postLiveProfile, patchLiveProfile } from "~/apis/main"
import MySide from "../Personal/MySide"

import PopupLive from "./PopupLive"

import LiveModal from "./LiveModal"
import LiveMobile from "./LiveMobile"

import { BACK_API_ASSETS } from "~/config"

import { Breadcrumb, Layout, Menu, theme, Button, MenuProps, Modal, Popconfirm, message } from "antd"

const { Header, Content, Footer, Sider } = Layout

const App: React.FC = () => {
  const [images, setImages] = React.useState([])
  const [modalVisible, setModalVisible] = React.useState(false)
  const [modalInitValue, setModalInitValue] = React.useState({})
  const handleOpenModal = () => {
    setModalVisible(true)
  }

  const onEditLive = (image: any) => {
    setModalVisible(true)
    setModalInitValue(image)
  }

  const handleCloseModal = () => {
    setModalInitValue({})
    setModalVisible(false)
  }

  const handleSubmitModal = async (form: any) => {
    const listValue = form.getFieldsValue()
    const file = listValue.preview_url.file
    const payload: any = {
      name: listValue.name,
      address: listValue.address.replace(/\s/g, ""),
      // brodcast_type: listValue.brodcast_type,
    }
    if (file) {
      const formData = new FormData()
      formData.append("file", file)
      const res = await postFile(formData)
      payload.preview_url = `${BACK_API_ASSETS}${res.data.id}`
    }
    if (Object.keys(modalInitValue).length) {
      patchLiveProfile(modalInitValue.id, payload)
        .then(() => {
          message.success("创建直播成功")
          fetchData()
          handleCloseModal()
        })
        .catch(() => {
          message.error("创建失败，请联系管理员")
        })
    } else {
      postLiveProfile(payload)
        .then(() => {
          message.success("创建直播成功")
          fetchData()
          handleCloseModal()
        })
        .catch(() => {
          message.error("创建失败，请联系管理员")
        })
    }
  }

  const fetchData = async () => {
    try {
      const res = await getLiveList({})
      setImages(res.data)
    } catch (error) {
      console.error("获取直播间列表错误:", error)
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  const [popVis2, setPopVis2] = React.useState(false)
  const handleSwitchPop = (value: boolean) => {
    setPopVis2(value)
  }

  const [showMobileLive, setShowMobileLive] = useState(false)

  React.useEffect(() => {
    const handleResize = () => {
      setShowMobileLive(window.innerWidth < 700)
    }

    window.addEventListener("resize", handleResize)
    handleResize() // 初始化时执行一次

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <>
      {showMobileLive ? (
        <LiveMobile></LiveMobile>
      ) : (
        <Layout>
          <MySide setPopVis2={setPopVis2}></MySide>
          <PopupLive visible={popVis2} switchVis={handleSwitchPop}></PopupLive>
          <Layout style={{ backgroundColor: "white", overflow: "auto" }}>
            <Header
              style={{
                margin: "0 3%",
                padding: 0,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "white",
                borderBottom: "1px solid #f4f6f8",
              }}
            >
              <div>直播</div>

              <LiveModal
                modalInitValue={modalInitValue}
                visible={modalVisible}
                onCancel={handleCloseModal}
                onSubmit={handleSubmitModal}
              />
              <div>
                {/* <Button style={{ marginRight: "10px", fontSize: "12px" }}>新建文件夹</Button> */}
                <Button type="primary" style={{ margin: "0 10", fontSize: "12px" }} onClick={() => handleOpenModal()}>
                  创建直播
                </Button>
              </div>
            </Header>

            <ImageList images={images} onGetListData={fetchData} onEditLive={onEditLive} />
          </Layout>
        </Layout>
      )}
    </>
  )
}

export default App
