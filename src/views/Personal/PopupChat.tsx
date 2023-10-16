import React from "react"
import { Modal, Row, Col, List } from "antd"

interface Props {
  visible: boolean
  switchVis: (value: boolean) => void
}

const Popup: React.FC<Props> = (props) => {
  const { visible, switchVis } = props
  const videoUrl = "https://etsow.oss-rg-china-mainland.aliyuncs.com/other/202308291.mp4"
  const [newsData, setNewsData] = React.useState([])
  const [newsData1, setNewsData1] = React.useState([])

  function handleCancel() {
    localStorage.setItem("firstOpenDate1", String(new Date().getDate()))
    switchVis(false)
  }

  React.useEffect(() => {
    const lastDate = localStorage.getItem("firstOpenDate1")

    if (String(new Date().getDate()) !== lastDate) {
      switchVis(true)
    }
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.etsow.com/index.php?s=news&c=search&api_call_function=module_list&appid=1&appsecret=PHPCMF9F456BBAA6DDA&page=1&pagesize=4&catid=25"
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
    <Modal open={visible} destroyOnClose={true} onCancel={handleCancel} footer={null} width={1170} style={{ minWidth: '1170px' }}>
      <div className="popup-tit">AI对话 - 探形</div>
      <div style={{ display: "flex" }}>
      <div>
          <video width={690} height={400} autoPlay controls src={videoUrl}></video>
          {/* <img src="http://wynode.com/img/header.jpg" style={{ width: '100%' }} alt="视频" /> */}
        </div>
        <div style={{ marginLeft: "20px", fontSize: "14px", marginRight: "10px" }}>
          <div className="popup-info">
            <p>AI对话可以完成多种任务和功能。以下列举了AI对话的一些常见应用</p>
            <p>
              <span>客户服务与支持</span>
              ：AI对话可以自动回答常见问题、提供产品信息、解决用户疑问，提供即时目准确的支持服务，减轻人工客服负担。
            </p>
            <p>
              <span>营销与销售</span>
              ：AI对话可以推荐产品、提供个性化推荐、回答购买相关问题，增加销售转化率提升用户购物体验。
            </p>
            <p>
              <span>信息查询与导航</span>
              ：AI对话可以帮助用户查找和获取各种信息，例如天气预报、新闻、股票行情等，还可以提供导航指引、旅行建议等服务。
            </p>
            <p>
              <span>日程安排与提醒</span>
              ：AI对话可以帮助用户管理日程安排，提醒重要事项和会议，协助安排行程提高工作与生活的效率。
            </p>
            <p>
              <span>个人助理与智能家居控制</span>
              ：A对话可以像个人助理一样，管理个人信息、制定计划、安排活动，还能与智能家居设备互联，控制家居设备、调节温度等。
            </p>
            <p>
              <span>教育与知识问答</span>：
              A对话可以提供教育辅助、知识问答服务，帮助学生解答问题、完成作业并提供学习建议和知识引导。
            </p>
            这些只是AI对话的一部分应用领域，实际上，AI对话在不同行业和场景中具有广泛的潜力，能够根据具体需求进行定制开发，满足各种用户需求和业务场景。
          </div>
        </div>
      </div>
      <Row gutter={40}>
        <Col span={12}>
          <div className="popup-title">AI对话</div>
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
