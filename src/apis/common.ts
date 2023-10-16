import request from './request';
export enum VIPSTATUS {
  INACTIVED = 1, // 未激活
  WORK = 2, // 正常
  EXPRIES = 3, // 到期
}
export interface UploadFileResponse {
  /** 文件名 */
  name: string;
  /** url */
  url: string;
  /** obs key */
  key: string;
  csd_suggestion: string;
}

/** 图片上传接口 */
export const fetchUploadFile = (params: FormData) =>
  request.post('/client/image-upload', params, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export enum RegenerationType {
  TEXT = 1,
  PIC = 2,
  /** 二次创作 */
  REGENERAT = 3,
}
export interface Message {
  session_id: string;
  id: string;
  user_id: string;
  conversation_id: string;
  role: 'user' | 'bot' | 'system';
  text: string;
  csd_suggestion: string;
  status: string;
  parent_message_id: string;
  images: MessageImage[];
  task_id: string;
  remarks: string; // 历史用户查询参数
  type: RegenerationType;
}
export interface MessageImage {
  name: string;
  url: string;
  key: string;
  csd_suggestion: string;
}
