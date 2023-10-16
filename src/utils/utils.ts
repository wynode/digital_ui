// import { ElMessage } from 'element-plus';
import jwtDecode from 'jwt-decode';
// import FingerprintJS from '@fingerprintjs/fingerprintjs';
// import { BROWSER_FINGERPRINT } from '@/config'

// const fpPromise = FingerprintJS.load();


export function useParseUserInfo(token: string) {
  try {
    if (token?.length && token.split('.')?.length === 3) {
      return jwtDecode(token);
    } else {
      throw new Error('token长度错误，请检查! ');
    }
  } catch (e) {
    // ElMessage(`${e}`);
  }
}

// export async function getBrowserFingerPrint() {
//   try {
//     let browserFingerPrint = localStorage.getItem(BROWSER_FINGERPRINT);
//     if (!browserFingerPrint) {
//       const fp = await fpPromise;
//       const result = await fp.get();
//       localStorage.setItem(BROWSER_FINGERPRINT, result.visitorId);
//       browserFingerPrint = result.visitorId;
//     }
//     return browserFingerPrint
//   } catch (e) {
//     ElMessage(`${e}`);
//     return ''
//   }
// }
