import { useEditor, useZoomRatio } from "@layerhub-io/react"
import React from "react"
import Icons from "~/components/icons"
import { Button } from "~/ui/button"
import { Input } from "~/ui/input"
import { Slider } from "~/ui/slider"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/ui/tooltip"

interface Options {
  zoomRatio: number
  zoomRatioTemp: number
}

const Common = () => {
  const zoomMin = 10
  const zoomMax = 240

  const [options, setOptions] = React.useState<Options>({
    zoomRatio: 20,
    zoomRatioTemp: 20,
  })

  const editor = useEditor()
  const zoomRatio: number = useZoomRatio()

  React.useEffect(() => {
    setOptions({ ...options, zoomRatio: Math.round(zoomRatio * 100) })
  }, [zoomRatio])

  const handleChange = (type: string, value: number) => {
    if (editor) {
      if (type.includes("emp")) {
        setOptions({ ...options, zoomRatioTemp: value })
      }
    }
  }

  const applyZoomRatio = (type: string, e: any) => {
    const value = e.target.value
    if (editor) {
      if (value === "") {
        setOptions({ ...options, zoomRatio: options.zoomRatio, zoomRatioTemp: options.zoomRatio })
      } else {
        let parsedValue = parseFloat(value)

        if (parsedValue < 0) {
          editor.zoom.zoomToRatio(zoomMin / 100)
        } else if (parsedValue > zoomMax) {
          editor.zoom.zoomToRatio(zoomMax / 100)
        } else {
          editor.zoom.zoomToRatio(parsedValue / 100)
        }
      }
    }
  }

  return (
    <div className="h-full bg-white flex flex-col items-center justify-end">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
        <Button variant="ghost" size="icon" onClick={() => editor.zoom.zoomToFit()}>
          <Icons.Compress size={16} />
        </Button>
        <Button variant="ghost" size="icon">
          <Icons.Refresh size={16} />
        </Button>
        <Button variant="ghost" size="icon">
          <Icons.Undo size={22} />
        </Button>
        <Button variant="ghost" size="icon">
          <Icons.Redo size={22} />
        </Button>
        <Button variant="ghost" size="icon">
          <Icons.TimePast size={16} />
        </Button>
      </div>

      <div className="flex items-center justify-center w-64">
        <div>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="ghost" size="icon" onClick={() => editor.zoom.zoomOut()}>
                <Icons.RemoveCircleOutline size={24} />
              </Button>
            </TooltipTrigger>

            <TooltipContent>Zoom Out</TooltipContent>
          </Tooltip>
        </div>

        <Slider
          min={zoomMin}
          max={zoomMax}
          value={[options.zoomRatio]}
          onValueChange={(value) => applyZoomRatio("zoomRatio", { target: { value: value[0] } })}
        />

        <div>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="ghost" size="icon" onClick={() => editor.zoom.zoomIn()}>
                <Icons.AddCircleOutline size={24} />
              </Button>
            </TooltipTrigger>

            <TooltipContent>Zoom In</TooltipContent>
          </Tooltip>
        </div>

        <Input
          type="number"
          max={zoomMax}
          min={zoomMin}
          className="w-14"
          onChange={(e) => handleChange("zoomRatioTemp", parseFloat(e.target.value))}
          onKeyUp={(e) => applyZoomRatio("zoomRatio", e)}
          value={options.zoomRatioTemp}
        />
      </div>
    </div>
  )
}

export default Common
