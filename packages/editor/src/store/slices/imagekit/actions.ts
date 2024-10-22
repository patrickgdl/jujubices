import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import { FileObject } from "~/types/imagekit"
import api from "~/services/api"

export const setBackgrounds = createAction<FileObject[]>("imagekit/setBackgrounds")

export const getImageKitBackgrounds = createAsyncThunk(
  "imagekit/getImageKitBackgrounds",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const imgBackgrounds = await api.getFromImageKit("backgrounds")
      dispatch(setBackgrounds(imgBackgrounds))
    } catch (err) {
      return rejectWithValue((err as any).response?.data?.error.data || null)
    }
  }
)
