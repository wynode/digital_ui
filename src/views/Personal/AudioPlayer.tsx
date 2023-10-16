import React, { useState, useRef } from "react"
import { PlayCircleFilled, PauseCircleOutlined, WomanOutlined } from "@ant-design/icons"

interface AudioPlayerProps {
  audioSrc: string
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setPlaying] = useState(false)

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
    setPlaying(false);
  };


  return (
    <div>
      <audio ref={audioRef} src={audioSrc} onEnded={handleVideoEnded} />
      <div onClick={togglePlay}>
        {isPlaying ? (
          <PauseCircleOutlined style={{ fontSize: "20px", color: "#cbcbcb" }} />
        ) : (
          <PlayCircleFilled style={{ fontSize: "20px", color: "#cbcbcb" }} />
        )}
      </div>
    </div>
  )
}

export default AudioPlayer
