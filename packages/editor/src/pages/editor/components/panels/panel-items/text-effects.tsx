import React from "react"
import Scrollable from "~/components/scrollable"
import { Cross2Icon } from "@radix-ui/react-icons"
import { throttle } from "lodash"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import { TEXT_EFFECTS } from "~/constants/template-editor"

const EFFECTS = {
  None: {
    fill: "#333333",
    strokeWidth: 0,
    shadow: {
      blur: 2,
      color: "#afafaf",
      offsetX: 10,
      offsetY: 10,
      enabled: false,
    },
  },
  Shadow: {
    fill: "#333333",
    shadow: {
      blur: 2,
      color: "#afafaf",
      offsetX: 10,
      offsetY: 10,
      enabled: true,
    },
  },
  Lift: {
    fill: "#333333",
    shadow: {
      blur: 25,
      color: "rgba(0,0,0,0.45)",
      offsetX: 0,
      offsetY: 0,
      enabled: true,
    },
  },
  Hollow: {
    stroke: "#000000",
    fill: null,
    strokeWidth: 2,
    shadow: {
      blur: 25,
      color: "rgba(0,0,0,0.45)",
      offsetX: 0,
      offsetY: 0,
      enabled: false,
    },
  },
  Splice: {
    stroke: "#000000",
    fill: null,
    strokeWidth: 2,
    shadow: {
      blur: 0,
      color: "#afafaf",
      offsetX: 10,
      offsetY: 10,
      enabled: true,
    },
  },
  Neon: {
    stroke: "#e84393",
    fill: "#fd79a8",
    strokeWidth: 2,
    shadow: {
      blur: 25,
      color: "#fd79a8",
      offsetX: 0,
      offsetY: 0,
      enabled: true,
    },
  },
}
const TextEffects = () => {
  const [color, setColor] = React.useState("#b32aa9")
  const activeObject = useActiveObject()
  const editor = useEditor()

  const updateObjectFill = throttle((color: string) => {
    if (activeObject) {
      editor.objects.update({ fill: color })
    }

    setColor(color)
  }, 100)

  const applyEffect = (name: string) => {
    if (editor) {
      //  @ts-ignore
      const effect = EFFECTS[name]
      if (effect) {
        editor.objects.update(effect)
      }
    }
  }
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center font-medium justify-between p-6">
        <div>Efeitos</div>

        <div className="cursor-pointer flex">
          <Cross2Icon />
        </div>
      </div>

      <Scrollable>
        <div className="px-6">
          <div className="grid grid-cols-[repeat(3,minmax(0,_80px))] gap-2">
            {TEXT_EFFECTS.map((effect, index) => {
              return (
                <div style={{ cursor: "pointer" }} key={index}>
                  <div
                    onClick={() => applyEffect(effect.name)}
                    style={{
                      border: "1px solid #afafaf",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "80px",
                    }}
                  >
                    <img style={{ width: "70px" }} src={effect.preview} />
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      padding: "0.5rem",
                      fontSize: "14px",
                    }}
                  >
                    {effect.name}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Scrollable>
    </div>
  )
}

export default TextEffects
