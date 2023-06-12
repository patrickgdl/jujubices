import { useEditor } from "@layerhub-io/react"
import { IScene } from "@layerhub-io/types"
import { DarkTheme, styled, ThemeProvider } from "baseui"
import { Block } from "baseui/block"
import { Button, KIND } from "baseui/button"
import { Theme } from "baseui/theme"
import React from "react"
import Logo from "~/components/Icons/Logo"
import Play from "~/components/Icons/Play"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import { IDesign } from "~/interfaces/DesignEditor"
import { loadTemplateFonts } from "~/utils/fonts"

import DesignTitle from "./DesignTitle"

const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  height: "64px",
  background: $theme.colors.black,
  display: "grid",
  padding: "0 1.25rem",
  gridTemplateColumns: "380px 1fr 380px",
  alignItems: "center",
}))

const Navbar = () => {
  const inputFileRef = React.useRef<HTMLInputElement>(null)

  const editor = useEditor()!
  const { setDisplayPreview, setScenes, setCurrentDesign, currentDesign, scenes } = useDesignEditorContext()

  const parseGraphicJSON = () => {
    console.log({ currentDesign })
    const currentScene = editor.scene.exportToJSON()

    if (currentDesign) {
      const graphicTemplate: IDesign = {
        id: currentDesign.id,
        type: "GRAPHIC",
        name: currentDesign.name,
        frame: currentDesign.frame,
        scenes: [currentScene],
        metadata: {},
        previews: [],
        published: false,
      }
      makeDownload(graphicTemplate)
    } else {
      console.log("NO CURRENT DESIGN")
    }
  }

  const makeDownload = (data: Object) => {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`
    const a = document.createElement("a")
    a.href = dataStr
    a.download = "template.json"
    a.click()
  }

  const makeDownloadTemplate = async () => {
    if (editor) {
      return parseGraphicJSON()
    }
  }

  const loadGraphicTemplate = async (payload: IDesign) => {
    const scenes = []
    const { scenes: scns, ...design } = payload

    for (const scn of scns) {
      const scene: IScene = {
        name: scn.name,
        frame: payload.frame,
        id: scn.id,
        layers: scn.layers,
        metadata: {},
      }

      await loadTemplateFonts(scene)

      const preview = (await editor.renderer.render(scene)) as string

      scenes.push({ ...scene, preview })
    }

    return { scenes, design }
  }

  const handleImportTemplate = React.useCallback(
    async (data: any) => {
      let template
      template = await loadGraphicTemplate(data)

      console.log({ template })
      console.log({ scenes })

      setScenes(template.scenes)
      //   @ts-ignore
      setCurrentDesign(template.design)
    },
    [editor]
  )

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click()
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (res) => {
        const result = res.target!.result as string
        const design = JSON.parse(result)
        handleImportTemplate(design)
      }
      reader.onerror = (err) => {
        console.log(err)
      }

      reader.readAsText(file)
    }
  }

  return (
    // @ts-ignore
    <ThemeProvider theme={DarkTheme}>
      <Container>
        <div style={{ color: "#ffffff" }}>
          <Logo size={36} />
        </div>

        <DesignTitle />

        <Block $style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
          <input
            multiple={false}
            onChange={handleFileInput}
            type="file"
            id="file"
            ref={inputFileRef}
            style={{ display: "none" }}
          />

          <Button
            size="compact"
            onClick={handleInputFileRefClick}
            kind={KIND.tertiary}
            overrides={{
              StartEnhancer: {
                style: {
                  marginRight: "4px",
                },
              },
            }}
          >
            Importar
          </Button>

          <Button
            size="compact"
            onClick={makeDownloadTemplate}
            kind={KIND.tertiary}
            overrides={{
              StartEnhancer: {
                style: {
                  marginRight: "4px",
                },
              },
            }}
          >
            Exportar
          </Button>

          <Button
            size="compact"
            onClick={() => setDisplayPreview(true)}
            kind={KIND.tertiary}
            overrides={{
              StartEnhancer: {
                style: {
                  marginRight: "4px",
                },
              },
            }}
          >
            <Play size={24} />
          </Button>
        </Block>
      </Container>
    </ThemeProvider>
  )
}

export default Navbar
