import { combineReducers } from "@reduxjs/toolkit"

import { fontsReducer } from "./slices/fonts/reducer"
import { imagekitReducer } from "./slices/imagekit/reducer"
import { templatesReducer } from "./slices/templates/reducer"

const rootReducer = combineReducers({
  fonts: fontsReducer,
  imagekit: imagekitReducer,
  templates: templatesReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
