import Editor from "./Editor"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import Preview from "./components/Preview"

const AdminEditor = () => {
  const { displayPreview, setDisplayPreview } = useDesignEditorContext()

  return (
    <>
      {displayPreview && <Preview isOpen={true} setIsOpen={setDisplayPreview} />}
      <Editor />
    </>
  )
}

export default AdminEditor