import { Json } from "./database.types"

export interface ITemplate {
  created_at: string | null
  uuid: number
  template: Json
}

export interface Template {
  id: string
  type: string
  name: string
  frame: {
    width: number
    height: number
  }
  scenes: Scene[]
  metadata: any
  preview: {
    id: string
    src: string
  }
  published: boolean
}

export interface Scene {
  id: string
  name: string
  layers: Layer[]
  frame: {
    width: number
    height: number
  }
  metadata: any
}

export interface Layer {
  id: string
  name: string
  angle: number
  stroke: any
  strokeWidth: number
  left: number
  top: number
  width: number
  height: number
  opacity: number
  originX: string
  originY: string
  scaleX: number
  scaleY: number
  type: string
  flipX: boolean
  flipY: boolean
  skewX: number
  skewY: number
  visible: boolean
  shadow?: Shadow
  fill?: string
  metadata?: any
  src?: string
  cropX?: number
  cropY?: number
  charSpacing?: number
  fontFamily?: string
  fontSize?: number
  lineHeight?: number
  text?: string
  textAlign?: string
  fontURL?: string
}

export interface Shadow {
  color: string
  blur: number
  offsetX: number
  offsetY: number
  affectStroke: boolean
  nonScaling: boolean
}
