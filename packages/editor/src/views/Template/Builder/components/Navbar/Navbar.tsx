import { useEditor } from "@layerhub-io/react"
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

  const [saving, setSaving] = React.useState<boolean>(false)

  const editor = useEditor()!
  const { setDisplayPreview, currentTemplate } = useTemplateEditorContext()

  const parseGraphicJSON = async () => {
    const currentScene = editor.scene.exportToJSON()
    const image = (await editor.renderer.render(currentScene)) as string

    if (currentTemplate) {
      const graphicTemplate: Template = {
        id: currentTemplate.id,
        type: "GRAPHIC",
        name: currentTemplate.name,
        frame: currentTemplate.frame,
        scene: currentScene,
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

  return (
    <ThemeProvider theme={DarkTheme}>
      <Container>
        <div style={{ color: "#ffffff" }}>
          <Logo size={36} />
        </div>

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

        <Block $style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
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
