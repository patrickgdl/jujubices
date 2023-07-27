import { useEditor } from "@layerhub-io/react"
import React from "react"
import { useSelector } from "react-redux"
import AngleDoubleLeft from "~/components/icons/AngleDoubleLeft"
import Scrollable from "~/components/scrollable"
import useTemplateEditorContext from "~/hooks/useTemplateEditorContext"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import { selectTemplates } from "~/store/slices/templates/selectors"
import { loadTemplateFonts } from "~/utils/fonts"
import { Template } from "~/types/templates"

const Templates = () => {
  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const { templates } = useSelector(selectTemplates)
  const { setCurrentScene, setCurrentTemplate } = useTemplateEditorContext()

  const handleImportTemplate = React.useCallback(
    async (data: any) => {
      const template = JSON.parse(data) as Template
      const { scene } = template

      await loadTemplateFonts(scene)

      setCurrentScene(scene)
      setCurrentTemplate(template)
    },
    [editor]
  )

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
          justifyContent: "space-between",
          padding: "1.5rem",
        }}
      >
        <div>Templates</div>

        <div onClick={() => setIsSidebarOpen(false)} style={{ cursor: "pointer", display: "flex" }}>
          <AngleDoubleLeft size={18} />
        </div>
      </div>

      <Scrollable>
        <div className="px-6">
          <div style={{ display: "grid", gap: "8px", gridTemplateColumns: "1fr 1fr" }}>
            {templates.map(({ template }, index) => {
              const parsed = JSON.parse(template as string)
              const { preview } = parsed

              return (
                <React.Fragment key={index}>
                  {preview && <ImageItem onClick={() => handleImportTemplate(template)} preview={preview.src} />}
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </Scrollable>
    </div>
  )
}

const ImageItem = ({ preview, onClick }: { preview: any; onClick?: (option: any) => void }) => {
  return (
    <div
      onClick={onClick}
      className="relative h-20 bg-gray-100 cursor-pointer p-3 rounded-md overflow-hidden before:hover:opacity-100"
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100 h-full w-full" />
      <img src={preview} className="w-full h-full object-contain pointer-events-none align-middle" />
    </div>
  )
}

export default Templates
