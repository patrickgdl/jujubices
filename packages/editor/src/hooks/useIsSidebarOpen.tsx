import { useContext } from "react"
import { TemplateEditorContext } from "~/contexts/TemplateEditor"

const useIsSidebarOpen = () => {
  const { isSidebarOpen } = useContext(TemplateEditorContext)
  return isSidebarOpen
}

export default useIsSidebarOpen
