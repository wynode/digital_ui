import { defineConfig } from "vite"
import { terser } from "rollup-plugin-terser"
import path from "path"
// import { BACK_API } from '@/config'
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), terser()],
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://console-api.etsow.com/",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ""),
  //     },
  //   },
  // },
  optimizeDeps: {
    include: ["react", "react-dom", "antd", "lodash", "date-fns"],
  },

  build: {
    rollupOptions: {
      output: {
        // 会把自己的代码和剩下的依赖打包到一个index文件
        // manualChunks: {
        //   react: ["react"],
        //   "react-dom": ["react-dom"],
        //   antd: ["antd"],
        //   lodash: ["lodash"],
        //   "date-fns": ["date-fns"],
        // },
        // 分成了自己的和vendor依赖两个大包
        manualChunks(id: any): string {
          if (id.includes("node_modules")) {
            return "vendor"
          }
        },
        // manualChunks(id: any): string {
        //   // 指定需要拆分的模块
        //   if (id.includes("node_modules")) {
        //     const name = id.toString().split("node_modules/")[1]
        //     // return id.toString().split("node_modules/")[1].split("/")[0].toString()
        //     if (name.includes('antd')) {
        //       return 'antd'
        //     }
        //     if (name.includes('baseui')) {
        //       return 'baseui'
        //     }
        //     return 'vender'
        //   }
        //   return 'wynode'
        // },
        chunkFileNames: '[name].js'
        // chunkFileNames: (chunkInfo) => {
        //   console.log(chunkInfo)
        //   return '[name].js'
        // }
      },
    },
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_console: true,
        drop_debugger: true,
      },
    },
    //   关闭文件计算
    reportCompressedSize: false,
    //   关闭生成map文件 可以达到缩小打包体积
    sourcemap: false, // 这个生产环境一定要关闭，不然打包的产物会很大
  },
  server: {
    proxy: {
      "/apiss": {
        target: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apiss/, ""),
        configure: (proxy, options) => {
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            console.log("Sending Request to the Target:", req.method, options.target + proxyReq.path)
          })

          proxy.on("proxyRes", (proxyRes, req, res) => {
            console.log("Receiving Response from the Target:", req.method, options.target + req.url)
          })

          proxy.on("error", (err, req, res) => {
            console.log("Error Occurred:", err)
          })
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
})
