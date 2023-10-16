// import path from "node:path/win32"
import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import lazyLoad from '../src/router/lazyLoad'
import { BrowserRouter, createBrowserRouter, Routes, Route, Navigate } from "react-router-dom"
// const DesignEditor = React.lazy(() => import('~/views/DesignEditor'));
import DesignEditor from "~/views/DesignEditor"
import Login from "~/views/Login"
import Register from "~/views/Login/register"
import Personal from "~/views/Personal"
import Video from "~/views/Personal/Video/Video"
import Live from "~/views/Live/Live"
import LiveConfig from "~/views/Live/ConfigureLiveDetails"
import ResourceSquare from "~/views/Personal/Else/ResourceSquare"
import Files from "~/views/Personal/Files"
import DigitalPeople from "~/views/Personal/Else/DigitalPeople"
import LiveRoadcast from "~/views/Personal/Video/LiveRoadcast/LiveRoadcast"
import CopyWrtie from "~/views/Personal/Video/LiveRoadcast/CopyWrtie/CopyWrtie"
import RecycleBin from "~/views/Personal/Video/RecycleBin/RecycleBin"
import Else from "~/views/Personal/Else"
import Combo from "~/views/Personal/Combo"
import Audio from "~/views/Personal/Audio"
import Vtuber from "~/views/Personal/Vtuber"
import Chat from "~/views/Personal/Chat"
import MobileDecide from "./MobileDecide"
import RecycleBinContentVideo from "~/components/RecycleBin/RecycleBinContent/RecycleBinContentVideo/RecycleBinContentVideo"


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route key={location.pathname} path="/login" element={<Login />} />
        <Route key={location.pathname} path="/register" element={<Register />} />
        <Route key={location.pathname} path="/live" element={<DesignEditor />} />
        <Route key={location.pathname} path="/live/:id" element={<DesignEditor />} />
        <Route key={location.pathname} path="/video/:id" element={<DesignEditor />} />
        <Route key={location.pathname} path="/video" element={<DesignEditor />} />
        {/* <Route path="/home" element={<DesignEditor />} /> */}
        <Route key={location.pathname} path="/video/list" element={<Video />} />
        <Route key={location.pathname} path="/personal" element={<Personal />} />
        <Route key={location.pathname} path="/" element={<MobileDecide />} />

        <Route key={location.pathname} path="/personal/video" element={<Video />} />
        <Route key={location.pathname} path="/combo" element={<Combo />} />
        <Route key={location.pathname} path="/personal/audio" element={<Audio />} />
        <Route key={location.pathname} path="/personal/vtuber" element={<Vtuber />} />
        <Route key={location.pathname} path="/personal/live" element={<Live />} />
        <Route key={location.pathname} path="/personal/live/:id" element={<LiveConfig />} />
        <Route key={location.pathname} path="/chat" element={<Chat />} />
        <Route path="/personal/video/recycleBin" element={<RecycleBin />}></Route>
        <Route path="/personal/video/liveroadcast" element={<LiveRoadcast />} />
        <Route path="/personal/video/liveroadcast/copywrite" element={<CopyWrtie />} />
        <Route path="/personal/else" element={<Else />} />
        <Route path="/personal/else/ResourceSquare" element={<ResourceSquare />} />
        <Route path="/personal/else/digitalpeople" element={<DigitalPeople />} />
        <Route path="/personal/files" element={<Files />} />
      </Routes>
    </BrowserRouter>
  )
}
// const routes: RouteObject[] = [
//   {
//     path: '/login',
//     element: lazyLoad(lazy(() => import("~/views/Login"))),
//   },
//   {
//     path: '/',
//     element: <Personal />,
//     // loader: authLoader,
//     children: [
//       {
//         index: true,
//         element: <Navigate to="personal/home" replace />,
//       },
//       {
//         path: '/personal/home',
//         loader: () => ({ isAuth: false, ac: 'ac' }),
//         element: <Home></Home>,
//       },
//     ],
//   },
// ]

// const router = createBrowserRouter(routes, {
//   basename: import.meta.env.VITE_BASE_URL,
// })

export default Router
