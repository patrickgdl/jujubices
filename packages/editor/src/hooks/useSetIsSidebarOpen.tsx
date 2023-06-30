import { useContext } from "react"
import { TemplateEditorContext } from "~/contexts/TemplateEditor"

const useSetIsSidebarOpen = () => {
  const { setIsSidebarOpen } = useContext(TemplateEditorContext)
  return setIsSidebarOpen
}

export default useSetIsSidebarOpen
