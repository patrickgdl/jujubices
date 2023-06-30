import { useParams } from "react-router-dom"
import Preview from "~/components/Preview/Preview"
import useImportTemplate from "~/hooks/useImportTemplate"
import useTemplateEditorContext from "~/hooks/useTemplateEditorContext"

import Canvas from "./components/Canvas"
import EditorContainer from "./components/EditorContainer"
import Graphic from "./components/Graphic"
import Navbar from "./components/Navbar"
import Panels from "./components/Panels"
import Toolbox from "./components/Toolbox"

const Editor = () => {
  const params = useParams()
  const { displayPreview, setDisplayPreview } = useTemplateEditorContext()

  useImportTemplate({ templateId: params.id })

  return (
    <>
      {displayPreview && <Preview isOpen={true} setIsOpen={setDisplayPreview} />}

      <EditorContainer>
        <Navbar />

        <div style={{ display: "flex", flex: 1 }}>
          <Panels />

          <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
            <Toolbox />
            <Canvas />
          </div>

          <Graphic />
        </div>
      </EditorContainer>
    </>
  )
}

export default Editor
