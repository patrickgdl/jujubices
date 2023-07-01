import { useEditor } from "@layerhub-io/react"
import { IScene } from "@layerhub-io/types"
import { nanoid } from "nanoid"
import React from "react"
import { getDefaultTemplate } from "~/constants/template-editor"
import { TemplateEditorContext } from "~/contexts/TemplateEditor"

import useLoadTemplate from "./useLoadTemplate"

/**
 * This hook is used to import a scene from the current template or create a new scene if there is no current template.
 */
const useImportOrCreateScene = () => {
  const { currentScene } = useLoadTemplate()

  const editor = useEditor()
  const { setCurrentScene, setCurrentTemplate } = React.useContext(TemplateEditorContext)

  const renderCurrentScene = React.useCallback(
    async (scene: IScene) => {
      await editor?.scene.importFromJSON(scene)
      await editor?.renderer.render(scene)
    },
    [editor]
  )

  React.useEffect(() => {
    if (editor) {
      if (currentScene) {
        // every time the current scene changes, we need to re-render the scene
        renderCurrentScene(currentScene)
      } else {
        // if there is no current scene, we need to create a new scene and render it
        const defaultTemplate = getDefaultTemplate({
          width: 1080,
          height: 1920,
        })

        setCurrentTemplate({
          id: nanoid(),
          frame: defaultTemplate.frame,
          metadata: {},
          name: "Untitled Template",
          preview: { id: "", src: "" },
          scene: defaultTemplate,
          type: "GRAPHIC",
          published: false,
        })

        setCurrentScene({ ...defaultTemplate })

        renderCurrentScene(defaultTemplate)
      }
    }
  }, [editor, currentScene])
}

export default useImportOrCreateScene
