import React, { useEffect, useRef, useState } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "./styles.css"
import { FreeMode, Pagination, Navigation } from "swiper"
import { getVideos } from "~/apis/main"
import { useNavigate } from "react-router-dom"
import preview from "~/components/Logo/preview.png"

import loading from "~/components/Logo/loading.gif"
import { BACK_API_ASSETS } from "~/config"

const PersonalHeader: React.FC = () => {
  const [videoData, setVideoData] = useState([])
  const [showNumber, setShowNumber] = useState(6)

  useEffect(() => {
    if (document.body.clientWidth > 1800) {
      setShowNumber(8)
    }
    getVideos({ limit: 20, "filter[is_template][_eq]":true }).then((res: any) => {
      const newData = res.data.map((item: any, index: number) => {
        const previewUrl = item.cover ? `${BACK_API_ASSETS}${item.cover}?quality=10` : preview
        if (item.id) {
          const img = new Image()
          img.src = previewUrl
          img.onload = () => {
            setVideoData((preData:any) => {
              const newArray:any = [...preData]
              newArray[index].previewUrl = previewUrl
              return newArray
            })
          }
        }
        return {
          ...item,
          previewUrl: loading,
        }
      })

      setVideoData(newData)
    })
  }, [])
  const navigate = useNavigate()
  function goVideo(item: any) {
    console.log(item)
    navigate(`/video/${item.id}`)
  }
  return (
    <>
      <Swiper
        slidesPerView={showNumber}
        spaceBetween={30}
        freeMode={true}
        navigation={true}
        // pagination={{
        //   clickable: true,
        // }}
        modules={[FreeMode, Navigation, Pagination]}
        className="mySwiper"
      >
        {videoData.length ? videoData.map((item: any) => (
          <SwiperSlide key={item.id}>
            <div className="my-swiper-item">
              <img src={item.previewUrl} onClick={() => goVideo(item)}></img>
              <p>{item.video_data && item.video_data.name}</p>
            </div>
          </SwiperSlide>
        )) : <div style={{ color: '#999', marginLeft: '40px'}}>暂无视频模版</div>}
      </Swiper>
    </>
  )
}

export default PersonalHeader
