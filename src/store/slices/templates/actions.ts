import { createAsyncThunk } from "@reduxjs/toolkit"
import supabase from "~/services/supabase"

export const getTemplates = createAsyncThunk("templates/getTemplates", async (_, thunkAPI) => {
  const { data, error } = await supabase.from("templates").select("*")

  if (error) {
    return thunkAPI.rejectWithValue(error.message)
  }

  return data
})

export const getTemplateById = createAsyncThunk("templates/getTemplateById", async (id: string, thunkAPI) => {
  const { data, error } = await supabase.from("templates").select("*").eq("id", id).single()

  if (error) {
    return thunkAPI.rejectWithValue(error.message)
  }

  return data
})
