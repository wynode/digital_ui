import React, { useEffect, useRef } from "react"
import ResizeObserver from "resize-observer-polyfill"
import useAppContext from "~/hooks/useAppContext"
// import { getPublicDesigns } from "./store/slices/designs/actions"
// import { getPublicComponents } from "./store/slices/components/actions"
// import { getFonts } from "./store/slices/fonts/actions"
// import { getPixabayResources } from "./store/slices/resources/actions"
// import { getUploads } from "./store/slices/uploads/actions"
import { useAppDispatch } from "./store/store"

import { TOKEN_NAME, REFRESH_TOKEN, USER_INFO } from "~/config"
import { postLogin, postRefresh, postRegister } from "~/apis/login"

const Container = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { isMobile, setIsMobile } = useAppContext()
  const dispatch = useAppDispatch()
  const updateMediaQuery = (value: number) => {
    if (!isMobile && value >= 800) {
      setIsMobile(false)
    } else if (!isMobile && value < 800) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }
  useEffect(() => {
    const containerElement = containerRef.current!
    const containerWidth = containerElement.clientWidth
    updateMediaQuery(containerWidth)
    const resizeObserver = new ResizeObserver((entries) => {
      const { width = containerWidth } = (entries[0] && entries[0].contentRect) || {}
      updateMediaQuery(width)
    })
    const isLogin = location.href.includes('register') || location.href.includes('login')
    if (localStorage.getItem(REFRESH_TOKEN) && localStorage.getItem(TOKEN_NAME) && !isLogin) {
      setInterval(() => {
        postRefresh({ refresh_token: localStorage.getItem(REFRESH_TOKEN) }).then((rres) => {
          localStorage.setItem(TOKEN_NAME, rres.data.access_token)
          localStorage.setItem(REFRESH_TOKEN, rres.data.refresh_token)
        })
      }, 500000)
    }

    resizeObserver.observe(containerElement)
    return () => {
      if (containerElement) {
        resizeObserver.unobserve(containerElement)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // dispatch(getFonts())
    // dispatch(getUploads())
    // dispatch(getPublicComponents())
    // dispatch(getPixabayResources())
    // dispatch(getPublicDesigns())
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        flex: 1,
        display: "flex",
        height: "100vh",
        // width: "100vw",
      }}
    >
      {children}
    </div>
  )
}

export default Container
