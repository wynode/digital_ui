import React from "react"
import { Modal, Form, Input, Button, message } from "antd"

interface AddBlacklistModalProps {
  visible: boolean
  onCancel: () => void
  onAddBlacklist: (username: string) => Promise<any>
}

const AddBlacklistModal: React.FC<AddBlacklistModalProps> = ({ visible, onCancel, onAddBlacklist }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = React.useState(false)

  const handleFinish = async (values: { username: string }): Promise<void> => {
    try {
      setLoading(true)
      await onAddBlacklist(values.username)
      message.success('添加黑名单成功')
      form.resetFields()
      onCancel()
    } catch (error) {
      message.error("添加黑名单失败")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title="添加黑名单"
      bodyStyle={{ padding: "30px 20px 10px" }}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={() => form.submit()}>
          保存
        </Button>,
      ]}
    >
      <Form form={form} onFinish={handleFinish}>
        <Form.Item name="username" label="黑名单用户名" rules={[{ required: true, message: "请输入黑名单用户名" }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddBlacklistModal
