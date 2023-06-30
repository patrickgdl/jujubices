import { IFrame, IScene } from "@layerhub-io/types"
import { Json } from "./database.types"

export interface SupabaseTemplate {
  created_at: string | null
  uuid: number
  template: Json
}

export interface Template {
  id: string
  type: string
  name: string
  frame: IFrame
  scenes: IScene[]
  metadata: any
  preview: {
    id: string
    src: string
  }
  published: boolean
}
