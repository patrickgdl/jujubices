import { useEditor } from "@layerhub-io/react"
import React from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getTemplateById } from "~/store/slices/templates/actions"
import { selectTemplates } from "~/store/slices/templates/selectors"
import { useAppDispatch } from "~/store/store"
import { Template } from "~/types/templates"
import useTemplateEditorContext from "./useTemplateEditorContext"

/**
 * This hook is used to get the selected template from the store and parse it into a usable format.
 * If there is no selected template, it will return an empty template.
 * @returns The parsed template.
 */
const useSelectedTemplate = () => {
  const editor = useEditor()
  const params = useParams()

  const { setIsEditing } = useTemplateEditorContext()
  const [template, setTemplate] = React.useState<Template>({} as Template)

  const dispatch = useAppDispatch()
  const { selectedTemplate } = useSelector(selectTemplates)

  React.useEffect(() => {
    if (params.id) {
      dispatch(getTemplateById(params.id))
    }
  }, [params.id])

  React.useEffect(() => {
    if (selectedTemplate) {
      setIsEditing(true)
      const { template } = selectedTemplate
      const parsedTemplate = JSON.parse(template as string)

      setTemplate(parsedTemplate)
    } else {
      setIsEditing(false)
    }
  }, [selectedTemplate, editor])

  return { template }
}

export default useSelectedTemplate
