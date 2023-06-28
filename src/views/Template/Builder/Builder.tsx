import { useEditor } from "@layerhub-io/react"
import { IScene } from "@layerhub-io/types"
import React from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import { getTemplateById } from "~/store/slices/templates/actions"
import { selectTemplates } from "~/store/slices/templates/selectors"
import { useAppDispatch } from "~/store/store"
import { IDesign } from "~/types/design-editor"
import { Template } from "~/types/templates"
import { loadTemplateFonts } from "~/utils/fonts"

import Editor from "./components/Editor"
import Preview from "./components/Preview"

const Builder = () => {
  const params = useParams()

  const editor = useEditor()
  const { displayPreview, setDisplayPreview, setScenes, setCurrentDesign } = useDesignEditorContext()

  const dispatch = useAppDispatch()
  const { selectedTemplate } = useSelector(selectTemplates)

  const loadGraphicTemplate = async (payload: IDesign) => {
    const scenes = []
    const { scenes: scns, ...design } = payload

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

    return { scenes, design }
  }

  const handleImportTemplate = React.useCallback(
    async (data: any) => {
      const template = await loadGraphicTemplate(data)

      setScenes(template.scenes)
      //   @ts-ignore
      setCurrentDesign(template.design)
    },
    [editor]
  )

  React.useEffect(() => {
    const id = params.id
    if (id) {
      dispatch(getTemplateById(id))
    }
  }, [params.id])

  React.useEffect(() => {
    if (selectedTemplate) {
      const { template } = selectedTemplate
      const parsedTemplate = JSON.parse(template as string)
      console.log((parsedTemplate as Template).scenes[0].layers.filter((l: any) => l.type === "StaticText"))
      handleImportTemplate(parsedTemplate)
    }
  }, [selectedTemplate])

  return (
    <>
      {displayPreview && <Preview isOpen={true} setIsOpen={setDisplayPreview} />}
      <Editor />
    </>
  )
}

export default Builder
