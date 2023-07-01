import { useEditor } from "@layerhub-io/react"
import { IScene } from "@layerhub-io/types"
import { DarkTheme, styled, ThemeProvider } from "baseui"
import { Block } from "baseui/block"
import { Button, KIND } from "baseui/button"
import { Theme } from "baseui/theme"
import React from "react"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import Logo from "~/components/Icons/Logo"
import Play from "~/components/Icons/Play"
import useTemplateEditorContext from "~/hooks/useTemplateEditorContext"
import { useUser } from "~/hooks/useUser"
import api from "~/services/api"
import supabase from "~/services/supabase"
import { Template } from "~/types/templates"
import { makeJSONDownload } from "~/utils/download"
import { loadTemplateFonts } from "~/utils/fonts"

import TemplateTitle from "./TemplateTitle"
import NavbarActions from "./NavbarActions"

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

  const [loading, setLoading] = React.useState<boolean>(false)

  const editor = useEditor()!
  const { isEditing, setDisplayPreview, setCurrentScene, setCurrentTemplate, currentTemplate } =
    useTemplateEditorContext()

  const parseToJSONWithPreview = async () => {
    if (currentTemplate) {
      if (!currentTemplate.name) {
        toast.error("Por favor, insira um nome para o template")
        return null
      }

      // export current scene as JSON
      const currentScene = editor.scene.exportToJSON()

      // render current scene as a dataURL image
      const image = (await editor.renderer.render(currentScene)) as string

      const graphicTemplate: Template = {
        id: currentTemplate.id,
        type: "GRAPHIC",
        name: currentTemplate.name,
        frame: currentTemplate.frame,
        scene: currentScene,
        metadata: {},
        preview: {
          id: isEditing ? currentTemplate.preview.id : currentTemplate.name,
          src: image,
        },
        published: false,
      }

      return graphicTemplate
    } else {
      console.log("NO CURRENT TEMPLATE")
      return null
    }
  }

  const handleDownload = async () => {
    if (editor) {
      const template = parseToJSONWithPreview()

      if (!template) return

      makeJSONDownload(template)
    }
  }

  const handleSubmit = async () => {
    if (editor) {
      try {
        setLoading(true)

        const template = await parseToJSONWithPreview()

        if (!template) return

        const { preview } = template
        const { src: dataURL, id } = preview

        const response = await fetch(dataURL) // make a request for dataURL
        const blob = await response.blob() // just to make a blob from the response

        const file = new File([blob], `${id}.png`, {
          type: blob.type,
        })

        if (!isEditing) {
          const { fileId, url } = await api.uploadToImageKit(file, "templates")

          const { error } = await supabase.from("templates").insert({
            template: JSON.stringify({
              ...template,
              preview: { id: fileId, src: url },
            }),
          })

          toast.success("Template salvo com sucesso!")

          if (error) {
            toast.error("Erro ao salvar template")
          }
        } else {
          // this is going to delete the old preview image from imagekit and upload a new one
          const { fileId, url } = await api.updateImageKit(file, "templates", currentTemplate.preview.id)

          const { error } = await supabase
            .from("templates")
            .update({
              template: JSON.stringify({
                ...template,
                preview: { id: fileId, src: url },
              }),
            })
            .match({ id: template.id })

          toast.success("Template atualizado com sucesso!")

          if (error) {
            toast.error("Erro ao atualizar template")
          }
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
  }

  const generatePreview = async (scene: IScene) => {
    const preview = (await editor.renderer.render(scene)) as string

    return preview
  }

  const handleImport = React.useCallback(
    async (data: Template) => {
      const { scene } = data
      await loadTemplateFonts(scene)

      const preview = await generatePreview(scene)

      setCurrentScene({ ...scene, preview })
      setCurrentTemplate(data)
    },
    [editor]
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (res) => {
        const result = res.target!.result as string
        const template = JSON.parse(result)
        handleImport(template)
      }
      reader.onerror = (err) => {
        console.log(err)
      }

      reader.readAsText(file)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/login")
  }

  return (
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

        <NavbarActions
          loading={loading}
          editing={isEditing}
          loggedIn={!!user}
          onSubmit={handleSubmit}
          onLogout={handleLogout}
          onDownload={handleDownload}
          onFileChange={handleFileChange}
        />
      </Container>
    </ThemeProvider>
  )
}

export default Navbar
