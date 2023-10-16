//仓库文件
import React from "react";
import { makeAutoObservable } from "mobx";
import { Navigate } from "react-router-dom";
import Login from "../pages/Login/index.jsx";
const Home = React.lazy(() => import("../pages/Home/index.jsx"));
const Error = React.lazy(() => import("../pages/Error/index.jsx"));
import { getUserInfo } from "../utils/httpAllMethods/AuthHttp.jsx";
import Ljstore from "./LJstore/index.jsx";

// 加载中
import Loading from "@/components/Loading/index.jsx";

function toElement(str) {
  let arr = ["../pages/Home/", str, "/index.jsx"];
  let navList1 = arr.join(",").replace(/,/g, "");
  const MyElement = React.lazy(() => import(`${navList1}`));
  return (
    <React.Suspense fallback={<Loading />}>
      <MyElement />
    </React.Suspense>
  );
}

const defaultRouter = [
  {
    path: "/",
    element: <Navigate to={"/login"} />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element:<Home />,
    children: [],
  },
  {
    path: "*",
    element: <Error />,
  },
];

function createDoubler() {
  // 递归函数递归路由
  function createRouteMap(routes, parentRoute) {
    const routeMap = [];
    
    routeMap.push({
      index:'index',
      element:toElement(routes[0].element)
    })

    for (const route of routes) {
      const path = route.element == "" ? "" : toElement(route.element);
      const entry = Object.assign({}, route);
      entry.element = path;
      if (route.children) {
        entry.children = createRouteMap(route.children, entry);
      }
      routeMap.push(entry);
    }
    return routeMap;
  }

  let routeDefault = defaultRouter;
  let power = JSON.parse(sessionStorage.getItem("nav"));
  if (power) {
    const routeMap = createRouteMap(power);
    routeDefault[2].children = routeMap;
  }
  return makeAutoObservable({
    userInfo:JSON.parse(sessionStorage.getItem('userInfo')) || {},//用来存登陆者信息
    userPower: JSON.parse(sessionStorage.getItem("nav")) || [],
    userRouter: routeDefault, //用来存路由信息的
    Ljstore,
    //和登录相关的操作
    toLogin(res) {
      getUserInfo({ admin_id:res.data}).then((res)=>{
        this.userInfo = res.data[0]
        sessionStorage.setItem("userInfo", JSON.stringify(res.data[0]));
      })
      this.userPower = res.power;
      
      
      sessionStorage.setItem("nav", JSON.stringify(res.power));
      //开始渲染动态路由了
      const routeMap = createRouteMap(res.power);
      this.userRouter[2].children = routeMap;
    },
  });
}

let store = createDoubler();

export default store;
