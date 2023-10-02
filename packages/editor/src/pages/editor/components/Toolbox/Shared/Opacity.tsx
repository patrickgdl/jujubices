import React from "react"
import { Slider } from "~/ui/slider"
import { ILayer } from "@layerhub-io/types"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import OpacityIcon from "~/components/icons/Opacity"
import { Input } from "~/ui/input"
import { Button } from "~/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/ui/tooltip"

const Opacity = () => {
  const editor = useEditor()
  const [state, setState] = React.useState<{
    opacity: number
    opacityTemp: number
  }>({ opacity: 0, opacityTemp: 0 })
  const activeObject = useActiveObject() as Required<ILayer>

  React.useEffect(() => {
    if (activeObject) {
      setState({
        opacity: activeObject.opacity * 100,
        opacityTemp: activeObject.opacity * 100,
      })
    }
  }, [activeObject])

  const handleChange = (type: string, value: number) => {
    if (editor) {
      if (type.includes("emp")) {
        setState({ ...state, opacityTemp: value })
      }
    }
  }
  const applyTextOpacity = (type: string, e: any) => {
    const value = e.target.value
    if (editor) {
      if (value === "") {
        setState({ ...state, opacity: state.opacity, opacityTemp: state.opacity })
      } else {
        let parsedValue = parseFloat(value)
        if (parsedValue >= 100) {
          parsedValue = 100
        }
        setState({ ...state, opacity: parsedValue, opacityTemp: parsedValue })
        editor.objects.update({ opacity: parsedValue / 100 })
      }
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Tooltip>
            <TooltipTrigger>
              <OpacityIcon size={24} />
            </TooltipTrigger>

            <TooltipContent>Opacidade</TooltipContent>
          </Tooltip>
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <div className="text-sm">Opacidade</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 50px", gap: "1rem" }}>
          <Slider
            min={0}
            max={100}
            value={[state.opacity]}
            onValueChange={(value) => applyTextOpacity("", { target: { value: value[0] } })}
          />

          <div className="flex items-center">
            <Input
              type="number"
              className="w-full h-5"
              value={state.opacityTemp}
              onBlur={(e) => applyTextOpacity("opacity", e)}
              onChange={(e) => handleChange("opacityTemp", parseFloat(e.target.value))}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default Opacity
