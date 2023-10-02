import { useActiveObject, useEditor } from "@layerhub-io/react"
import React from "react"
import AlignBottom from "~/components/icons/AlignBottom"
import AlignCenter from "~/components/icons/AlignCenter"
import AlignLeft from "~/components/icons/AlignLeft"
import AlignMiddle from "~/components/icons/AlignMiddle"
import AlignRight from "~/components/icons/AlignRight"
import AlignTop from "~/components/icons/AlignTop"
import BringToFront from "~/components/icons/BringToFront"
import DeleteIcon from "~/components/icons/Delete"
import DuplicateIcon from "~/components/icons/Duplicate"
import LayersIcon from "~/components/icons/Layers"
import LockedIcon from "~/components/icons/Locked"
import SendToBack from "~/components/icons/SendToBack"
import UnlockedIcon from "~/components/icons/Unlocked"
import { Button } from "~/ui/button"
import { Checkbox } from "~/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/ui/tooltip"

import Opacity from "./Shared/Opacity"

const Common = () => {
  const [state, setState] = React.useState({ isGroup: false, isMultiple: false })
  const activeObject = useActiveObject() as any

  const editor = useEditor()

  React.useEffect(() => {
    if (activeObject) {
      setState({ isGroup: activeObject.type === "group", isMultiple: activeObject.type === "activeSelection" })
    }
  }, [activeObject])

  React.useEffect(() => {
    let watcher = async () => {
      if (activeObject) {
        // @ts-ignore
        setState({ isGroup: activeObject.type === "group", isMultiple: activeObject.type === "activeSelection" })
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
  }, [editor, activeObject])

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {state.isGroup ? (
        <Button
          onClick={() => {
            editor.objects.ungroup()
            setState({ ...state, isGroup: false })
          }}
          variant="ghost"
        >
          Ungroup
        </Button>
      ) : state.isMultiple ? (
        <Button
          onClick={() => {
            editor.objects.group()
            setState({ ...state, isGroup: true })
          }}
          variant="ghost"
        >
          Group
        </Button>
      ) : null}

      {(state.isGroup || !state.isMultiple) && <CommonLayers />}

      <CommonAlign />

      <Opacity />

      <LockUnlock />

      <Tooltip>
        <TooltipTrigger>
          <Button onClick={() => editor.objects.clone()} size="icon" variant="ghost">
            <DuplicateIcon size={22} />
          </Button>
        </TooltipTrigger>

        <TooltipContent>Duplicar</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button onClick={() => editor.objects.remove()} size="icon" variant="ghost">
            <DeleteIcon size={24} />
          </Button>
        </TooltipTrigger>

        <TooltipContent>Deletar</TooltipContent>
      </Tooltip>
    </div>
  )
}

const CommonLayers = () => {
  const editor = useEditor()
  const [checked, setChecked] = React.useState(true)
  const activeObject = useActiveObject()

  React.useEffect(() => {
    if (activeObject) {
      //  @ts-ignore
      setChecked(!!activeObject.clipPath)
    }
  }, [activeObject])
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost">
          <Tooltip>
            <TooltipTrigger>
              <LayersIcon size={19} />
            </TooltipTrigger>

            <TooltipContent>Layers/Camadas</TooltipContent>
          </Tooltip>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full">
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={() => editor.objects.bringToFront()} variant="ghost">
            <BringToFront size={24} />
            Trazer pra frente
          </Button>
          <Button onClick={() => editor.objects.sendToBack()} variant="ghost">
            <SendToBack size={24} />
            Jogar para trás
          </Button>
        </div>

        <div className="flex gap-2 items-center px-4 py-2 rounded-md">
          <Checkbox
            checked={checked}
            onCheckedChange={() => {
              editor.objects.update({ clipToFrame: !checked })
              setChecked(!checked)
            }}
          />
          <div className="text-sm font-medium">Clip to frame</div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

const CommonAlign = () => {
  const editor = useEditor()

  return (
    <Popover>
      <PopoverTrigger>
        <Button size="icon" variant="ghost">
          <Tooltip>
            <TooltipTrigger>
              <AlignCenter size={24} />
            </TooltipTrigger>

            <TooltipContent>Alinhar</TooltipContent>
          </Tooltip>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full">
        <div className="grid grid-cols-3 gap-2">
          <Button onClick={() => editor.objects.alignLeft()} variant="ghost" size="icon">
            <AlignLeft size={24} />
          </Button>
          <Button onClick={() => editor.objects.alignCenter()} variant="ghost" size="icon">
            <AlignCenter size={24} />
          </Button>
          <Button onClick={() => editor.objects.alignRight()} variant="ghost" size="icon">
            <AlignRight size={24} />
          </Button>
          <Button onClick={() => editor.objects.alignTop()} variant="ghost" size="icon">
            <AlignTop size={24} />
          </Button>
          <Button onClick={() => editor.objects.alignMiddle()} variant="ghost" size="icon">
            <AlignMiddle size={24} />
          </Button>
          <Button onClick={() => editor.objects.alignBottom()} variant="ghost" size="icon">
            <AlignBottom size={24} />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

const LockUnlock = () => {
  const [state, setState] = React.useState<{ locked: boolean }>({ locked: false })
  const editor = useEditor()
  const activeObject = useActiveObject()

  React.useEffect(() => {
    if (activeObject) {
      // @ts-ignore
      setState({ locked: !!activeObject.locked })
    }
  }, [activeObject])

  return state.locked ? (
    <Tooltip>
      <TooltipTrigger>
        <Button
          onClick={() => {
            editor.objects.unlock()
            setState({ locked: false })
          }}
          size="icon"
          variant="ghost"
        >
          <UnlockedIcon size={24} />
        </Button>
      </TooltipTrigger>

      <TooltipContent>Unlock</TooltipContent>
    </Tooltip>
  ) : (
    <Tooltip>
      <TooltipTrigger>
        <Button
          onClick={() => {
            editor.objects.lock()
            setState({ locked: true })
          }}
          size="icon"
          variant="ghost"
        >
          <LockedIcon size={24} />
        </Button>
      </TooltipTrigger>

      <TooltipContent>Lock</TooltipContent>
    </Tooltip>
  )
}

export default Common
