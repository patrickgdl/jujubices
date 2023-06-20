import { IFrame, IScene } from "@layerhub-io/types"

export interface Page {
  id: string
  name: string
  preview: string
}
export interface IDesign {
  id: string
  name: string
  frame: IFrame
  type: string
  scenes: any[]
  previews: { id: string; src: string }[]
  metadata: {}
  published: boolean
}

export interface IComponent extends Omit<IScene, "preview"> {
  published: boolean
  preview: { src: string }
}
