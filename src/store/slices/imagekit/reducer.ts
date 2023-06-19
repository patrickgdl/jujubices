import { createReducer } from "@reduxjs/toolkit"
import { setBackgrounds } from "./actions"
import { FileObject } from "~/types/imagekit"

export interface ImageKitState {
  backgrounds: FileObject[]
}

const initialState: ImageKitState = {
  backgrounds: [],
}

export const imagekitReducer = createReducer(initialState, (builder) => {
  builder.addCase(setBackgrounds, (state, { payload }) => {
    state.backgrounds = payload
  })
})
