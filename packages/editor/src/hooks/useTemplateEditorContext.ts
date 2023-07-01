import { useContext } from "react"
import { TemplateEditorContext } from "~/contexts/TemplateEditor"

const useTemplateEditorContext = () => {
  const {
    displayPreview,
    setDisplayPreview,
    isEditing,
    setIsEditing,
    currentScene,
    setCurrentScene,
    currentTemplate,
    setCurrentTemplate,
  } = useContext(TemplateEditorContext)

  return {
    isEditing,
    setIsEditing,
    displayPreview,
    setDisplayPreview,
    currentScene,
    setCurrentScene,
    currentTemplate,
    setCurrentTemplate,
  }
}

export default useTemplateEditorContext
