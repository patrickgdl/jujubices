import { useEditor } from "@layerhub-io/react"
import { IScene } from "@layerhub-io/types"
import { DarkTheme, styled, ThemeProvider } from "baseui"
import { Block } from "baseui/block"
import { Button, KIND } from "baseui/button"
import { Theme } from "baseui/theme"
import React from "react"
import { toast } from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import Logo from "~/components/Icons/Logo"
import Play from "~/components/Icons/Play"
import useTemplateEditorContext from "~/hooks/useTemplateEditorContext"
import { useUser } from "~/hooks/useUser"
import api from "~/services/api"
import supabase from "~/services/supabase"
import { loadTemplateFonts } from "~/utils/fonts"

import TemplateTitle from "./TemplateTitle"
import { Template } from "~/types/templates"

const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  height: "64px",
  background: $theme.colors.black,
  display: "grid",
  padding: "0 1.25rem",
  gridTemplateColumns: "380px 1fr 380px",
  alignItems: "center",
}))

const Navbar = () => {
  const { user } = useUser()
  const navigate = useNavigate()

  const inputFileRef = React.useRef<HTMLInputElement>(null)
  const [saving, setSaving] = React.useState<boolean>(false)

  const editor = useEditor()!
  const { setDisplayPreview, setScenes, setCurrentTemplate, currentTemplate } = useTemplateEditorContext()

  const parseGraphicJSON = async () => {
    const currentScene = editor.scene.exportToJSON()
    const image = (await editor.renderer.render(currentScene)) as string

    if (currentTemplate) {
      const graphicTemplate: Template = {
        id: currentTemplate.id,
        type: "GRAPHIC",
        name: currentTemplate.name,
        frame: currentTemplate.frame,
        scenes: [currentScene],
        metadata: {},
        preview: { id: "", src: image },
        published: false,
      }
      return graphicTemplate
    } else {
      console.log("NO CURRENT TEMPLATE")
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

  const loadGraphicTemplate = async (payload: Template) => {
    const scenes = []
    const { scenes: scns, ...rest } = payload

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

    return { scenes, rest }
  }

  const handleImportTemplate = React.useCallback(
    async (data: any) => {
      const { scenes, rest } = await loadGraphicTemplate(data)

      setScenes(scenes)
      //   @ts-ignore
      setCurrentTemplate(rest)
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
        const template = JSON.parse(result)
        handleImportTemplate(template)
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

        <Block $style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <TemplateTitle />

          <Button
            size="compact"
            onClick={() => setDisplayPreview(true)}
            kind={KIND.tertiary}
            overrides={{
              StartEnhancer: {
                style: {
                  marginRight: "2px",
                },
              },
            }}
          >
            <Play size={24} />
          </Button>
        </Block>

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

          {user ? (
            <Button
              size="compact"
              onClick={async () => {
                await supabase.auth.signOut()
                navigate("/login")
              }}
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
              Sair
            </Button>
          ) : (
            <Link to="/login">
              <Button
                size="compact"
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
                Login
              </Button>
            </Link>
          )}
        </Block>
      </Container>
    </ThemeProvider>
  )
}

export default Navbar
