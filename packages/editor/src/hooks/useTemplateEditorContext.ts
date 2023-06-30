import { useContext } from "react"
import { TemplateEditorContext } from "~/contexts/TemplateEditor"

const useTemplateEditorContext = () => {
  const {
    displayPreview,
    setDisplayPreview,
    currentScene,
    setCurrentScene,
    scenes,
    setScenes,
    currentTemplate,
    setCurrentTemplate,
  } = useContext(TemplateEditorContext)

  return {
    displayPreview,
    setDisplayPreview,
    currentScene,
    setCurrentScene,
    scenes,
    setScenes,
    currentTemplate,
    setCurrentTemplate,
  }
}

export default useTemplateEditorContext
