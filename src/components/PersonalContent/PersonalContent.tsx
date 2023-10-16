import React, { useEffect, useRef, useState } from "react"
import { getVideos } from "~/apis/main"
import loading from "~/components/Logo/loading.gif"
import { format } from "date-fns"
import { Divider, Space, Tag } from 'antd';
import { useNavigate } from "react-router-dom";
import { BACK_API_ASSETS } from "~/config";
import preview from "~/components/Logo/preview.png"
const loadingUrl = "/images/loading.gif"

const PersonalHeader: React.FC = () => {
  const [latelyData, setLatelyData] = useState([])
  
  const navigate = useNavigate()
  useEffect(() => {
    getVideos({ limit: 8 }).then((res: any) => {
      // setLatelyData(res.data)
      const newData = res.data.map((item: any, index: number) => {
        const previewUrl = item.cover ? `${BACK_API_ASSETS}${item.cover}?quality=20` : preview
        if (item.id) {
          const img = new Image()
          img.src = previewUrl
          img.onload = () => {
            setLatelyData((preData:any) => {
              const newArray:any = [...preData]
              newArray[index].previewUrl = previewUrl
              console.log(previewUrl)
              return newArray
            })
          }
        }
        return {
          ...item,
          previewUrl: loading,
        }
      })
      setLatelyData(newData)
    })
  }, [])

  function goVideo(item:any) {
    console.log(item)
    navigate(`/video/${item.id}`)
  }
  return (
    <div className="my-lately">
      {latelyData.length ? latelyData.map((item: any) => (
        <div className="my-lately-box" key={item.id}>
          <img className={`${item.previewUrl && item.previewUrl.includes('loading') ? 'example-list-loading-img' : 'example-list-img'}`} onClick={() => goVideo(item)} src={item.previewUrl} alt="" />

          <p className="my-lately-title">{item.video_data && item.video_data.name ? item.video_data.name : '未命名视频'}<Tag color="processing">草稿</Tag></p>
          <p className="my-lately-time">更新于 {format(new Date(item.date_created), "yyyy-MM-dd HH:mm:ss")}</p>
          <div></div>
        </div>
      )) : <div style={{ color: '#999', marginLeft: '40px'}}>暂无最近打开</div>}
    </div>
  )
}

export default PersonalHeader
