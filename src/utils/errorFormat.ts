// import isObject from 'lodash/isObject';
// import { ElMessage } from 'element-plus';

export function allErrors(error: any) {
  const errMark = error instanceof Error;
  if (!errMark && typeof error === 'object') {
    const message = Object.values(error).join('<br>');
    // ElMessage.error(message);
  } else {
    // ElMessage.error(error);
  }
}
