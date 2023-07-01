import Preview from "~/components/Preview/Preview"
import useImportOrCreateScene from "~/hooks/useImportOrCreateScene"
import useTemplateEditorContext from "~/hooks/useTemplateEditorContext"

import Canvas from "./components/Canvas"
import Container from "./components/Container"
import Graphic from "./components/Graphic"
import Navbar from "./components/Navbar"
import Panels from "./components/Panels"
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
