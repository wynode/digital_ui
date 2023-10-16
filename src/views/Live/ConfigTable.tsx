import React, { useEffect, useState } from "react"
import { Table, Button, message, Modal, Tag } from "antd"
import { FormInstance } from "antd/lib/form"
import { useParams } from "react-router-dom"
import { postLiveConfig, getLiveConfig, patchLiveConfig, deleteLiveConfig } from "~/apis/main"
import ConfigModal from "./ConfigModal"
import { format } from "date-fns"

interface TableData {
  key: string
  config_type: string
  second_type: string
  reply_type: string
  keywords: string
  date_created: string
  reply: string
  audio_file: string
}

const defaultState: TableData = {
  key: "",
  config_type: "",
  second_type: "",
  reply_type: "",
  keywords: "",
  date_created: "",
  reply: "",
  audio_file: "",
}

const configTypeOptions = {
  event: "事件",
  keywords: "关键词",
}

const eventOptions = {
  say_hello: "打招呼",
  welcome: "用户进场",
  // say_bye: "用户离场",
}

const keywordsOptions = {
  production: "产品介绍",
  exception: "异议处理",
  atmosphere: "活跃气氛",
  other: "其他",
}

const replyTypeOptions = {
  audio: "录音驱动",
  text: "文本驱动",
  text_gpt: "文本+AI员工接管",
  gpt: "AI员工接管",
}

const ParentComponent: React.FC = () => {
  const columns = [
    {
      title: "配置类型",
      dataIndex: "config_type_cn",
      key: "config_type_cn",
    },
    {
      title: "类型场景",
      dataIndex: "second_type_cn",
      key: "second_type_cn",
    },
    {
      title: "类型",
      dataIndex: "reply_type_cn",
      key: "reply_type_cn",
    },
    {
      title: "关键词",
      key: "keywords",
      render: (row: any) => (
        <div>
          {row.keywords && row.keywords.split("，").map((item: string) => <Tag color="processing">{item}</Tag>)}
        </div>
      ),
    },
    {
      title: "回复内容",
      dataIndex: "reply",
      key: "reply",
      width: "28%",
    },
    {
      title: "创建时间",
      dataIndex: "date_created",
      key: "date_created",
    },
    {
      title: "操作",
      key: "action",
      render: (row: any) => (
        <div>
          <a
            onClick={() => {
              handleEdit(row)
            }}
          >
            编辑
          </a>
          <a
            style={{ color: "#f5222d", marginLeft: "20px" }}
            onClick={() => {
              showModal(row)
            }}
          >
            删除
          </a>
        </div>
      ),
    },
  ]
  const [data, setData] = useState<TableData[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const params: any = useParams()
  const [initialValues, setInitialValues] = useState<TableData>(defaultState)

  const getListData = () => {
    getLiveConfig({ "filter[_and][0][brodcast_assis]": params.id }).then((res: any) => {
      const transformedData = res.data.map((item: TableData) => ({
        ...item,
        config_type_cn: configTypeOptions[item.config_type],
        second_type_cn:
          item.config_type === "event" ? eventOptions[item.second_type] : keywordsOptions[item.second_type],
        reply_type_cn: replyTypeOptions[item.reply_type],
        date_created: format(new Date(item.date_created), "yyyy-MM-dd HH:mm:ss"),
      }))
      setData(transformedData)
    })
  }
  useEffect(() => {
    // 在这里使用远程 API 调用获取数据，然后更新 state 中的数据
    // 示例：fetchData().then((data) => setData(data));
    // 这里暂时用静态数据代替
    getListData()
  }, [])

  const [isdModalVisible, setIsdModalVisible] = useState(false)
  const [isModalBtnLoading, setIsModalBtnLoading] = useState(false)
  const [rowId, setrowId] = useState("")

  const handleDelete = () => {
    deleteLiveConfig(rowId, {}).then(() => {
      setIsdModalVisible(false)
      getListData()
    })
  }

  const handleCancel = () => {
    setIsdModalVisible(false)
  }

  const showModal = (row: any) => {
    setIsdModalVisible(true)
    setrowId(row.id)
  }

  const handleAddConfig = () => {
    setInitialValues({ ...defaultState })
    setIsModalVisible(true)
  }

  const modalFormRef = React.useRef<FormInstance | null>(null)

  const handleModalCancel = () => {
    setIsModalBtnLoading(false)
    setIsModalVisible(false)
    setInitialValues({ ...defaultState })
  }

  const handleEdit = (record: any) => {
    console.log(record)
    setInitialValues({ ...record })
    // if (record.config_type === "event") {
    //     setOptions2(eventOptions)
    //   } else if (record.config_type === "keywords") {
    //     setOptions2(keywordsOptions)
    //   }
    setIsModalBtnLoading(false)
    setIsModalVisible(true)
  }

  const handleModalOk = (formData: TableData) => {
    // 在这里处理添加配置的逻辑，例如保存到后端或更新 state
    console.log("表单数据", formData)
    setIsModalBtnLoading(true)
    if (initialValues.config_type) {
      patchLiveConfig(initialValues.id, { ...formData })
        .then(() => {
          handleModalCancel()
          message.success("修改直播间配置成功")
          getListData()
        })
        .catch(() => {
          setIsModalBtnLoading(false)
        })
    } else {
      postLiveConfig({ ...formData, brodcast_assis: params.id })
        .then(() => {
          handleModalCancel()
          message.success("添加直播间配置成功")
          getListData()
        })
        .catch(() => {
          setIsModalBtnLoading(false)
        })
    }
  }

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Button type="primary" onClick={handleAddConfig}>
          添加直播间配置
        </Button>
      </div>
      <Table dataSource={data} columns={columns} />
      <ConfigModal
        initialValues={initialValues}
        formRef={modalFormRef}
        modalLoading={isModalBtnLoading}
        visible={isModalVisible}
        onCancel={handleModalCancel}
        onOk={handleModalOk}
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

export default ParentComponent
