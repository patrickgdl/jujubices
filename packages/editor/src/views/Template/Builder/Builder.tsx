import { useParams } from "react-router-dom"
import useTemplateEditorContext from "~/hooks/useTemplateEditorContext"

import useImportScene from "~/hooks/useImportScene"
import Canvas from "./components/Canvas"
import EditorContainer from "./components/EditorContainer"
import Navbar from "./components/Navbar"
import Panel from "./components/Panel"
import useImportTemplate from "~/hooks/useImportTemplate"
import Preview from "~/components/Preview/Preview"

const Builder = () => {
  useImportScene()
  const params = useParams()

  useImportTemplate({ templateId: params.id })
  const { displayPreview, setDisplayPreview } = useTemplateEditorContext()

  return (
    <>
      {displayPreview && <Preview isOpen={true} setIsOpen={setDisplayPreview} />}

      <EditorContainer>
        <Navbar />

        <div style={{ display: "flex", flex: 1 }}>
          <Panel />

          <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
            <Canvas />
          </div>
        </div>
      </EditorContainer>
    </>
  )
}

export default Builder
