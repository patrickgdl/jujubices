import { createReducer } from "@reduxjs/toolkit"
import { setTemplates } from "./actions"
import { FileObject } from "~/interfaces/imagekit"

export interface ImageKitState {
  templates: FileObject[]
}

const initialState: ImageKitState = {
  templates: [],
}

export const imagekitReducer = createReducer(initialState, (builder) => {
  builder.addCase(setTemplates, (state, { payload }) => {
    state.templates = payload
  })
})
