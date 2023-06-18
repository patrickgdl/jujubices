import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import supabase from "~/services/supabase"
import { ITemplate } from "~/types/templates"

export const setTemplates = createAction<ITemplate[]>("templates/setTemplates")

export const getTemplates = createAsyncThunk<void, never, { rejectValue: string }>(
  "templates/getTemplates",
  async (_, { rejectWithValue, dispatch }) => {
    const { data, error } = await supabase.from("templates").select("*")

    if (error) {
      return rejectWithValue(error.message)
    }

    dispatch(setTemplates(data))
  }
)
