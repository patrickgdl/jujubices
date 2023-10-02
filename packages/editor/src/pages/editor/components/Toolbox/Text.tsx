import { useActiveObject, useEditor } from "@layerhub-io/react"
import Scrollbar from "@layerhub-io/react-custom-scrollbar"
import { IStaticText } from "@layerhub-io/types"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import React from "react"
import { useSelector } from "react-redux"
import Bold from "~/components/icons/Bold"
import Italic from "~/components/icons/Italic"
import LetterCase from "~/components/icons/LetterCase"
import Spacing from "~/components/icons/Spacing"
import TextAlignCenter from "~/components/icons/TextAlignCenter"
import TextAlignJustify from "~/components/icons/TextAlignJustify"
import TextAlignLeft from "~/components/icons/TextAlignLeft"
import TextAlignRight from "~/components/icons/TextAlignRight"
import TextColor from "~/components/icons/TextColor"
import Underline from "~/components/icons/Underline"
import { FONT_SIZES } from "~/constants/editor"
import useAppContext from "~/hooks/useAppContext"
import { selectAllFonts } from "~/store/slices/fonts/selectors"
import { Button } from "~/ui/button"
import { Input } from "~/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover"
import { Slider } from "~/ui/slider"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/ui/tooltip"
import { loadFonts } from "~/utils/fonts"

import { getTextProperties } from "../../utils/text"
import Common from "./Common"

interface TextState {
  color: string
  bold: boolean
  italic: boolean
  underline: boolean
  family: string
  styleOptions: StyleOptions
}

interface StyleOptions {
  hasItalic: boolean
  hasBold: boolean
  options: any[]
}

const initialOptions: TextState = {
  family: "CoreLang",
  bold: false,
  italic: false,
  underline: false,
  color: "#00000",
  styleOptions: {
    hasBold: true,
    hasItalic: true,
    options: [],
  },
}
export default function () {
  const [state, setState] = React.useState<TextState>(initialOptions)
  const activeObject = useActiveObject() as Required<IStaticText>
  const { setActiveSubMenu } = useAppContext()
  const editor = useEditor()
  const fonts = useSelector(selectAllFonts)

  React.useEffect(() => {
    if (activeObject && activeObject.type === "StaticText") {
      const textProperties = getTextProperties(activeObject, fonts)
      setState({ ...state, ...textProperties })
    }
  }, [activeObject])

  React.useEffect(() => {
    let watcher = async () => {
      if (activeObject && activeObject.type === "StaticText") {
        const textProperties = getTextProperties(activeObject, fonts)
        setState({ ...state, ...textProperties })
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

  const makeBold = React.useCallback(async () => {
    if (state.bold) {
      let desiredFont

      if (state.italic) {
        // look for regular italic
        desiredFont = state.styleOptions.options.find((option) => {
          const postScriptNames = option.post_script_name.split("-")
          return postScriptNames[postScriptNames.length - 1].match(/^Italic$/)
        })
      } else {
        // look for  regular
        desiredFont = state.styleOptions.options.find((option) => {
          const postScriptNames = option.post_script_name.split("-")
          return postScriptNames[postScriptNames.length - 1].match(/^Regular$/)
        })
      }

      const font = {
        name: desiredFont.post_script_name,
        url: desiredFont.url,
      }
      await loadFonts([font])

      editor.objects.update({
        fontFamily: desiredFont.post_script_name,
        fontURL: font.url,
      })
      setState({ ...state, bold: false })
    } else {
      let desiredFont
      if (state.italic) {
        // look for bold italic
        desiredFont = state.styleOptions.options.find((option) => {
          const postScriptNames = option.post_script_name.split("-")
          return postScriptNames[postScriptNames.length - 1].match(/^BoldItalic$/)
        })
      } else {
        // look for bold
        desiredFont = state.styleOptions.options.find((option) => {
          const postScriptNames = option.post_script_name.split("-")
          return postScriptNames[postScriptNames.length - 1].match(/^Bold$/)
        })
      }

      const font = {
        name: desiredFont.post_script_name,
        url: desiredFont.url,
      }
      await loadFonts([font])

      editor.objects.update({
        fontFamily: desiredFont.post_script_name,
        fontURL: font.url,
      })
      setState({ ...state, bold: true })
    }
  }, [editor, state])

  const makeItalic = React.useCallback(async () => {
    if (state.italic) {
      let desiredFont
      if (state.bold) {
        // Search bold regular
        desiredFont = state.styleOptions.options.find((option) => {
          const postScriptNames = option.post_script_name.split("-")
          return postScriptNames[postScriptNames.length - 1].match(/^Bold$/)
        })
      } else {
        // Search regular
        desiredFont = state.styleOptions.options.find((option) => {
          const postScriptNames = option.post_script_name.split("-")
          return postScriptNames[postScriptNames.length - 1].match(/^Regular$/)
        })
      }

      const font = {
        name: desiredFont.post_script_name,
        url: desiredFont.url,
      }
      await loadFonts([font])

      editor.objects.update({
        fontFamily: desiredFont.post_script_name,
        fontURL: font.url,
      })
      setState({ ...state, italic: false })
    } else {
      let desiredFont

      if (state.bold) {
        // search italic bold
        desiredFont = state.styleOptions.options.find((option) => {
          const postScriptNames = option.post_script_name.split("-")
          return postScriptNames[postScriptNames.length - 1].match(/^BoldItalic$/)
        })
      } else {
        // search regular italic
        desiredFont = state.styleOptions.options.find((option) => {
          const postScriptNames = option.post_script_name.split("-")
          return postScriptNames[postScriptNames.length - 1].match(/^Italic$/)
        })
      }

      const font = {
        name: desiredFont.post_script_name,
        url: desiredFont.url,
      }
      await loadFonts([font])

      editor.objects.update({
        fontFamily: desiredFont.post_script_name,
        fontURL: font.url,
      })
      setState({ ...state, italic: true })
    }
  }, [editor, state])

  const makeUnderline = React.useCallback(() => {
    editor.objects.update({
      underline: !state.underline,
    })
    setState({ ...state, underline: !state.underline })
  }, [editor, state])

  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "0 12px", justifyContent: "space-between" }}>
      <div className="flex gap-2 items-center">
        <div
          onClick={() => setActiveSubMenu("FontSelector")}
          className="flex items-center gap-2 text-sm h-9 rounded border border-gray-300 px-2 py-1 cursor-pointer"
        >
          <div>{state.family}</div>

          <div className="flex">
            <ChevronDownIcon />
          </div>
        </div>

        <TextFontSize />

        <div className="flex items-center">
          <Tooltip>
            <TooltipTrigger>
              <Button onClick={() => setActiveSubMenu("TextFill")} size="icon" variant="ghost">
                <TextColor color={state.color} size={22} />
              </Button>
            </TooltipTrigger>

            <TooltipContent>Cor do texto</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Button
                style={{ ...(!state.bold && { color: "rgb(169,169,169)" }) }}
                disabled={!state.styleOptions.hasBold}
                onClick={() => makeBold()}
                size="icon"
                variant="ghost"
              >
                <Bold size={20} />
              </Button>
            </TooltipTrigger>

            <TooltipContent>Negrito</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Button
                style={{ ...(!state.italic && { color: "rgb(169,169,169)" }) }}
                disabled={!state.styleOptions.hasItalic}
                onClick={() => makeItalic()}
                size="icon"
                variant="ghost"
              >
                <Italic size={20} />
              </Button>
            </TooltipTrigger>

            <TooltipContent>Italico</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Button
                style={{ ...(!state.underline && { color: "rgb(169,169,169)" }) }}
                onClick={makeUnderline}
                size="icon"
                variant="ghost"
              >
                <Underline size={24} />
              </Button>
            </TooltipTrigger>

            <TooltipContent>Underline</TooltipContent>
          </Tooltip>

          <TextLetterCase />

          <div className="w-[1px] h-6 bg-gray-200 mx-1" />

          <TextAlign />

          <div className="w-[1px] h-6 bg-gray-200 mx-1" />

          <TextSpacing />

          <div className="w-[1px] h-6 bg-gray-200 mx-1" />

          <Button onClick={() => setActiveSubMenu("TextEffects")} variant="ghost">
            Efeitos
          </Button>

          <div className="w-[1px] h-6 bg-gray-200 mx-1" />
        </div>
      </div>

      <Common />
    </div>
  )
}

function TextFontSize() {
  const editor = useEditor()
  const activeObject = useActiveObject()
  const [value, setValue] = React.useState(12)

  React.useEffect(() => {
    // @ts-ignore
    if (activeObject && activeObject.type === "StaticText") {
      // @ts-ignore
      setValue(activeObject.fontSize)
    }
  }, [activeObject])
  const onChange = (size: number) => {
    editor.objects.update({ fontSize: size })
    setValue(size)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="w-18">
          <Input value={value} onChange={(e: any) => onChange(e.target.value)} type="number" />
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-full">
        <Scrollbar style={{ height: "320px", width: "90px" }}>
          <div className="bg-white py-3">
            {FONT_SIZES.map((size, index) => (
              <div
                onClick={() => {
                  onChange(size)
                  close()
                }}
                className="hover:bg-gray-200 cursor-pointer text-sm flex items-center h-8 px-5"
                key={index}
              >
                {size}
              </div>
            ))}
          </div>
        </Scrollbar>
      </PopoverContent>
    </Popover>
  )
}

function TextLetterCase() {
  const [state, setState] = React.useState<{ upper: boolean }>({ upper: false })
  const editor = useEditor()

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          onClick={() => {
            if (!state.upper) {
              setState({ upper: true })
              editor.objects.toUppercase()
            } else {
              setState({ upper: false })
              editor.objects.toLowerCase()
            }
          }}
          variant="ghost"
          size="icon"
        >
          <LetterCase size={24} />
        </Button>
      </TooltipTrigger>

      <TooltipContent>Máiusculas e Minúsculas</TooltipContent>
    </Tooltip>
  )
}

function TextSpacing() {
  const editor = useEditor()
  const activeObject = useActiveObject()
  const [state, setState] = React.useState<{
    charSpacing: number
    lineHeight: number
  }>({ charSpacing: 0, lineHeight: 0 })

  React.useEffect(() => {
    if (activeObject) {
      // @ts-ignore
      const { charSpacing, lineHeight } = activeObject
      setState({ ...state, charSpacing: charSpacing / 10, lineHeight: lineHeight * 10 })
    }
  }, [activeObject])

  const handleChange = (type: string, value: number[]) => {
    if (editor) {
      if (type === "charSpacing") {
        setState({ ...state, [type]: value[0] })

        // @ts-ignore
        editor.objects.update({
          [type]: value[0] * 10,
        })
      } else {
        setState({ ...state, [type]: value[0] })
        // @ts-ignore

        editor.objects.update({
          [type]: value[0] / 10,
        })
      }
    }
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Tooltip>
            <TooltipTrigger>
              <Spacing size={24} />
            </TooltipTrigger>

            <TooltipContent>Espaçamento</TooltipContent>
          </Tooltip>
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <div className="p-3 w-48 bg-white grid gap-2">
          <div>
            <div className="flex items-center justify-between">
              <div className="text-sm">Altura da Linha</div>
              <div className="w-12">
                <Input className="h-5" onChange={() => {}} value={Math.round(state.lineHeight)} />
              </div>
            </div>

            <div>
              <Slider
                min={0}
                max={100}
                value={[state.lineHeight]}
                onValueChange={(value) => handleChange("lineHeight", value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <div className="text-sm">Espaço de Carácteres</div>
              <div className="w-12">
                <Input className="h-5" onChange={() => {}} value={Math.round(state.charSpacing)} />
              </div>
            </div>

            <div>
              <Slider
                min={-20}
                max={100}
                value={[state.charSpacing]}
                onValueChange={(value) => handleChange("charSpacing", value)}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

const TEXT_ALIGNS = ["left", "center", "right", "justify"]

function TextAlign() {
  const editor = useEditor()
  const activeObject = useActiveObject()
  const [state, setState] = React.useState<{ align: string }>({ align: "left" })

  React.useEffect(() => {
    if (activeObject) {
      // @ts-ignore
      setState({ align: activeObject.textAlign })
    }
  }, [activeObject])
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost">
          <Tooltip>
            <TooltipTrigger>
              <TextAlignCenter size={24} />
            </TooltipTrigger>

            <TooltipContent>Alinhar</TooltipContent>
          </Tooltip>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full">
        <div className="flex gap-1">
          <Button
            // isSelected={state.align === TEXT_ALIGNS[0]}
            onClick={() => {
              // @ts-ignore
              editor.objects.update({ textAlign: TEXT_ALIGNS[0] })
              setState({ align: TEXT_ALIGNS[0] })
            }}
            size="icon"
            variant="outline"
          >
            <TextAlignLeft size={24} />
          </Button>

          <Button
            // isSelected={state.align === TEXT_ALIGNS[1]}
            onClick={() => {
              // @ts-ignore
              editor.objects.update({ textAlign: TEXT_ALIGNS[1] })
              setState({ align: TEXT_ALIGNS[1] })
            }}
            size="icon"
            variant="outline"
          >
            <TextAlignCenter size={24} />
          </Button>
          <Button
            // isSelected={state.align === TEXT_ALIGNS[2]}
            onClick={() => {
              // @ts-ignore
              editor.objects.update({ textAlign: TEXT_ALIGNS[2] })
              setState({ align: TEXT_ALIGNS[2] })
            }}
            size="icon"
            variant="outline"
          >
            <TextAlignRight size={24} />
          </Button>
          <Button
            // isSelected={state.align === TEXT_ALIGNS[3]}
            onClick={() => {
              // @ts-ignore
              editor.objects.update({ textAlign: TEXT_ALIGNS[3] })
              setState({ align: TEXT_ALIGNS[3] })
            }}
            size="icon"
            variant="outline"
          >
            <TextAlignJustify size={24} />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
