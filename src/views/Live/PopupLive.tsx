import React from "react"
import { Modal, Row, Col, List } from "antd"

interface Props {
  visible: boolean
  switchVis: (value: boolean) => void
}

const Popup: React.FC<Props> = (props) => {
  const { visible, switchVis } = props
  const videoUrl = "https://etsow.oss-rg-china-mainland.aliyuncs.com/other/202309011.mp4"
  const [newsData, setNewsData] = React.useState([])
  const [newsData1, setNewsData1] = React.useState([])

  function handleCancel() {
    localStorage.setItem("firstOpenDate2", String(new Date().getDate()))
    switchVis(false)
  }

  React.useEffect(() => {
    const lastDate = localStorage.getItem("firstOpenDate2")

    if (String(new Date().getDate()) !== lastDate) {
      switchVis(true)
    }
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.etsow.com/index.php?s=news&c=search&api_call_function=module_list&appid=1&appsecret=PHPCMF9F456BBAA6DDA&page=1&pagesize=4&catid=27"
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
    <Modal
      open={visible}
      destroyOnClose={true}
      onCancel={handleCancel}
      footer={null}
      width={1000}
      style={{ minWidth: "1000" }}
    >
      <div className="popup-tit">实景AI无人直播 - 探形</div>
      <div style={{ display: "flex" }}>
        <div>
          <video width={600} height={340} autoPlay controls src={videoUrl}></video>
          {/* <img src="http://wynode.com/img/header.jpg" style={{ width: '100%' }} alt="视频" /> */}
        </div>
        <div style={{ marginLeft: "20px", fontSize: "14px", marginRight: "10px" }}>
          <div className="popup-info">
            <p>
              实景AI无人直播系统超越了传统的直播方式，无论是热门景点、奇妙自然景观还是工厂生产线，实景AI无人直播系统通过创新而高效的技术手段，将这些场景以高清、稳定的画面带到观众眼前。
            </p>
            <p>
              该系统实现了与观众的实时互动。通过AI引导、问答、购买等功能，您的观众可以与场景进行互动，并获取实时信息和服务。这种独特的互动体验将大大提高观众的参与度，同时为您的产品创造更多商机。
            </p>
            <p>
              实景AI无人直播系统不仅适用于旅游景点、餐饮店、工厂等行业，更能为各类产品的展示和销售增添新的活力。通过24小时不间断直播的全球触达，您的产品将得到更多用户的关注和认可。同时，系统还提供详尽的数据分析和用户行为洞察，助力您更好地理解目标受众和制定更精准的产品策略。
            </p>
            <p>
              立即加入我们，开启您产品的线上体验新纪元！实景AI无人直播将为您的产品带来无限可能，为您的商业成功注入新的动力！
            </p>
          </div>
        </div>
      </div>
      <Row gutter={40}>
        <Col span={12}>
          <div className="popup-title">AI直播</div>
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
