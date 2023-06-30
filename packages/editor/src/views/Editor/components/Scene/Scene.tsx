import { useEditor } from "@layerhub-io/react"
import { IScene } from "@layerhub-io/types"
import { nanoid } from "nanoid"
import React from "react"
import { getDefaultTemplate } from "~/constants/template-editor"
import { TemplateEditorContext } from "~/contexts/TemplateEditor"

const Scene = () => {
  const editor = useEditor()
  const { scenes, setScenes, setCurrentScene, currentScene, setCurrentTemplate } =
    React.useContext(TemplateEditorContext)

  React.useEffect(() => {
    if (editor && scenes && currentScene) {
      const isCurrentSceneLoaded = scenes.find((s) => s.id === currentScene?.id)
      if (!isCurrentSceneLoaded) {
        setCurrentScene(scenes[0])
      }
    }
  }, [editor, scenes, currentScene])

  React.useEffect(() => {
    if (editor) {
      if (currentScene) {
        updateCurrentScene(currentScene)
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
          scenes: [],
          type: "GRAPHIC",
          published: false,
        })

        editor.scene
          .importFromJSON(defaultTemplate)
          .then(() => {
            const initialTemplate = editor.scene.exportToJSON() as any
            editor.renderer.render(initialTemplate).then((data) => {
              setCurrentScene({ ...initialTemplate, preview: data })
              setScenes([{ ...initialTemplate, preview: data }])
            })
          })
          .catch(console.log)
      }
    }
  }, [editor, currentScene])

  const updateCurrentScene = React.useCallback(
    async (scene: IScene) => {
      await editor?.scene.importFromJSON(scene)
      await editor?.renderer.render(scene)
    },
    [editor, currentScene]
  )

  return <></>
}

export default Scene
