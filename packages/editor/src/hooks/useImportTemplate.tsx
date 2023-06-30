import { useEditor } from "@layerhub-io/react"
import { IScene } from "@layerhub-io/types"
import React from "react"
import { useSelector } from "react-redux"
import { getTemplateById } from "~/store/slices/templates/actions"
import { selectTemplates } from "~/store/slices/templates/selectors"
import { useAppDispatch } from "~/store/store"
import { loadTemplateFonts } from "~/utils/fonts"

import useTemplateEditorContext from "./useTemplateEditorContext"
import { Template } from "~/types/templates"

type Props = {
  templateId: string | undefined
}

const useImportTemplate = ({ templateId }: Props) => {
  const editor = useEditor()
  const { setCurrentScene, setCurrentTemplate } = useTemplateEditorContext()

  const dispatch = useAppDispatch()
  const { selectedTemplate } = useSelector(selectTemplates)

  const loadTemplate = async (payload: Template) => {
    const { scene, ...rest } = payload

    await loadTemplateFonts(scene)

    return { scene, rest }
  }

  const handleImportTemplate = async (data: Template) => {
    const { scene, rest } = await loadTemplate(data)

    setCurrentScene(scene)
    // @ts-ignore
    setCurrentTemplate(rest)
  }

  React.useEffect(() => {
    if (templateId) {
      dispatch(getTemplateById(templateId))
    }
  }, [templateId])

  React.useEffect(() => {
    if (selectedTemplate) {
      const { template } = selectedTemplate
      const parsedTemplate = JSON.parse(template as string)

      if (editor) {
        // console.log((parsedTemplate as Template).scene.layers.filter((l: any) => l.type === "StaticText"))
        handleImportTemplate(parsedTemplate)
      }
    }
  }, [selectedTemplate, editor])
}

export default useImportTemplate
