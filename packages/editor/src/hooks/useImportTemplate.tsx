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
  templateId: string
}

const useImportTemplate = ({ templateId }: Props) => {
  const editor = useEditor()
  const { setScenes, setCurrentTemplate } = useTemplateEditorContext()

  const dispatch = useAppDispatch()
  const { selectedTemplate } = useSelector(selectTemplates)

  const loadTemplate = async (payload: Template) => {
    const scenes: any[] = []
    const { scenes: scns, ...rest } = payload

    for (const scn of scns) {
      const scene: IScene = {
        name: scn.name,
        frame: payload.frame,
        id: scn.id,
        layers: scn.layers,
        metadata: {},
      }

      await loadTemplateFonts(scene)

      const preview = (await editor.renderer.render(scene)) as string

      scenes.push({ ...scene, preview })
    }

    return { scenes, rest }
  }

  const handleImportTemplate = async (data: any) => {
    const { scenes, rest } = await loadTemplate(data)

    setScenes(scenes)
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
        // console.log((parsedTemplate as Template).scenes[0].layers.filter((l: any) => l.type === "StaticText"))
        handleImportTemplate(parsedTemplate)
      }
    }
  }, [selectedTemplate, editor])

  return { setScenes, setCurrentTemplate }
}

export default useImportTemplate
