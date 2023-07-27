import React from "react"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import FlipHorizontal from "~/components/icons/FlipHorizontal"
import FlipVertical from "~/components/icons/FlipVertical"
import { Button } from "~/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover"

const Flip = () => {
  const editor = useEditor()
  const activeObject = useActiveObject() as any
  const [state, setState] = React.useState({ flipX: false, flipY: false })

  React.useEffect(() => {
    if (activeObject) {
      setState({
        flipX: activeObject.flipX,
        flipY: activeObject.flipY,
      })
    }
  }, [activeObject])

  const flipHorizontally = React.useCallback(() => {
    editor.objects.update({ flipX: !state.flipX })
    setState({ ...state, flipX: !state.flipX })
  }, [editor, state])

  const flipVertically = React.useCallback(() => {
    editor.objects.update({ flipY: !state.flipY })
    setState({ ...state, flipY: !state.flipY })
  }, [editor, state])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          <Tooltip>
            <TooltipTrigger>Flip</TooltipTrigger>

            <TooltipContent>Flip</TooltipContent>
          </Tooltip>
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <div className="w-[180px]">
          <Button className="justify-start" onClick={flipHorizontally} variant="ghost" size="full">
            <FlipHorizontal size={24} />
            Flip horizontal
          </Button>

          <Button className="justify-start" onClick={flipVertically} variant="ghost" size="full">
            <FlipVertical size={24} />
            Flip vertical
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default Flip
