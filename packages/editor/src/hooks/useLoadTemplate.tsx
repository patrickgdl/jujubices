import { useEditor } from "@layerhub-io/react"
import React from "react"
import { loadTemplateFonts } from "~/utils/fonts"

import useTemplateEditorContext from "./useTemplateEditorContext"
import { Template } from "~/types/templates"
import useSelectedTemplate from "./useSelectedTemplate"

/**
 * This hook is used to load the fonts for the template and set the current scene and template.
 */
const useLoadTemplate = () => {
  const editor = useEditor()
  const { setCurrentScene, currentScene, setCurrentTemplate, currentTemplate } = useTemplateEditorContext()

  const { template } = useSelectedTemplate()

  const loadFontsAndSetTemplate = async (data: Template) => {
    const { scene, ...rest } = data

    await loadTemplateFonts(scene)

    setCurrentScene(scene)
    setCurrentTemplate({ ...rest, scene })
  }

  React.useEffect(() => {
    if (template) {
      if (editor) {
        // console.log(template.scene.layers.filter((l: any) => l.type === "StaticText"))
        loadFontsAndSetTemplate(template)
      }
    }
  }, [template, editor])

  return {
    currentScene,
    currentTemplate,
  }
}

export default useLoadTemplate
