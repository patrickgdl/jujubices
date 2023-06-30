import { useEditor } from "@layerhub-io/react"
import { IScene } from "@layerhub-io/types"
import { nanoid } from "nanoid"
import React from "react"
import { getDefaultTemplate } from "~/constants/template-editor"
import { TemplateEditorContext } from "~/contexts/TemplateEditor"

const useImportOrAddScene = () => {
  const editor = useEditor()
  const { setCurrentScene, currentScene, setCurrentTemplate } = React.useContext(TemplateEditorContext)

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
      }
    }
  }, [editor, currentScene])
}

export default useImportOrAddScene
