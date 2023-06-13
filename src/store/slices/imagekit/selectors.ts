import { RootState } from "~/store/rootReducer"

export const selectTemplates = (state: RootState) => state.imagekit.templates
