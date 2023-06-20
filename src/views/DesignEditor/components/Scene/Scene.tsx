import { useEditor } from "@layerhub-io/react"
import { IScene } from "@layerhub-io/types"
import { nanoid } from "nanoid"
import React from "react"
import { getDefaultTemplate } from "~/constants/design-editor"
import { DesignEditorContext } from "~/contexts/DesignEditor"

const Scene = () => {
  const editor = useEditor()
  const { scenes, setScenes, setCurrentScene, currentScene, setCurrentDesign } = React.useContext(DesignEditorContext)

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

        setCurrentDesign({
          id: nanoid(),
          frame: defaultTemplate.frame,
          metadata: {},
          name: "Untitled Design",
          preview: { id: "", src: "" },
          scenes: [],
          type: "GRAPHIC",
          published: false,
        })

        editor.scene
          .importFromJSON(defaultTemplate)
          .then(() => {
            const initialDesign = editor.scene.exportToJSON() as any
            editor.renderer.render(initialDesign).then((data) => {
              setCurrentScene({ ...initialDesign, preview: data })
              setScenes([{ ...initialDesign, preview: data }])
            })
          })
          .catch(console.log)
      }
    }
  }, [editor, currentScene])

  const updateCurrentScene = React.useCallback(
    async (design: IScene) => {
      await editor?.scene.importFromJSON(design)
      await editor?.renderer.render(design)
    },
    [editor, currentScene]
  )

  return <></>
}

export default Scene
