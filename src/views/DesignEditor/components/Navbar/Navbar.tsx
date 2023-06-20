import { useEditor } from "@layerhub-io/react"
import { IScene } from "@layerhub-io/types"
import { DarkTheme, styled, ThemeProvider } from "baseui"
import { Block } from "baseui/block"
import { Button, KIND } from "baseui/button"
import { Theme } from "baseui/theme"
import React, { useState } from "react"
import Logo from "~/components/Icons/Logo"
import Play from "~/components/Icons/Play"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import supabase from "~/services/supabase"
import { IDesign } from "~/types/design-editor"
import { loadTemplateFonts } from "~/utils/fonts"

import DesignTitle from "./DesignTitle"
import api from "~/services/api"
import { toast } from "react-hot-toast"

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
  const [saving, setSaving] = React.useState<boolean>(false)

  const editor = useEditor()!
  const { setDisplayPreview, setScenes, setCurrentDesign, currentDesign } = useDesignEditorContext()

  const parseGraphicJSON = async () => {
    const currentScene = editor.scene.exportToJSON()
    const image = (await editor.renderer.render(currentScene)) as string

    if (currentDesign) {
      const graphicTemplate: IDesign = {
        id: currentDesign.id,
        type: "GRAPHIC",
        name: currentDesign.name,
        frame: currentDesign.frame,
        scenes: [currentScene],
        metadata: {},
        preview: { id: "", src: image },
        published: false,
      }
      return graphicTemplate
    } else {
      console.log("NO CURRENT DESIGN")
      return null
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
      const template = parseGraphicJSON()

      if (!template) return

      makeDownload(template)
    }
  }

  const saveOnSupabase = async () => {
    if (editor) {
      try {
        setSaving(true)

        const template = await parseGraphicJSON()

        if (!template) return

        const { preview } = template
        const { src: dataURL, id } = preview

        const response = await fetch(dataURL) // make a request for dataURL
        const blob = await response.blob() // just to make a blob from the response

        const file = new File([blob], `${id}.png`, {
          type: blob.type,
        })

        const { fileId, url } = await api.uploadToImageKit(file, "templates")

        const { error } = await supabase.from("templates").insert({
          template: JSON.stringify({
            ...template,
            preview: { id: fileId, src: url },
          }),
        })

        toast.success("Template salvo com sucesso!")

        if (error) {
          console.log(error)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setSaving(false)
      }
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
      const template = await loadGraphicTemplate(data)

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
            onClick={saveOnSupabase}
            kind={KIND.tertiary}
            isLoading={saving}
            overrides={{
              StartEnhancer: {
                style: {
                  marginRight: "4px",
                },
              },
            }}
          >
            Salvar
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
