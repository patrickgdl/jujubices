import Canvas from "./components/Canvas"
import EditorContainer from "./components/EditorContainer"
import Graphic from "./components/Graphic"
import Navbar from "./components/Navbar"
import Panel from "./components/Panel"
import Scene from "./components/Scene"

const Editor = () => {
  return (
    <EditorContainer>
      <Navbar />

      <div style={{ display: "flex", flex: 1 }}>
        <Panel />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
          <Canvas />
          <Scene />
        </div>

        <Graphic />
      </div>
    </EditorContainer>
  )
}

export default Editor
