import { useEditor } from "@layerhub-io/react"
import { IScene } from "@layerhub-io/types"
import React from "react"
import { useSelector } from "react-redux"
import { getTemplateById } from "~/store/slices/templates/actions"
import { selectTemplates } from "~/store/slices/templates/selectors"
import { useAppDispatch } from "~/store/store"
import { Template } from "~/types/templates"

type Props = {
  templateId: string
}

/**
 * This hook is used to get the selected template from the store and parse it into a usable format.
 * @param templateId The id of the template to get.
 * @returns The parsed template.
 */
const useSelectedTemplate = ({ templateId }: Props) => {
  const editor = useEditor()

  const [template, setTemplate] = React.useState<Template>({} as Template)

  const dispatch = useAppDispatch()
  const { selectedTemplate } = useSelector(selectTemplates)

  React.useEffect(() => {
    if (templateId) {
      dispatch(getTemplateById(templateId))
    }
  }, [templateId])

  React.useEffect(() => {
    if (selectedTemplate) {
      const { template } = selectedTemplate
      const parsedTemplate = JSON.parse(template as string)

      setTemplate(parsedTemplate)
    }
  }, [selectedTemplate, editor])

  return { template }
}

export default useSelectedTemplate
