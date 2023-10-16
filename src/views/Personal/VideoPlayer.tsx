import React, { useRef, useState } from "react"
import { PlayCircleFilled, PauseCircleOutlined, WomanOutlined } from "@ant-design/icons"

interface VideoPlayerProps {
  videoSrc: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setPlaying] = useState(false)
  const togglePlay = () => {
    const video = videoRef.current

    if (isPlaying) {
      video?.pause()
    } else {
      video?.play()
    }

    setPlaying(!isPlaying)
  }

  const handleVideoEnded = () => {
    setPlaying(false);
  };

  return (
    <div>
      <video ref={videoRef} src={videoSrc} onEnded={handleVideoEnded} />
      <div onClick={togglePlay} className="ab-play">
        {isPlaying ? (
          <PauseCircleOutlined style={{ fontSize: "44px", color: "#cbcbcb" }} />
        ) : (
          <PlayCircleFilled style={{ fontSize: "44px", color: "#cbcbcb" }} />
        )}
      </div>
    </div>
  )
}

export default VideoPlayer
