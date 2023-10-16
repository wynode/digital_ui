import axios from "axios"
import { BACK_API, TOKEN_NAME, USER_INFO } from "../config"
import { message } from "antd"

const request = axios.create({
  baseURL: BACK_API,
  timeout: 3 * 60 * 1000,
})

request.interceptors.request.use((config) => {
  let utoken = localStorage.getItem(TOKEN_NAME)
  const { search } = location
  if (search) {
    const params = new URLSearchParams(search)
    const token = params.get("tk")
    if (token) {
      localStorage.setItem(TOKEN_NAME, token)
      // location.replace("/")
      utoken = token
    }
  }
  const jwtToken = `Bearer ${utoken}`
  if (config.url && !config.url.includes("login") && utoken) {
    Object.defineProperty(config.headers, "Authorization", {
      value: jwtToken,
      configurable: true,
      enumerable: true,
      writable: true,
    })
  }
  return config
})

request.interceptors.response.use(
  (response) => {
    if (response.data.code !== 200) {
      // message.error(response.data.msg)
      return response.data
    } else {
      return response.data
    }
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      if (error.response.config.url.includes("/auth/login")) {
        return Promise.reject(error.response)
      }
      console.log(222)
      message.info("未登录，请登录后执行操作")
      localStorage.setItem(TOKEN_NAME, "")
      localStorage.setItem(USER_INFO, "")
      setTimeout(() => {
        location.replace("/login")
      }, 1000)
    } else if (error.response && error.response.status === 403) {
      message.error("没有权限，请联系客服")
      // localStorage.setItem(TOKEN_NAME, "")
      // localStorage.setItem(USER_INFO, "")
      // setTimeout(() => {
      //   location.replace("/login")
      // }, 1000)
    } else if (error.response && error.response.status === 500) {
      message.error("服务器或网络错误")
    } else if (error.code === "ECONNABORTED") {
      message.error("网络连接超时")
    } else if (error.response && error.response.status === 400) {
      const msg =
        typeof error.response.data === "string"
          ? error.response.data
          : JSON.stringify(Object.values(error.response.data))
      message.error(msg)
    } else if (error.response && error.response.status === 413) {
      message.error("上传文件太大，无法接收")
    } else {
      message.error("请求出错，请联系管理员")
    }

    if (!localStorage.getItem(TOKEN_NAME)) {
      setTimeout(() => {
        location.replace("/login")
      }, 1000)
    }

    return Promise.reject(error.response)
  }
)

export default request
