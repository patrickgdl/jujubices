import React from "react"
import Scrollable from "~/components/scrollable"
import { HexColorPicker } from "react-colorful"
import { Cross2Icon } from "@radix-ui/react-icons"
import { throttle } from "lodash"
import { useActiveObject, useEditor } from "@layerhub-io/react"

const PRESET_COLORS = [
  "#f44336",
  "#ff9800",
  "#ffee58",
  "#66bb6a",
  "#26a69a",
  "#03a9f4",
  "#3f51b5",
  "#673ab7",
  "#9c27b0",
  "#ec407a",
  "#8d6e63",
  "#d9d9d9",
]

const PathFill = () => {
  const [color, setColor] = React.useState("#b32aa9")
  const activeObject = useActiveObject()
  const editor = useEditor()

  const updateObjectFill = throttle((color: string) => {
    if (activeObject) {
      editor.objects.update({ fill: color })
    }

    setColor(color)
  }, 100)

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
        <div>Path Fill</div>

        <div style={{ cursor: "pointer", display: "flex" }}>
          <Cross2Icon />
        </div>
      </div>

      <Scrollable>
        <div className="px-6">
          <HexColorPicker onChange={updateObjectFill} style={{ width: "100%" }} />
          <div>
            <div style={{ padding: "0.75rem 0", fontWeight: 500, fontSize: "14px" }}>Preset colors</div>
            <div className="grid grid-cols-6 gap-1">
              {PRESET_COLORS.map((color, index) => (
                <div
                  key={index}
                  style={{
                    cursor: "pointer",
                    backgroundColor: color,
                    height: "38px",
                  }}
                  onClick={() => updateObjectFill(color)}
                />
              ))}
            </div>
          </div>
        </div>
      </Scrollable>
    </div>
  )
}

export default PathFill
