import React from "react"
import { HexColorPicker } from "react-colorful"
import Common from "./Common"
import { useActiveObject } from "@layerhub-io/react"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover"
import { groupBy } from "lodash"
import Flip from "./Shared/Flip"

const Vector = () => {
  const [state, setState] = React.useState<any>({ colors: [], colorMap: {} })
  const vectorPaths = React.useRef<any>({})
  const activeObject = useActiveObject() as any

  React.useEffect(() => {
    if (activeObject && activeObject.type === "StaticVector") {
      const objects = activeObject._objects[0]._objects
      const objectColors = groupBy(objects, "fill")
      vectorPaths.current = objectColors
      setState({ ...state, colors: Object.keys(objectColors), colorMap: activeObject.colorMap })
    }
  }, [activeObject])

  const changeBackgroundColor = (prev: string, next: string) => {
    const objectRef = activeObject
    objectRef.updateLayerColor(prev, next)
    setState({
      ...state,
      colorMap: {
        ...state.colorMap,
        [prev]: next,
      },
    })
  }

  return (
    <div className="flex flex-1 items-center px-3 justify-between">
      <div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            {Object.keys(state.colorMap).map((c, index) => {
              return (
                <Popover key={index}>
                  <PopoverTrigger>
                    <div
                      style={{
                        height: "24px",
                        width: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        backgroundColor: state.colorMap[c],
                        border: "1px solid #dedede",
                      }}
                    />
                  </PopoverTrigger>

                  <PopoverContent>
                    <div
                      style={{
                        padding: "1rem",
                        background: "#ffffff",
                        width: "200px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        textAlign: "center",
                      }}
                    >
                      <HexColorPicker
                        onChange={(color) => {
                          changeBackgroundColor(c, color)
                        }}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              )
            })}
          </div>
          <Flip />
        </div>
      </div>
      <Common />
    </div>
  )
}

export default Vector
