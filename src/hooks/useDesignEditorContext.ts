import { useContext } from "react"
import { DesignEditorContext } from "~/contexts/DesignEditor"

const useDesignEditorContext = () => {
  const {
    displayPreview,
    setDisplayPreview,
    currentScene,
    setCurrentScene,
    scenes,
    setScenes,
    currentDesign,
    setCurrentDesign,
  } = useContext(DesignEditorContext)

  return {
    displayPreview,
    setDisplayPreview,
    currentScene,
    setCurrentScene,
    scenes,
    setScenes,
    currentDesign,
    setCurrentDesign,
  }
}

export default useDesignEditorContext
