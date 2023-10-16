// import React, { useState } from "react"
import { postLogin, postRefresh, postRegister } from "~/apis/login"
import { useParseUserInfo } from "~/utils/utils"
import { TOKEN_NAME, REFRESH_TOKEN, USER_INFO } from "~/config"
import { message } from "antd"
import Background from "./background.png"
import Logo from "./Logo.png"
import { Button, Form, Input, Radio, Tabs } from "antd"
import { ArrowLeftOutlined } from "@ant-design/icons"
import React, { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

type LayoutType = Parameters<typeof Form>[0]["layout"]
const Dashboard = () => {
  const [email, setEmail] = useState("")
  const [password, setpassword] = useState("")
  const navigate = useNavigate()

  const [form] = Form.useForm()
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal")

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout)
  }

  const handleInputChange = (value: string, itype: string) => {
    if (itype === "email") {
      setEmail(value)
    } else if (itype === "password") {
      setpassword(value)
    }
  }
  function changeRoute() {
    navigate("/login")
  }

  const loginOrRegister = () => {
    const { email, password } = form.getFieldsValue()
    if (email && password && email.includes("@")) {
      postRegister({ email: email, password: password })
        .then((res:any) => {
          if (String(res.code).includes('400')) {
            message.error(res.message || '登陆失败')
            return
          }
          message.success("已成功注册")
          changeRoute()
        })
        .catch(() => {
          message.error("注册失败,请检查邮箱格式或密码长度或联系管理员")
        })
    } else {
      message.warning("请正确输入邮箱地址")
    }
  }
  return (
    <div className="my-login">
      <img className="my-login-background" src={Background} alt="" />

      <div className="my-login-container">
        <div className="my-register-header">
          <ArrowLeftOutlined onClick={changeRoute} className="my-register-svg" />
          <span className="my-register-title">注册新账号</span>
        </div>

        <div className="my-login-form">
          <Form layout="vertical" form={form}>
            <Form.Item
              label="邮箱"
              name="email"
              hasFeedback
              rules={[
                {
                  type: "email",
                  message: "请输入正确的邮箱格式",
                },
              ]}
            >
              <Input placeholder="输入您的电子邮箱" />
            </Form.Item>
            <Form.Item label="手机号" name="phone">
              <Input placeholder="输入您的手机号码" />
            </Form.Item>
            <Form.Item label="密码" name="password">
              <Input.Password placeholder="创建您的账户密码" />
            </Form.Item>
            <Form.Item label="密码" name="password2">
              <Input.Password placeholder="再次创建您的账户密码" />
            </Form.Item>
            <Form.Item style={{ marginBottom: "46px" }}>
              <Button className="my-login-submit" type="primary" onClick={loginOrRegister}>
                注册
              </Button>
            </Form.Item>
            <Form.Item>
              <p className="my-login-term">
                登录即表示已阅读并同意
                <a href="https://www.etsow.com/index.php?c=category&id=17" target="_blank" className="">
                  用户服务协议
                </a>
                与
                <a href="https://www.etsow.com/index.php?c=category&id=18" target="_blank" className="">
                  用户隐私条款
                </a>
              </p>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
