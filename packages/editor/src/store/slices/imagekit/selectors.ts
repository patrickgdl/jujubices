import { RootState } from "~/store/rootReducer"

export const selectBackgrounds = (state: RootState) => state.imagekit.backgrounds
