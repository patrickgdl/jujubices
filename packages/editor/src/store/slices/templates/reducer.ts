import { createReducer } from "@reduxjs/toolkit"
import { SupabaseTemplate } from "~/types/templates"
import { getTemplateById, getTemplates } from "./actions"

export interface TemplateState {
  templates: SupabaseTemplate[]
  selectedTemplate?: SupabaseTemplate
}

const initialState: TemplateState = {
  templates: [],
  selectedTemplate: undefined,
}

export const templatesReducer = createReducer(initialState, (builder) => {
  builder.addCase(getTemplates.fulfilled, (state, { payload }) => {
    // @ts-ignore
    state.templates = payload
  })

  builder.addCase(getTemplateById.fulfilled, (state, { payload }) => {
    // @ts-ignore
    state.selectedTemplate = payload
  })
})
