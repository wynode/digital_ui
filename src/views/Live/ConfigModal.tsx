import React, { useState } from "react"
import { FormInstance } from "antd/lib/form"
import { Modal, Form, Select, Radio, Input, Button, message, Upload } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import type { UploadProps } from "antd"
import { postFile } from "~/apis/main"
import { NEW_BACK_API_ASSETS } from "~/config"

interface TableData {
  config_type: string
  second_type: string
  reply_type: string
  audio_file: string
  keywords: string
  date_created: string
  reply: string
}

interface ConfigModalProps {
  visible: boolean
  modalLoading: boolean
  initialValues: TableData
  onCancel: () => void
  onOk: (formData: any) => void
  formRef: React.RefObject<FormInstance | null>
}

const configTypeOptions = [
  { label: "事件", value: "event" },
  { label: "关键词", value: "keywords" },
]

const eventOptions: any = [
  { label: "打招呼", value: "say_hello" },
  { label: "用户进场", value: "welcome" },
  // { label: "用户离场", value: "say_bye" },
]

const keywordsOptions: any = [
  { label: "产品介绍", value: "production" },
  { label: "异议处理", value: "exception" },
  { label: "活跃气氛", value: "atmosphere" },
  { label: "其他", value: "other" },
]

const replyTypeOptions = [
  { label: "录音驱动", value: "audio" },
  { label: "文本驱动", value: "text" },
  { label: "文本+AI员工接管", value: "text_gpt" },
  { label: "AI员工接管", value: "gpt" },
]

const ConfigModal: React.FC<ConfigModalProps> = ({ visible, onCancel, onOk, modalLoading, formRef, initialValues }) => {
  const [options2, setOptions2] = useState([])
  const [value2, setValue2] = useState("")
  const [form] = Form.useForm()
  const [value1, setValue1] = useState()
  const [replyType, setReplyType] = useState("")
  const [fileList, setFileList] = React.useState<any>([])
  // const [loading, setLoading] = useState(false)

  const handleOk = () => {
    form.validateFields().then((values) => {
      const formData = {
        config_type: values.config_type || "",
        second_type: values.second_type || "",
        reply_type: values.reply_type || "",
        reply: values.reply || "",
        audio_file: values.audio_file || "",
        keywords: values.keywords || "",
      }
      onOk(formData)
      // form.resetFields()
    })
  }

  const onReplyTypeChange = (e: any) => {
    if (e.target.value === "gpt") {
      message.warning("您的套餐暂不支持")
      setReplyType("")
      form.setFieldValue("reply_type", "")
    } else if (e.target.value === "text_gpt") {
      message.warning("您的套餐暂不支持")
      setReplyType("")
      form.setFieldValue("reply_type", "")
    } else {
      setReplyType(e.target.value)
    }
  }

  // const handleInitType = (value: any) => {
  //   if (value === "event") {
  //     setOptions2(eventOptions)
  //   } else if (value === "keywords") {
  //     setOptions2(keywordsOptions)
  //   }
  // }

  React.useEffect(() => {
    console.log(112323)
    if (Object.keys(initialValues).length) {
      form.setFieldsValue(initialValues)
      if (initialValues.audio_file) {
        setFileList([
          {
            url: `${NEW_BACK_API_ASSETS}${initialValues.audio_file}`,
            uid: `${NEW_BACK_API_ASSETS}${initialValues.audio_file}`,
            name: `${NEW_BACK_API_ASSETS}${initialValues.audio_file}`,
          },
        ])
      } else {
        setFileList([])
      }
    } else {
      console.log(1111)
      form.resetFields()
      setFileList([])
    }
  }, [initialValues])

  const handleTypeChange = (value: any) => {
    if (value === "event") {
      // setOptions2(eventOptions)
      form.setFieldsValue({ second_type: "" })
    } else if (value === "keywords") {
      // setOptions2(keywordsOptions)
      form.setFieldsValue({ second_type: "" })
    }
  }

  const handleCancel = () => {
    onCancel()
    form.resetFields()
  }

  const props: UploadProps = {
    name: "file",
    // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    beforeUpload: (file: File) => {
      // handleUpload(file);
      return false // 阻止antd的默认上传行为
    },
    onChange: async (info: any) => {
      if (info.file) {
        const formData = new FormData()
        formData.append("file", info.file)
        const res = await postFile(formData)
        form.setFieldValue("audio_file", `${NEW_BACK_API_ASSETS}/${res.data.id}`)
      }
      setFileList(info.fileList)
      // console.log(info)
      // info.file.status = 'done'
      // if (info.file.status !== "uploading") {
      //   console.log(info.file, info.fileList)
      // }
      // if (info.file.status === "done") {
      //   message.success(`${info.file.name} file uploaded successfully`)
      // } else if (info.file.status === "error") {
      //   message.error(`${info.file.name} file upload failed.`)
      // }
    },
  }

  return (
    <Modal
      open={visible}
      title={initialValues.config_type ? "修改直播间配置" : "添加直播间配置"}
      onCancel={handleCancel}
      onOk={handleOk}
      width={640}
      footer={null}
    >
      <Form form={form} style={{ margin: "30px 20px" }}>
        <Form.Item name="config_type" label="配置类型" rules={[{ required: true }]} style={{ width: "360px" }}>
          <Select options={configTypeOptions} onChange={handleTypeChange}></Select>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.config_type !== currentValues.config_type}
        >
          {({ getFieldValue }) => (
            <Form.Item name="second_type" label="类型场景" rules={[{ required: true }]} style={{ width: "360px" }}>
              <Select
                options={
                  getFieldValue("config_type")
                    ? getFieldValue("config_type") === "keywords"
                      ? keywordsOptions
                      : eventOptions
                    : ""
                }
              ></Select>
            </Form.Item>
          )}
        </Form.Item>
        {/* <Form.Item name="second_type" label="类型场景" rules={[{ required: true }]} style={{ width: "360px" }}>
          <Select options={form.getFieldValue("config_type") === "keywords" ? keywordsOptions : eventOptions}></Select>
        </Form.Item> */}
        <Form.Item name="reply_type" label="类型" rules={[{ required: true }]}>
          <Radio.Group onChange={onReplyTypeChange} value={replyType}>
            <Radio value="audio">录音驱动</Radio>
            <Radio value="text">文本驱动</Radio>
            <Radio value="text_gpt">文本+AI润色</Radio>
            <Radio value="gpt">AI员工接管</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.config_type !== currentValues.config_type}
        >
          {({ getFieldValue }) =>
            getFieldValue("config_type") === "keywords" ? (
              <Form.Item label="关键词" name={"keywords"} rules={[{ required: true }]} style={{ paddingRight: "14px" }}>
                <Input style={{ marginLeft: "14px" }} />
              </Form.Item>
            ) : null
          }
        </Form.Item>
        {/* {form.getFieldValue("config_type") === "keywords" && (
          <Form.Item label="关键词" name={"keywords"} rules={[{ required: true }]} style={{ paddingRight: "14px" }}>
            <Input style={{ marginLeft: "14px" }} />
          </Form.Item>
        )} */}
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.reply_type !== currentValues.reply_type}
        >
          {({ getFieldValue }) =>
            getFieldValue("reply_type") === "audio" ? null : (
              <Form.Item label="回复内容" name={"reply"} rules={[{ required: true }]}>
                <Input.TextArea autoSize={{ minRows: 8, maxRows: 20 }} />
              </Form.Item>
            )
          }
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.reply_type !== currentValues.reply_type}
        >
          {({ getFieldValue }) =>
            getFieldValue("reply_type") === "audio" ? (
              <Form.Item
                label="录音文件上传"
                name={"audio_file"}
                rules={[{ required: true }]}
                style={{ paddingRight: "14px" }}
              >
                <Upload {...props} fileList={fileList} maxCount={1} accept={"audio/*"}>
                  <Button icon={<UploadOutlined />}>点击上传录音文件</Button>
                  <p style={{ fontSize: "14px", color: "#666" }}>只能上传audio/*文件</p>
                </Upload>
              </Form.Item>
            ) : null
          }
        </Form.Item>
        <Form.Item wrapperCol={{ span: 8, offset: 8 }} style={{ marginTop: "40px" }}>
          <Button onClick={handleCancel}>取消</Button>
          <Button
            style={{ marginLeft: 12 }}
            type="primary"
            loading={modalLoading}
            htmlType="submit"
            onClick={() => {
              handleOk()
            }}
          >
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ConfigModal
