import React from "react"
import { useEditor, useObjects } from "@layerhub-io/react"
import AngleDoubleLeft from "~/components/icons/AngleDoubleLeft"
import Scrollable from "~/components/scrollable"
import { ILayer } from "@layerhub-io/types"
import Locked from "~/components/icons/Locked"
import Unlocked from "~/components/icons/Unlocked"
import Eye from "~/components/icons/Eye"
import EyeCrossed from "~/components/icons/EyeCrossed"
import Delete from "~/components/icons/Delete"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import { Button } from "~/ui/button"

const Layers = () => {
  const editor = useEditor()
  const objects = useObjects() as ILayer[]
  const [layerObjects, setLayerObjects] = React.useState<any[]>([])
  const setIsSidebarOpen = useSetIsSidebarOpen()

  React.useEffect(() => {
    if (objects) {
      setLayerObjects(objects)
    }
  }, [objects])

  React.useEffect(() => {
    let watcher = async () => {
      if (objects) {
        setLayerObjects([...objects])
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
  }, [editor, objects])

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
          justifyContent: "space-between",
          padding: "1.5rem",
        }}
      >
        <div>Layers</div>

        <div onClick={() => setIsSidebarOpen(false)} style={{ cursor: "pointer", display: "flex" }}>
          <AngleDoubleLeft size={18} />
        </div>
      </div>
      <Scrollable>
        <div className="px-6">
          {layerObjects.map((object) => (
            <div
              className="hover:bg-gray-100"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 90px",
                fontSize: "14px",
                alignItems: "center",
              }}
              key={object.id}
            >
              <div style={{ cursor: "pointer" }} onClick={() => editor.objects.select(object.id)}>
                {object.name}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                {object.locked ? (
                  <Button variant="ghost" size="icon" onClick={() => editor.objects.unlock(object.id)}>
                    <Locked size={24} />
                  </Button>
                ) : (
                  <Button variant="ghost" size="icon" onClick={() => editor.objects.lock(object.id)}>
                    <Unlocked size={24} />
                  </Button>
                )}

                {object.visible ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editor.objects.update({ visible: false }, object.id)}
                  >
                    <Eye size={24} />
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editor.objects.update({ visible: true }, object.id)}
                  >
                    <EyeCrossed size={24} />
                  </Button>
                )}
                <Button variant="ghost" size="icon" onClick={() => editor.objects.remove(object.id)}>
                  <Delete size={24} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Scrollable>
    </div>
  )
}

export default Layers
