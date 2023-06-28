import Canvas from "../Canvas"
import EditorContainer from "../EditorContainer"
import Graphic from "../Graphic"
import Navbar from "../Navbar"
import Panel from "../Panel"
import Scene from "../Scene"

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
