import useTemplateEditorContext from "~/hooks/useTemplateEditorContext"

import Canvas from "./components/Canvas"
import Container from "./components/Container"
import Navbar from "./components/Navbar"
import Panel from "./components/Panel"
import Preview from "~/components/Preview/Preview"
import useImportOrCreateScene from "~/hooks/useImportOrCreateScene"

const Builder = () => {
  const { displayPreview, setDisplayPreview } = useTemplateEditorContext()

  useImportOrCreateScene()

  return (
    <>
      {displayPreview && <Preview isOpen={true} setIsOpen={setDisplayPreview} />}

      <Container>
        <Navbar />

        <div style={{ display: "flex", flex: 1 }}>
          <Panel />

          <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
            <Canvas />
          </div>
        </div>
      </Container>
    </>
  )
}

export default Builder
