import useTemplateEditorContext from "~/hooks/useTemplateEditorContext"

import Canvas from "./components/canvas"
import Container from "./components/container"
import Navbar from "./components/navbar"
import Panel from "./components/panel"
import Preview from "~/components/preview/preview"
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
