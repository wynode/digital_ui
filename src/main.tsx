import ReactDOM from "react-dom/client"
// import { RouterProvider } from 'react-router-dom'
import Provider from "./Provider"
import Router from "./Router"
import Container from "./Container"
import "./styles/styles.css"
import "./styles/base.css"
import "./styles/sass.scss"


ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider>
    <Container>
      <Router />
    </Container>
  </Provider>
)
