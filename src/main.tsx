import "./styles/styles.css"

import ReactDOM from "react-dom/client"

import Container from "./Container"
import Provider from "./Provider"
import Router from "./Router"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider>
    <Container>
      <Router />
    </Container>
  </Provider>
)
