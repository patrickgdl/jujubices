import { ILayer, LayerType } from "@layerhub-io/types"
import { Label } from "~/ui/label"
import { Textarea } from "~/ui/textarea"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import React from "react"

const RightBar = () => {
  const [isTextSelected, setIsTextSelected] = React.useState(false)

  const editor = useEditor()
  const activeObject = useActiveObject() as ILayer

  React.useEffect(() => {
    if (!activeObject) {
      setIsTextSelected(false)
      return
    }

    const selectionType = activeObject.type

    setIsTextSelected(selectionType === LayerType.STATIC_TEXT)
  }, [activeObject])

  React.useEffect(() => {
    let watcher = async () => {
      if (activeObject) {
        const selectionType = activeObject.type

        setIsTextSelected(selectionType === LayerType.STATIC_TEXT)
      }
    }

    if (editor) {
      editor.on("history:changed", watcher)
    }

    return () => {
      if (editor) {
        editor.off("history:changed", watcher)
      }
    }
  }, [editor, activeObject])

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const object = editor.canvas.canvas.getActiveObject()
    if (!object) return

    const value = e.target.value
    if (!value) return

    object.set({ text: value })
    editor.canvas.requestRenderAll()
  }

  return (
    <div className="bg-white px-4 py-8">
      {isTextSelected ? (
        <div className="grid w-full gap-1.5">
          <Label htmlFor="message">Texto</Label>
          <Textarea placeholder="Texto" id="message" onChange={handleTextArea} />
        </div>
      ) : (
        <h4 className="text-sm font-medium mb-6">Sem texto selecionado</h4>
      )}
    </div>
  )
}

export default RightBar
