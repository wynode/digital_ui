import request from './request';

export enum ConversationEnum {
  TEXT = 1,
  PIC = 2,
}
export type ConversationType = ConversationEnum.TEXT | ConversationEnum.PIC;
export interface NewConversationRequest {
  name?: string;
  type: ConversationEnum;
}
export interface HistoryConversationRequest {
  conversationId: string;
  fatherId: string;
  size: number;
}

export const fetchNewConversation = (params: NewConversationRequest) => request.post('/client/conversation', params);

export const fetchGetConversationList = (params?: Object) => request.get('/client/conversation/list', { params });

export const fetchDeleteConversation = (id: string, type: number) => request.delete(`/client/conversation/${id}/${type}`);

export const fetchUpdateConversation = (params: Object) => request.put('/client/conversation', params);

export const fetchConversationHistoryList = (params: Object) => request.get('/client/message/list', { params });

export const fetchCreateMagic = (params: Object) => request.post('/client/message/submit', params);
