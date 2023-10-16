import React, { useState } from "react"
import { Modal, Form, Radio, Input, Button } from "antd"
import { TableData } from "./liveConfig"

interface ConfigModalProps {
  open: boolean
  modalLoading: boolean
  initialData: TableData | null
  onCancel: () => void
  onOk: (formData: any) => void
}

const ConfigModal: React.FC<ConfigModalProps> = ({ open, onCancel, onOk, modalLoading, initialData }) => {
  const [form] = Form.useForm()
  const [status, setStatus] = useState("on")

  const handleOk = () => {
    form.validateFields().then((values) => {
      onOk(values)
    })
  }

  const onStatusChange = (e: any) => {
    setStatus(e.target.value)
  }

  React.useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData)
    }
  }, [initialData])

  const handleCancel = () => {
    onCancel()
    form.resetFields()
  }

  return (
    <Modal
      open={open}
      destroyOnClose
      title={initialData ? "修改产品" : "添加产品"}
      onCancel={handleCancel}
      onOk={handleOk}
      width={640}
      footer={null}
    >
      <Form form={form} preserve={false} style={{ margin: "30px 20px" }}>
        <Form.Item name="name" label="产品名称" rules={[{ required: true }]} style={{ width: "360px" }}>
          <Input />
        </Form.Item>
        <Form.Item name="status" label="状态" rules={[{ required: true }]} initialValue="on">
          <Radio.Group onChange={onStatusChange} value={status} defaultValue="on" style={{ marginLeft: "26px" }}>
            <Radio value="on">启用</Radio>
            <Radio value="off">禁用</Radio>
          </Radio.Group>
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
