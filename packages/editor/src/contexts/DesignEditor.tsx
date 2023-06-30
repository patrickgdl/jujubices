import { IScene } from "@layerhub-io/types"
import React from "react"
import { IDesign } from "~/types/design-editor"

interface ISceneEditorContext {
  scenes: IScene[]
  setScenes: (value: ((prevState: IScene[]) => IScene[]) | IScene[]) => void
  currentScene: IScene | null
  setCurrentScene: React.Dispatch<React.SetStateAction<IScene | null>>
  currentDesign: IDesign
  setCurrentDesign: React.Dispatch<React.SetStateAction<IDesign>>
  isSidebarOpen: boolean
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
  displayPreview: boolean
  setDisplayPreview: React.Dispatch<React.SetStateAction<boolean>>
  currentPreview: string
  setCurrentPreview: React.Dispatch<React.SetStateAction<string>>
}

export const DesignEditorContext = React.createContext<ISceneEditorContext>({
  scenes: [],
  setScenes: () => {},
  currentScene: null,
  setCurrentScene: () => {},
  currentDesign: {
    id: "",
    frame: {
      width: 1080,
      height: 1920,
    },
    metadata: {},
    name: "",
    preview: { id: "", src: "" },
    scenes: [],
    type: "",
    published: false,
  },
  setCurrentDesign: () => {},
  isSidebarOpen: true,
  setIsSidebarOpen: () => {},
  displayPreview: false,
  setDisplayPreview: () => {},
  currentPreview: "",
  setCurrentPreview: () => {},
})

export const DesignEditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [scenes, setScenes] = React.useState<IScene[]>([])
  const [currentScene, setCurrentScene] = React.useState<IScene | null>(null)
  const [currentDesign, setCurrentDesign] = React.useState<IDesign>({
    id: "",
    frame: {
      width: 1080,
      height: 1920,
    },
    metadata: {},
    name: "",
    preview: { id: "", src: "" },
    scenes: [],
    type: "",
    published: false,
  })
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)
  const [displayPreview, setDisplayPreview] = React.useState<boolean>(false)
  const [currentPreview, setCurrentPreview] = React.useState<string>("")

  const context = {
    scenes,
    setScenes,
    currentScene,
    setCurrentScene,
    currentDesign,
    setCurrentDesign,
    isSidebarOpen,
    setIsSidebarOpen,
    displayPreview,
    setDisplayPreview,
    currentPreview,
    setCurrentPreview,
  }

  return <DesignEditorContext.Provider value={context}>{children}</DesignEditorContext.Provider>
}
