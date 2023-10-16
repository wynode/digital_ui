import request from './request';

export const postLogin = (payload: Object) => {
  return request.post('/auth/login', payload);
};

export const postRefresh = (payload: Object) => {
  return request.post('/auth/refresh', payload);
};

export const postRegister = (payload: Object) => {
  return request.post('/flows/trigger/f08c8662-20c1-449e-9abf-ba07c3574244', payload);
};
