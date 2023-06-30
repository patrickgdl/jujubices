import { useEditor } from "@layerhub-io/react"
import { IScene } from "@layerhub-io/types"
import React from "react"

import useTemplateEditorContext from "./useTemplateEditorContext"

const useImportScene = () => {
  const editor = useEditor()
  const { currentScene } = useTemplateEditorContext()

  const importCurrentScene = React.useCallback(
    async (scene: IScene) => {
      await editor?.scene.importFromJSON(scene)
      await editor?.renderer.render(scene)
    },
    [editor]
  )

  React.useEffect(() => {
    if (editor && currentScene) {
      importCurrentScene(currentScene)
    }
  }, [editor, currentScene])
}

export default useImportScene
