import { combineReducers } from "@reduxjs/toolkit"

import { designEditorReducer } from "./slices/design-editor/reducer"
import { fontsReducer } from "./slices/fonts/reducer"
import { imagekitReducer } from "./slices/imagekit/reducer"

const rootReducer = combineReducers({
  designEditor: designEditorReducer,
  fonts: fontsReducer,
  imagekit: imagekitReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
