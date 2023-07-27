// @ts-nocheck
import React from "react"
import InformationCircleOutline from "~/components/icons/InformationCircleOutline"
import Underline from "~/components/icons/Underline"
import Spacing from "~/components/icons/Spacing"

import Shadow from "./common/Shadow"
import useAppContext from "~/hooks/useAppContext"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import { useSelector } from "react-redux"
import { selectFonts } from "~/store/slices/fonts/selectors"
import { getTextOptions } from "~/utils/object-options"
import { fontStyleLabels } from "~/constants/fonts"
import { loadFonts } from "~/utils/fonts"
import { TextOptions } from "~/types/editor"
import { defaultTextOptions } from "~/constants/contants"
import { Input } from "~/ui/input"
import { Button } from "~/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/ui/select"

const TextProperties = () => {
  const fonts = useSelector(selectFonts)
  const [state, setState] = React.useState<TextOptions>(defaultTextOptions)
  const { setActiveSubMenu } = useAppContext()
  const activeObject = useActiveObject() as any
  const editor = useEditor()

  React.useEffect(() => {
    if (activeObject) {
      const textOptions = getTextOptions(activeObject)
      const isGroup = textOptions.isGroup
      const active = textOptions.fontFamily.split("__")[1]
      const font = fonts.find((f) => f.family === textOptions.fontFamily.split("__")[0].split("_").join(" "))
      if (!font) {
        setState(defaultTextOptions)
        return
      }
      const isNotGradient = typeof activeObject.value?.fill === "string" || activeObject.value?.fill instanceof String
      const styles = Object.keys(font.files)
        .map((file: string) => ({
          value: file,
          label: fontStyleLabels[file].label,
          id: fontStyleLabels[file].id,
          url: font.files[file],
          family: font.family,
        }))
        .sort((a, b) => (a.id > b.id ? 1 : -1))

      setState({
        ...textOptions,
        font,
        styles,
        fontFamily: font.family,
        activeStyle: {
          label: fontStyleLabels[active].label,
          id: fontStyleLabels[active].id,
        },
        fill: isGroup ? "#000000" : isNotGradient ? textOptions.fill : "#000000",
      })
    } else {
      setState(defaultTextOptions)
    }
  }, [activeObject])

  const handleChange = async (key: string, value: any) => {
    if (key === "fontStyle") {
      const selected = value[0]
      const updatedFamily = `${selected.family.split(" ").join("_")}__${selected.value}`
      const font = {
        name: updatedFamily,
        url: selected.url,
      }
      await loadFonts([font])
      editor.objects.update({
        fontFamily: updatedFamily,
        metadata: {
          fontURL: font.url,
        },
      })
      setState({ ...state, activeStyle: selected })
    } else {
      editor.objects.update({
        [key]: value,
      })
      setState({ ...state, [key]: value })
    }
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
          justifyContent: "space-between",
          padding: "1.5rem",
        }}
      >
        <div>Text properties</div>
        <InformationCircleOutline size={24} />
      </div>
      <div style={{ display: "grid", gap: "0.5rem" }}>
        <div style={{ padding: "0 1.5rem" }}>
          <Input
            onFocus={() => setActiveSubMenu("FontSelector")}
            value={state.fontFamily}
            placeholder="Controlled Input"
          />
        </div>

        <div style={{ padding: "0 1.5rem", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "0.5rem" }}>
          <Input value={24} />

          <Select
            onValueChange={(params) => {
              handleChange("fontStyle", params)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecionar cor" />
            </SelectTrigger>

            <SelectContent>
              {state.styles.map((option) => (
                <SelectItem value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div style={{ padding: "0 1.5rem" }}>
        <Button size="sm" onClick={() => handleChange("underline", !activeObject.underline)} variant="ghost">
          <Spacing size={24} />
        </Button>
        <Button size="sm" onClick={() => handleChange("underline", !activeObject.underline)} variant="ghost">
          <Underline size={24} />
        </Button>
      </div>
      <div>
        <Shadow />
      </div>
    </div>
  )
}

export default TextProperties
