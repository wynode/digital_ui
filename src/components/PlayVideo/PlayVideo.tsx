import React, { useState, useRef, useEffect } from "react"
import videojs from "video.js"
import "video.js/dist/video-js.css"
import "./index.css"
import { BACK_API_ASSETS } from "~/config"

export default function VideoPlay(props: any) {
  const videoRef = useRef(null)
  const playerRef = useRef<any>(null)
  const [option, setOptopm] = useState({})
  const [videoUrl, setVideoUrl] = useState("")

  const onReadyPlay = (palyer: any) => {
    videoRef.current = palyer
    palyer.play()
  }

  const init = () => {
    let _option = {
      controls: true,
      autoplay: false, //加载完成是否自动播放
      loop: false, //视频播放结束后，是否循环播放
      notSupportedMessage: "此视频暂无法播放，请稍后再试",
      poster: "https://t7.baidu.com/it/u=1819248061,230866778&fm=193&f=GIF", //视频封面
      controlBar: {
        // timeDivider: true,//是否显示时间控制条，默认为true
        // remainingTimeDisplay: false,//是否显示剩余时间，默认为true
        // fullscreenToggle: true // 全屏按钮
        children: [
          //自定义
          { name: "playToggle" }, // 播放按钮
          {
            name: "volumePanel", // 音量控制
            inline: false, // 不使用水平方式
          },
          { name: "currentTimeDisplay" }, // 当前已播放时间
          { name: "durationDisplay" }, // 总时间
          { name: "progressControl" }, // 播放进度条
          {
            name: "pictureInPictureToggle", //支持画中画
          },
          {
            name: "FullscreenToggle", //支持全屏
          },
        ],
      },
    }
    setOptopm(_option)

    if (!playerRef.current) {
      const videoElement = videoRef.current
      if (!videoElement) return

      const player = (playerRef.current = videojs(videoElement, _option, () => {}))
      onReadyPlay(player)
    }
  }

  useEffect(() => {
    const { result } = props.videoData
    setVideoUrl(result)
    init()
  }, [])

  return (
    <div className="video_play">
      <video
        style={{
          width: 800,
          height: 450,
          borderRadius: "8px",
        }}
        src={`${BACK_API_ASSETS}${videoUrl}`}
        ref={videoRef}
        className="video-js vjs-big-play-centered"
      ></video>
    </div>
  )
}
