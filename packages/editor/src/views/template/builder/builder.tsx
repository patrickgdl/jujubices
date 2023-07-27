import Canvas from "./components/canvas"
import Container from "./components/container"
import Navbar from "./components/navbar"
import Panel from "./components/panel"
import useImportOrCreateScene from "~/hooks/useImportOrCreateScene"

const Builder = () => {
  useImportOrCreateScene()

  return (
    <Container>
      <Navbar />

      <div className="flex flex-1">
        <Panel />

        <div className="flex flex-1 flex-col relative">
          <Canvas />
        </div>
      </div>
    </Container>
  )
}

export default Builder
