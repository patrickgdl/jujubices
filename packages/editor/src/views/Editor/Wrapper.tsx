import { useParams } from "react-router-dom"
import useTemplateEditorContext from "~/hooks/useTemplateEditorContext"
import useImportTemplate from "~/hooks/useImportTemplate"

import Preview from "./components/Preview"
import Editor from "./Editor"

const Wrapper = () => {
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

export default Wrapper
