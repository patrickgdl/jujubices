import Editor from "./Editor"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import Preview from "./components/Preview"
import { useEditor } from "@layerhub-io/react"
import React from "react"
import { useSelector } from "react-redux"
import { selectTemplates } from "~/store/slices/templates/selectors"
import { useAppDispatch } from "~/store/store"
import { IDesign } from "~/types/design-editor"
import { IScene } from "@layerhub-io/types"
import { loadTemplateFonts } from "~/utils/fonts"
import { getTemplateById } from "~/store/slices/templates/actions"
import { useParams } from "react-router-dom"

const UserEditor = () => {
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
      const template = await loadGraphicTemplate(JSON.parse(data))

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
      handleImportTemplate(template)
    }
  }, [selectedTemplate])

  return (
    <>
      {displayPreview && <Preview isOpen={true} setIsOpen={setDisplayPreview} />}
      <Editor />
    </>
  )
}

export default UserEditor
