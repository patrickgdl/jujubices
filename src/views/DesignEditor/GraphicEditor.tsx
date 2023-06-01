import Canvas from "./components/Canvas"
import EditorContainer from "./components/EditorContainer"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Panels from "./components/Panels"
import Toolbox from "./components/Toolbox"

const GraphicEditor = () => {
  return (
    <EditorContainer>
      <Navbar />

      <div style={{ display: "flex", flex: 1 }}>
        <Panels />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
          <Toolbox />
          <Canvas />
          <Footer />
        </div>
      </div>
    </EditorContainer>
  )
}

export default GraphicEditor
