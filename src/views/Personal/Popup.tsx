import React from "react"
import { Modal, Row, Col, List } from "antd"

interface Props {
  visible: boolean
  switchVis: (value: boolean) => void
}

const Popup: React.FC<Props> = (props) => {
  const { visible, switchVis } = props
  const videoUrl = "https://etsow.oss-rg-china-mainland.aliyuncs.com/other/202308261.mp4"
  const [newsData, setNewsData] = React.useState([])
  const [newsData1, setNewsData1] = React.useState([])

  function handleCancel() {
    localStorage.setItem("firstOpenDate", String(new Date().getDate()))
    switchVis(false)
  }

  React.useEffect(() => {
    const lastDate = localStorage.getItem("firstOpenDate")

    if (String(new Date().getDate()) !== lastDate) {
      switchVis(true)
    }
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.etsow.com/index.php?s=news&c=search&api_call_function=module_list&appid=1&appsecret=PHPCMF9F456BBAA6DDA&page=1&pagesize=4&catid=24"
        )
        const jsonData = await response.json()
        const response1 = await fetch(
          "https://www.etsow.com/index.php?s=news&c=search&api_call_function=module_list&appid=1&appsecret=PHPCMF9F456BBAA6DDA&page=1&pagesize=4&catid=26"
        )
        const jsonData1 = await response1.json()
        setNewsData(jsonData.data)
        setNewsData1(jsonData1.data)
      } catch (error) {
        console.error("Error fetching news data:", error)
      }
    }

    fetchData()
  }, [])
  return (
    <Modal open={visible} destroyOnClose={true} onCancel={handleCancel} footer={null} width={1000} style={{ minWidth: '1000px' }}>
      <div className="popup-tit">视频制作 - 探形</div>
      <div style={{ display: "flex" }}>
        <div>
          <video width={640} height={360} autoPlay controls src={videoUrl}></video>
          {/* <img src="http://wynode.com/img/header.jpg" style={{ width: '100%' }} alt="视频" /> */}
        </div>
        <div style={{ marginLeft: "20px", fontSize: "14px", marginTop: "14px", marginRight: "14px" }}>
          <p>
            尊敬的客户，感谢您一直以来对我们AI
            数字人短视频制作产品的支持！我们自豪地向您推荐我们的产品，为您带来一种全新的视频创作体验。利用先进的人工智能技术，我们的产品能够帮助您轻松制作出精美短视频，无论是宣传、广告还是社交媒体营销，我们都能满足您的需求。我们提供丰富多样的视觉效果、素材库和模板，让您拥有个性化、专业级别的作品。我们相信，我们的产品将激发您的创造力，并使您的品牌或个人形象脱颖而出。立即体验AI
            数字人短视频制作，让您的视频创作更加简单、高效！
          </p>
        </div>
      </div>
      <Row gutter={40}>
        <Col span={12}>
          <div className="popup-title">AI短视频</div>
          <List
            dataSource={newsData}
            renderItem={(item: any) => (
              <List.Item className="popup-item">
                <a target="_blank" href={item.url}>
                  {item.title}
                </a>{" "}
                <span>{item.updatetime}</span>
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <div className="popup-title">新闻资讯</div>
          <List
            dataSource={newsData1}
            renderItem={(item: any) => (
              <List.Item className="popup-item">
                <a target="_blank" href={item.url}>
                  {item.title}
                </a>{" "}
                <span>{item.updatetime}</span>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </Modal>
  )
}

export default Popup
