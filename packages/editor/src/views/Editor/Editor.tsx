import Canvas from "./components/Canvas"
import EditorContainer from "./components/EditorContainer"
import Graphic from "./components/Graphic"
import Navbar from "./components/Navbar"
import Panels from "./components/Panels"
import Toolbox from "./components/Toolbox"
import Scene from "./components/Scene"

const Editor = () => {
  return (
    <EditorContainer>
      <Navbar />

      <div style={{ display: "flex", flex: 1 }}>
        <Panels />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
          <Toolbox />
          <Canvas />
          <Scene />
        </div>

        <Graphic />
      </div>
    </EditorContainer>
  )
}

export default Editor
