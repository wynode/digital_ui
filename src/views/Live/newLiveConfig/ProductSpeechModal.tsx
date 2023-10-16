import React, { useState } from "react"
import { FormInstance } from "antd/lib/form"
import { Modal, Form, Radio, Input, Button, message, Upload, Tooltip } from "antd"
import { UploadOutlined, QuestionCircleOutlined } from "@ant-design/icons"
import type { UploadProps } from "antd"
import { postFile } from "~/apis/main"
import { BACK_API_ASSETS2 } from "~/config"
import { TableData, replyTypeMap } from "./liveConfig"

interface ConfigModalProps {
  open: boolean
  modalLoading: boolean
  initialData: TableData | null
  onCancel: () => void
  onOk: (formData: any) => void
  formRef?: React.RefObject<FormInstance | null>
}

const ConfigModal: React.FC<ConfigModalProps> = ({ open, onCancel, onOk, modalLoading, initialData }) => {
  const [form] = Form.useForm()
  const [replyType, setReplyType] = useState("")
  const [fileList, setFileList] = React.useState<any>([])

  const handleOk = () => {
    form.validateFields().then((values) => {
      onOk(values)
    })
  }

  const onReplyTypeChange = (e: any) => {
    if (e.target.value === "gpt" || e.target.value === "text_gpt") {
      message.warning("您的套餐暂不支持")
      form.setFieldValue("reply_type", replyType)
    } else {
      setReplyType(e.target.value)
    }
  }

  const handleCancel = () => {
    onCancel()
  }

  const uploadProps: UploadProps = {
    name: "file",
    beforeUpload: (file: File) => {
      return false
    },
    onChange: async (info: any) => {
      if (info.file) {
        const formData = new FormData()
        formData.append("file", info.file)
        const res = await postFile(formData)
        form.setFieldValue("audio_file", `${BACK_API_ASSETS2}/${res.data.id}`)
      }
      setFileList(info.fileList)
    },
  }

  React.useEffect(() => {
    setReplyType("")
    setFileList([])
  }, [open])

  React.useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData)
      if (initialData.audio_file) {
        const audioUrl = `${initialData.audio_file}`
        setFileList([
          {
            url: audioUrl,
            uid: audioUrl,
            name: audioUrl,
          },
        ])
      }
    }
  }, [initialData])

  return (
    <Modal
      open={open}
      destroyOnClose
      title={initialData ? "修改产品介绍话术" : "添加产品介绍话术"}
      onCancel={handleCancel}
      onOk={handleOk}
      width={640}
      footer={null}
    >
      <Form
        preserve={false}
        form={form}
        style={{ margin: "30px 20px" }}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item name="name" label="话术名称" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="reply_type" label="类型" rules={[{ required: true }]}>
          <Radio.Group onChange={onReplyTypeChange} value={replyType}>
            {Array.from(replyTypeMap).map(([key, label]) => (
              <>
                <Radio key={key} value={key}>
                  {label}
                </Radio>
                <Tooltip title={`${label}配置说明文本`} key={"4096ff"} placement="right">
                  <QuestionCircleOutlined
                    rev={undefined}
                    style={{ fontSize: "14px", marginLeft: "-12px", marginRight: 10, color: "#999", cursor: "pointer" }}
                  ></QuestionCircleOutlined>
                </Tooltip>
              </>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.reply_type !== currentValues.reply_type}
        >
          {({ getFieldValue }) =>
            getFieldValue("reply_type") === "text" || getFieldValue("reply_type") === "text_gpt" ? (
              <Form.Item label="直播话术" name={"content"} rules={[{ required: true }]}>
                <Input.TextArea
                  autoSize={{ minRows: 8, maxRows: 14 }}
                  placeholder="内容请尽量多一些，每个产品仅会随机获取一段用于介绍，时间在在3分钟左右"
                />
              </Form.Item>
            ) : null
          }
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.reply_type !== currentValues.reply_type}
        >
          {({ getFieldValue }) =>
            getFieldValue("reply_type") === "audio" ? (
              <Form.Item
                label="录音文件"
                name={"audio_file"}
                rules={[{ required: true }]}
                style={{ paddingRight: "14px" }}
              >
                <Upload {...uploadProps} fileList={fileList} maxCount={1} accept={"audio/*"}>
                  <Button icon={<UploadOutlined rev={undefined} />}>点击上传录音文件</Button>
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
