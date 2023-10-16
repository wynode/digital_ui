// import queren from "./queren.png"
import React, { useEffect, useRef, useState } from "react"
import loading from "~/components/Logo/loading.gif"
import MySide from "./MySide"
import { getVoice } from "~/apis/main"
import { Layout } from "antd"
import { format } from "date-fns"
import { BACK_API_ASSETS } from "~/config"
import { PlayCircleFilled, ManOutlined, WomanOutlined } from "@ant-design/icons"
import male from "./male.png"
import female from "./female.png"
import AudioPlayer from "./AudioPlayer"
// import { PlayCircleFilled } from ''

const { Content } = Layout

const Audio = () => {
  const [audioData, setAudioData] = useState([])

  useEffect(() => {
    getVoice({ limit: 100 }).then((res: any) => {
      // setAudioData(res.data)
      const newData = res.data.map((item: any, index: number) => {
        const previewUrl = `${BACK_API_ASSETS}${item.avatar}`
        if (item.id) {
          const img = new Image()
          img.src = previewUrl
          img.onload = () => {
            const updatedArray = [...res.data]
            updatedArray[index].previewUrl = previewUrl

            setAudioData(updatedArray)
          }
        }
        return {
          ...item,
          previewUrl: loading,
        }
      })

      setAudioData(newData)
    })
  }, [])

  function palyVideo(item: any) {
    console.log(item)
  }
  return (
    <Layout>
      <MySide></MySide>
      <Content className="my-audio-box">
        <div className="ab-title">AI语音</div>
        <div className="ab-content">
          {audioData.map((item: any) => (
            <div className="ab-item" key={item.id}>
              <img className="ab-item-img" src={item.previewUrl} alt="" />
              <div className="ab-item-center">
                <p className="ab-item-title">
                  {item.name}
                  {item.sex === "male" ? <img src={male} alt="" /> : <img src={female} alt="" />}
                </p>
                <p className="ab-item-time">
                  {item.language}&nbsp;{item.emotion}
                </p>
              </div>
              <div>
                {/* <PlayCircleFilled
                  onClick={() => palyVideo(item)}
                  style={{ fontSize: "20px", color: "#999999" }}
                  rev={undefined}
                /> */}
                <AudioPlayer audioSrc={`${BACK_API_ASSETS}${item.audition}`} />
              </div>
            </div>
          ))}
        </div>
      </Content>
    </Layout>
  )
}

export default Audio
