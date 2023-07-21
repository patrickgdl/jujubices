import { useEditor } from "@layerhub-io/react"
import { Block } from "baseui/block"
import { Button, SIZE } from "baseui/button"
import { nanoid } from "nanoid"
import AngleDoubleLeft from "~/components/icons/AngleDoubleLeft"
import Scrollable from "~/components/scrollable"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import { FontItem } from "~/types/common"
import { loadFonts } from "~/utils/fonts"

export default function () {
  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()

  const addObject = async () => {
    if (editor) {
      const font: FontItem = {
        name: "OpenSans-Regular",
        url: "https://fonts.gstatic.com/s/opensans/v27/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0C4nY1M2xLER.ttf",
      }
      await loadFonts([font])
      const options = {
        id: nanoid(),
        type: "StaticText",
        width: 420,
        text: "Adicione texto aqui",
        fontSize: 92,
        fontFamily: font.name,
        textAlign: "center",
        fontStyle: "normal",
        fontURL: font.url,
        fill: "#333333",
        metadata: {},
      }
      editor.objects.add(options)
    }
  }

  return (
    <Block $style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Block
        $style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
          justifyContent: "space-between",
          padding: "1.5rem",
        }}
      >
        <Block>Texto</Block>

        <Block onClick={() => setIsSidebarOpen(false)} $style={{ cursor: "pointer", display: "flex" }}>
          <AngleDoubleLeft size={18} />
        </Block>
      </Block>
      <Scrollable>
        <Block padding={"0 1.5rem"}>
          <Button
            onClick={addObject}
            size={SIZE.compact}
            overrides={{
              Root: {
                style: {
                  width: "100%",
                },
              },
            }}
          >
            Adicionar texto
          </Button>
        </Block>
      </Scrollable>
    </Block>
  )
}
