import { IFrame } from "@layerhub-io/types"

export interface IDesign {
  id: string
  name: string
  frame: IFrame
  type: string
  scenes: any[]
  preview: { id: string; src: string }
  metadata: {}
  published: boolean
}
