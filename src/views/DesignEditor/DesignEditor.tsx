import GraphicEditor from "./GraphicEditor"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import Preview from "./components/Preview"

const DesignEditor = () => {
  const { displayPreview, setDisplayPreview } = useDesignEditorContext()

  return (
    <>
      {displayPreview && <Preview isOpen={true} setIsOpen={setDisplayPreview} />}
      <GraphicEditor />
    </>
  )
}

export default DesignEditor
