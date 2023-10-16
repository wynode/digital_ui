// import React, { useState } from "react"
import { postLogin, postRefresh, postRegister } from "~/apis/login"
import { useParseUserInfo } from "~/utils/utils"
import { TOKEN_NAME, REFRESH_TOKEN, USER_INFO } from "~/config"
import { message } from "antd"
import Background from "./background.png"
import Logo from "./Logo.png"
import { Button, Form, Input, Radio, Tabs } from "antd"
import React, { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

type LayoutType = Parameters<typeof Form>[0]["layout"]
const Dashboard = () => {
  const [email, setEmail] = useState("")
  const [password, setpassword] = useState("")
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const [form] = Form.useForm()
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal")

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout)
  }
  const navigate = useNavigate()

  const handleInputChange = (value: string, itype: string) => {
    if (itype === "email") {
      setEmail(value)
    } else if (itype === "password") {
      setpassword(value)
    }
  }

  const loginOrRegister = () => {
    const { email, password } = form.getFieldsValue()
    if (email && password && email.includes("@")) {
      setSubmitLoading(true)
      const payload = {
        email: email,
        password: password,
        mode: "json",
        otp: "string",
      }
      postLogin(payload).then((res: any) => {
        setSubmitLoading(false)
        if (String(res.data.code).includes('400')) {
          message.error(res.data.message || '登陆失败')
          return
        }
        localStorage.setItem(TOKEN_NAME, res.data.access_token)
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh_token)
        const userInfo: any = useParseUserInfo(res.data.access_token)
        localStorage.setItem(USER_INFO, JSON.stringify(userInfo))
        localStorage.setItem("userName", email)
        location.replace("/")
      }).catch((error) => {
        message.error('登陆失败，请检查密码')
        setSubmitLoading(false)
      })
      // .catch((error) => {
      //   if (
      //     error.data.errors &&
      //     (JSON.stringify(error.data.errors).includes("email") ||
      //       JSON.stringify(error.data.errors).includes("credential")) &&
      //     email.includes("@")
      //   ) {
      //     postRegister({ email: email, password: password }).then((data: any) => {
      //       if (data.status == 200 || data.status == 201) {
      //         message.success("已成功注册")
      //         postLogin(payload)
      //           .then((res: any) => {
      //             localStorage.setItem(TOKEN_NAME, res.data.access_token)
      //             localStorage.setItem(REFRESH_TOKEN, res.data.refresh_token)
      //             const userInfo: any = useParseUserInfo(res.data.access_token)
      //             localStorage.setItem(USER_INFO, JSON.stringify(userInfo))

      //             location.replace("/")
      //           })
      //           .catch((error) => {
      //             message.error(error.data.errors[0].message)
      //           })
      //       } else {
      //         message.error("自动注册失败,请检查邮箱格式或密码长度")
      //       }
      //     })
      //   }
      // })
      // fetch('/apis/items/avatar')
    } else {
      message.warning("请正确输入邮箱地址")
    }
  }

  function changeRoute() {
    navigate("/register")
  }
  return (
    <div className="my-login">
      <img className="my-login-background" src={Background} alt="" />

      <div className="my-login-container">
        <img className="my-login-logo" src={Logo} alt="" />

        <Tabs
          defaultActiveKey="1"
          centered
          items={[
            {
              label: "账号登录",
              key: "1",
              children: (
                <div className="my-login-form">
                  <Form layout="vertical" form={form}>
                    <Form.Item label="账号" name="email">
                      <Input placeholder="输入您的邮箱/手机号" />
                    </Form.Item>
                    <Form.Item label="密码" name="password">
                      <Input.Password placeholder="输入您的账户密码" />
                    </Form.Item>
                    <Form.Item style={{ marginBottom: "12px" }}>
                      <Button className="my-login-submit" loading={submitLoading} type="primary" onClick={loginOrRegister}>
                        登录
                      </Button>
                    </Form.Item>
                    <Form.Item>
                      <Button className="my-login-register" onClick={changeRoute}>
                        注册新账号
                      </Button>
                    </Form.Item>
                    <Form.Item>
                      <a href="" className="my-login-forget">
                        忘记密码？
                      </a>
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
              ),
            },
            {
              label: "验证码登录",
              key: "2",
              children: (
                <div className="my-login-form">
                  <Form layout="vertical" form={form}>
                    <Form.Item label="账号">
                      <Input placeholder="输入您的手机号" />
                    </Form.Item>
                    <Form.Item label="验证码">
                      <Input placeholder="输入您的验证码" />
                    </Form.Item>
                    <Form.Item style={{ marginBottom: "100px" }}>
                      <Button className="my-login-submit" type="primary">
                        登录
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
                    {/* <Form.Item>
                      <Button className="my-login-register">注册新账号</Button>
                    </Form.Item> */}
                    {/* <Form.Item>
                      <a href="" className="my-login-forget">
                        忘记密码？
                      </a>
                    </Form.Item> */}
                  </Form>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  )
}

export default Dashboard
