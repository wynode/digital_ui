import { FormInstance } from "antd/lib/form"

export interface TableData {
  id: string
  status: "on" | "off" // 状态
  user_created: string
  date_created: string
  name: string // 名称
  content?: string // 内容
  phase?: "production" | "prologue" | "ending" // 阶段
  second_type?: string
  reply_type: "text" | "audio" | "text_gpt" // 类型
  audio_file?: string | null // 录音文件，如果有录音文件则为字符串，否则为 null
  product_info?: string // 对应的产品，只有产品介绍里面才有
}

export interface ConfigModalProps {
  visible: boolean
  modalLoading: boolean
  initialData: TableData | null
  onCancel: () => void
  onOk: (formData: any) => void
  formRef?: React.RefObject<FormInstance | null>
}

export const configTypeMap: Map<string, string> = new Map([
  ["event", "事件"],
  ["keywords", "关键词"],
])

export const eventMap: Map<string, string> = new Map([
  ["welcome", "欢迎新访客"],
  ["guide", "主动引导客户"],
  // ["say_bye", "用户离场"],
])

export const secondTypeMap: Map<string, string> = new Map([
  ["production", "产品相关问题"],
  ["after_sales", "售后服务问题"],
  ["orders", "订单和支付问题"],
  ["logistics", "发货和物流问题"],
  ["promo", "优惠和促销"],
  ["other", "其他问题"],
])

export const replyTypeMap: Map<string, string> = new Map([
  ["audio", "录音"],
  ["text", "文本"],
  ["text_gpt", "千人千面"],
  ["gpt", "AI主播"],
])

export interface RouteParams {
  id: string
}
