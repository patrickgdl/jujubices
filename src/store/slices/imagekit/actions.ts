import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import { FileObject } from "~/types/imagekit"
import api from "~/services/api"

export const setTemplates = createAction<FileObject[]>("imagekit/setTemplates")

export const getImageKitTemplates = createAsyncThunk<void, never, { rejectValue: Record<string, string[]> }>(
  "imagekit/getTemplates",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const imageTemplates = await api.getImageKitTemplate()
      dispatch(setTemplates(imageTemplates))
    } catch (err) {
      return rejectWithValue((err as any).response?.data?.error.data || null)
    }
  }
)
