import { createReducer } from "@reduxjs/toolkit"
import { setTemplates } from "./actions"
import { ITemplate } from "~/types/templates"

export interface TemplateState {
  templates: ITemplate[]
}

const initialState: TemplateState = {
  templates: [],
}

export const templatesReducer = createReducer(initialState, (builder) => {
  builder.addCase(setTemplates, (state, { payload }) => {
    // @ts-ignore
    state.templates = payload
  })
})
