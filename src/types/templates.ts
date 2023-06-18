import { Json } from "./database.types"

export interface ITemplate {
  created_at: string | null
  id: number
  template: Json
}
