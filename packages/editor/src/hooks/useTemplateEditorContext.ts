import { useContext } from "react"
import { TemplateEditorContext } from "~/contexts/TemplateEditor"

const useTemplateEditorContext = () => {
  const { displayPreview, setDisplayPreview, currentScene, setCurrentScene, currentTemplate, setCurrentTemplate } =
    useContext(TemplateEditorContext)

  return {
    displayPreview,
    setDisplayPreview,
    currentScene,
    setCurrentScene,
    currentTemplate,
    setCurrentTemplate,
  }
}

export default useTemplateEditorContext
