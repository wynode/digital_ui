import React, { useState, useRef } from "react"
import { PlayCircleFilled, PauseCircleOutlined, WomanOutlined } from "@ant-design/icons"
import { Modal } from "antd"

interface AudioPlayerProps {
  audioSrc: string
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setPlaying] = useState(false)
  const [isModalVisible, setModalVisible] = useState(false) // 添加 modal 的显示状态

  const togglePlay = () => {
    const audio = audioRef.current

    if (isPlaying) {
      audio?.pause()
    } else {
      audio?.play()
    }

    setPlaying(!isPlaying)
  }

  const handleVideoEnded = () => {
    setPlaying(false)
  }

  const handleOpenModal = () => {
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
    setPlaying(false) // 关闭 Modal 时停止播放音频
  }

  return (
    <div>
      <div onClick={handleOpenModal}>
        {isPlaying ? (
          <PauseCircleOutlined rev={undefined} style={{ fontSize: "20px", color: "#cbcbcb" }} />
        ) : (
          <PlayCircleFilled rev={undefined} style={{ fontSize: "20px", color: "#cbcbcb" }} />
        )}
      </div>
      <Modal
        title="录音播放"
        open={isModalVisible}
        destroyOnClose
        onCancel={handleCloseModal}
        footer={null} // 隐藏 Modal 底部按钮
      >
        <audio
          style={{ margin: 30, width: 400 }}
          ref={audioRef}
          src={audioSrc}
          onEnded={handleVideoEnded}
          autoPlay
          controls
        />
      </Modal>
    </div>
  )
}

export default AudioPlayer
