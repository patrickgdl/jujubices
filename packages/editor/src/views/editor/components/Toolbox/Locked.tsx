import { useEditor } from "@layerhub-io/react"
import UnlockedIcon from "~/components/icons/Unlocked"
import { Button } from "~/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/ui/tooltip"

const Locked = () => {
  const editor = useEditor()

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        padding: "0 12px",
        justifyContent: "flex-end",
      }}
    >
      <Tooltip>
        <TooltipTrigger>
          <Button
            onClick={() => {
              editor.objects.unlock()
            }}
            size="icon"
            variant="ghost"
          >
            <UnlockedIcon size={24} />
          </Button>
        </TooltipTrigger>

        <TooltipContent>Unlock</TooltipContent>
      </Tooltip>
    </div>
  )
}

export default Locked
