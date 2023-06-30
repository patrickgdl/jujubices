import { useParams } from "react-router-dom"
import useTemplateEditorContext from "~/hooks/useTemplateEditorContext"

import Editor from "./components/Editor"
import Preview from "./components/Preview"
import useImportTemplate from "~/hooks/useImportTemplate"

const Builder = () => {
  const params = useParams()

  const _ = useImportTemplate({ templateId: params.id || "" })
  const { displayPreview, setDisplayPreview } = useTemplateEditorContext()

  return (
    <>
      {displayPreview && <Preview isOpen={true} setIsOpen={setDisplayPreview} />}
      <Editor />
    </>
  )
}

export default Builder
