import React, { useState } from "react"
import { Modal, Form, Input, Button } from "antd"

interface KeywordModalProps {
  visible: boolean
  onCancel: () => void
  onOk: (keyword: string, reply: string) => void
}

const KeywordModal: React.FC<KeywordModalProps> = ({ visible, onCancel, onOk }) => {
  const [keyword, setKeyword] = useState("")
  const [reply, setReply] = useState("")

  const handleOk = () => {
    onOk(keyword, reply)
  }

  const handleCancel = () => {
    onCancel()
  }

  return (
    <Modal open={visible} title="添加关键词">
      <Form style={{ margin: "20px" }}>
        <Form.Item label="关键词">
          <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        </Form.Item>
        <Form.Item label="回复内容">
          <Input.TextArea value={reply} onChange={(e) => setReply(e.target.value)} />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 10, offset: 5 }}>
          <Button onClick={onCancel}>取消</Button>
          <Button
            style={{ marginLeft: 12 }}
            type="primary"
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

export default KeywordModal
