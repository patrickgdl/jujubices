import { useContext } from "react"
import { TemplateEditorContext } from "~/contexts/TemplateEditor"

const useTemplateEditorContext = () => {
  const { isEditing, setIsEditing, currentScene, setCurrentScene, currentTemplate, setCurrentTemplate } =
    useContext(TemplateEditorContext)

  return {
    isEditing,
    setIsEditing,
    currentScene,
    setCurrentScene,
    currentTemplate,
    setCurrentTemplate,
  }
}

export default useTemplateEditorContext
