import Preview from "~/components/preview/preview"
import useImportOrCreateScene from "~/hooks/useImportOrCreateScene"
import useTemplateEditorContext from "~/hooks/useTemplateEditorContext"

import Canvas from "./components/canvas"
import Container from "./components/container"
import Graphic from "./components/graphic"
import Navbar from "./components/navbar"
import Panels from "./components/panels"
import Toolbox from "./components/Toolbox"

const Editor = () => {
  const { displayPreview, setDisplayPreview } = useTemplateEditorContext()

  useImportOrCreateScene()

  return (
    <>
      {displayPreview && <Preview isOpen={true} setIsOpen={setDisplayPreview} />}

      <Container>
        <Navbar />

        <div style={{ display: "flex", flex: 1 }}>
          <Panels />

          <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
            <Toolbox />
            <Canvas />
          </div>

          <Graphic />
        </div>
      </Container>
    </>
  )
}

export default Editor
