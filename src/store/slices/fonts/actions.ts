import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import { IFontFamily } from "~/types/editor"
import supabase from "~/services/supabase"

interface QueryFont {
  take: number
  skip: number
  query: string
}

export const setFonts = createAction<IFontFamily[]>("fonts/setFonts")

export const queryFonts = createAction<QueryFont>("fonts/queryFonts")

export const getFonts = createAsyncThunk<void, never, { rejectValue: string }>(
  "fonts/getFonts",
  async (_, { rejectWithValue, dispatch }) => {
    const { data, error } = await supabase.from("enabled_fonts").select(`fonts(*)`)

    if (error) {
      return rejectWithValue(error.message)
    }

    // dispatch(setFonts(orderBy(fonts, ["family"], ["asc"])))
    dispatch(setFonts(data.map((font) => font.fonts as IFontFamily)))
  }
)
