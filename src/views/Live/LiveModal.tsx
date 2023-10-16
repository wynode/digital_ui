import React, { useEffect, useState } from "react"
import { Modal, Form, Input, Select, Upload, Button } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import type { RcFile, UploadProps } from "antd/es/upload"
import type { UploadFile } from "antd/es/upload/interface"

type LiveStreamModalProps = {
  visible: boolean
  modalInitValue: any
  onCancel: () => void
  onSubmit: (form: any) => void
}

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 },
}

const LiveStreamModal: React.FC<LiveStreamModalProps> = ({ visible, onCancel, onSubmit, modalInitValue }) => {
  const [form] = Form.useForm()

  const [submittable, setSubmittable] = React.useState(false)

  // Watch all values
  const values = Form.useWatch([], form)

  React.useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true)
      },
      () => {
        setSubmittable(false)
      }
    )
  }, [values])

  useEffect(() => {
    console.log(modalInitValue)
    if (Object.keys(modalInitValue).length) {
      form.setFieldsValue(modalInitValue)
      setFileList([{ url: modalInitValue.preview_url, uid: "12", name: "12" }])
      // setPreviewImage(modalInitValue.preview_url)
    } else {
      form.resetFields()
      setFileList([])
    }
  }, [modalInitValue])
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const handlePreview = async (file: File) => {
    const preview = URL.createObjectURL(file)
    setPreviewImage(preview)
  }

  const handleRemove = () => {
    form.setFieldValue("preview_url", "")
  }

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => setFileList(newFileList)

  const handleCancelPreview = () => {
    setPreviewImage(null)
  }

  const handleFinish = (values: any) => {
    console.log(values)
    // 执行提交逻辑
  }

  return (
    <Modal
      title={modalInitValue.address ? "修改直播间" : "创建直播间"}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={740}
      className="live-modal"
    >
      <Form style={{ marginTop: "24px" }} form={form} onFinish={handleFinish} {...formItemLayout}>
        <Form.Item name="name" label="直播间标题" rules={[{ required: true, message: "请输入直播间标题" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="channel"
          label="直播渠道"
          initialValue="抖音"
          rules={[{ required: true, message: "请选择直播渠道" }]}
        >
          <Select>
            <Select.Option value="抖音">抖音</Select.Option>
          </Select>
        </Form.Item>
        {/* <Form.Item
          name="brodcast_type"
          label="直播间类型"
          rules={[{ required: true, message: "请选择直播间类型" }]}
        >
          <Select>
            <Select.Option value="assis">助播</Select.Option>
            <Select.Option value="host">直播</Select.Option>
          </Select>
        </Form.Item> */}
        <Form.Item
          name="address"
          label="直播间地址"
          rules={[
            { required: true, message: "请输入直播间地址" },
            { type: "url", message: "请输入正确的URL" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="preview_url" label="直播间预览图" rules={[{ required: true, message: "请上传直播间预览图" }]}>
          <Upload
            accept="image/*"
            beforeUpload={() => false}
            listType="picture-card"
            fileList={fileList}
            onChange={handleChange}
            onRemove={handleRemove}
            maxCount={1} // 限制只能上传一张图片
            style={{ width: "400px" }} // 修改上传输入框的大小为400px
          >
            {fileList.length >= 1 ? null : (
              <div>
                <UploadOutlined rev={undefined} />
                <div style={{ marginTop: 8 }}>上传</div>
              </div>
            )}
            {/* {previewImage ? (
              <img src={previewImage} alt="Preview" style={{ width: "100%" }} />
            ) : ( */}
            {/* )} */}
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 10, offset: 5 }}>
          <Button onClick={onCancel}>取消</Button>
          <Button
            style={{ marginLeft: 12 }}
            type="primary"
            htmlType="submit"
            disabled={!submittable}
            onClick={() => {
              onSubmit(form)
            }}
          >
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default LiveStreamModal
