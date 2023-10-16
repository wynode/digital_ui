import React, { useEffect, useState } from "react"
import { Table, Button, Tag } from "antd"
import KeywordModal from "./KeywordModal"
import { useParams } from "react-router-dom"
import { getLiveConfig, postLiveConfig, getKeyword, postKeyword } from "~/apis/main"

interface TableData {
  keywords: string
  reply: string
  date_created: string
}

const columns = [
  {
    title: "关键词",
    key: "keywords",
    render: (row: any) => (
      <div>{row.keywords && row.keywords.split('，').map((item: string) => <Tag color="processing">{item}</Tag>)}</div>
    ),
  },
  {
    title: "回复内容",
    dataIndex: "reply",
    key: "reply",
  },
  {
    title: "创建时间",
    dataIndex: "date_created",
    key: "date_created",
  },
]

const ParentComponent: React.FC = () => {
  const params = useParams()
  const [data, setData] = useState<TableData[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    // 在这里使用远程 API 调用获取数据，然后更新 state 中的数据
    // 示例：fetchData().then((data) => setData(data));
    // 这里暂时用静态数据代替
    getKeyword({ brodcast_assis: params.id }).then((res) => {
      setData(res.data)
    })
  }, [])

  const handleAddKeyword = () => {
    setIsModalVisible(true)
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
  }

  const handleModalOk = async (keywords: string, reply: string) => {
    // 在这里处理添加关键词的逻辑，例如保存到后端或更新 state
    console.log("关键词", keywords)
    console.log("回复内容", reply)
    await postKeyword({ reply, keywords, config: params.id })
    setIsModalVisible(false)
  }

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Button type="primary" onClick={handleAddKeyword}>
          添加关键词
        </Button>
      </div>
      <Table dataSource={data} columns={columns} />
      <KeywordModal visible={isModalVisible} onCancel={handleModalCancel} onOk={handleModalOk} />
    </div>
  )
}

export default ParentComponent
