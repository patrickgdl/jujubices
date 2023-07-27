import { useEditor } from "@layerhub-io/react"
import { Cross2Icon } from "@radix-ui/react-icons"
import { throttle } from "lodash"
import { HexColorPicker } from "react-colorful"
import Scrollable from "~/components/scrollable"

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

const CanvasFill = () => {
  const editor = useEditor()

  const updateCanvasBackground = throttle((color: string) => {
    editor.canvas.setBackgroundColor(color)
  }, 100)

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center font-medium justify-between p-6">
        <div>Cor de Background</div>

        <div className="cursor-pointer flex">
          <Cross2Icon />
        </div>
      </div>

      <Scrollable>
        <div className="px-6">
          <HexColorPicker onChange={updateCanvasBackground} style={{ width: "100%" }} />

          <div>
            <div className="py-3 font-medium text-sm">Cores pré-definidas</div>

            <div className="grid grid-cols-6 gap-1">
              {PRESET_COLORS.map((color, index) => (
                <div
                  className="cursor-pointer h-9"
                  onClick={() => updateCanvasBackground(color)}
                  style={{
                    backgroundColor: color,
                  }}
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
      </Scrollable>
    </div>
  )
}

export default CanvasFill
