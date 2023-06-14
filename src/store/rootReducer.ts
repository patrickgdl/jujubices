import { combineReducers } from "@reduxjs/toolkit"

import { componentsReducer } from "./slices/components/reducer"
import { designEditorReducer } from "./slices/design-editor/reducer"
import { designsReducer } from "./slices/designs/reducer"
import { fontsReducer } from "./slices/fonts/reducer"
import { uploadsReducer } from "./slices/uploads/reducer"
import { imagekitReducer } from "./slices/imagekit/reducer"

const rootReducer = combineReducers({
  designEditor: designEditorReducer,
  fonts: fontsReducer,
  imagekit: imagekitReducer,
  uploads: uploadsReducer,
  designs: designsReducer,
  components: componentsReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
