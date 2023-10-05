import { useEditor } from "@layerhub-io/react"
import React from "react"
import { toast } from "react-hot-toast"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import useTemplateEditorContext from "~/hooks/useTemplateEditorContext"
import { useUser } from "~/hooks/useUser"
import api from "~/services/api"
import supabase from "~/services/supabase"
import { selectTemplates } from "~/store/slices/templates/selectors"
import { Template } from "~/types/templates"
import { Button } from "~/ui/button"

import { ArrowLeftIcon, ReloadIcon } from "@radix-ui/react-icons"

import { UserNav } from "./user-nav"
import Preview from "~/components/preview/preview"

const Navbar = () => {
  const { user, userDetails } = useUser()
  const { email } = user!
  const { full_name, avatar_url } = userDetails! || {}

  const navigate = useNavigate()
  const { selectedTemplate } = useSelector(selectTemplates)

  const [loading, setLoading] = React.useState<boolean>(false)

  const editor = useEditor()!
  const { isEditing, currentTemplate } = useTemplateEditorContext()

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
          id: "",
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

  const saveOnSupabase = async () => {
    if (editor) {
      try {
        setLoading(true)

        const template = await parseToJSONWithPreview()

        if (!template) return

        const { preview } = template
        const { src: dataURL } = preview

        const response = await fetch(dataURL) // make a request for dataURL
        const blob = await response.blob() // just to make a blob from the response

        const file = new File([blob], `${template.name}.png`, {
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
            .match({ uuid: selectedTemplate?.uuid })

          toast.success("Template atualizado com sucesso!")

          if (error) {
            toast.error("Erro ao atualizar template")
          }
        }
      } catch (error) {
        console.log(error)
        toast.error("Erro ao salvar template")
      } finally {
        setLoading(false)
      }
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/login")
  }

  return (
    <div className="border-b">
      <div className="flex py-3 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon">
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>

          <div className="flex flex-col">
            <h2 className="font-semibold">{currentTemplate.name || "Template"}</h2>
            <h3 className="text-xs font-medium">
              {`${currentTemplate.frame.width} x ${currentTemplate.frame.height}`}
            </h3>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Preview>
            <Button variant="outline">Preview</Button>
          </Preview>

          {loading ? (
            <Button disabled>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Salvando
            </Button>
          ) : (
            <Button onClick={saveOnSupabase} variant="outline">
              Salvar convite
            </Button>
          )}

          {full_name && email && avatar_url && (
            <UserNav name={full_name} email={email} image={avatar_url} onLogout={handleLogout} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
