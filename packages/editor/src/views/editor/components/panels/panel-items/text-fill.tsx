import React from "react"
import Scrollable from "~/components/scrollable"
import { HexColorPicker } from "react-colorful"
import { throttle } from "lodash"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import { Cross2Icon } from "@radix-ui/react-icons"

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

const TextFill = () => {
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
        <div>Cor do Texto</div>

        <div style={{ cursor: "pointer", display: "flex" }}>
          <Cross2Icon />
        </div>
      </div>
      <Scrollable>
        <div className="px-6">
          <HexColorPicker onChange={updateObjectFill} style={{ width: "100%" }} />
          <div>
            <div style={{ padding: "0.75rem 0", fontWeight: 500, fontSize: "14px" }}>Preset colors</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr", gap: "0.25rem" }}>
              {PRESET_COLORS.map((color, index) => (
                <div
                  key={index}
                  onClick={() => updateObjectFill(color)}
                  style={{
                    cursor: "pointer",
                    backgroundColor: color,
                    height: "38px",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </Scrollable>
    </div>
  )
}

export default TextFill
