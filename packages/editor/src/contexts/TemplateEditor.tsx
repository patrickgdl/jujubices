import { IScene } from "@layerhub-io/types"
import React from "react"
import { Template } from "~/types/templates"

interface ISceneEditorContext {
  scenes: IScene[]
  setScenes: (value: ((prevState: IScene[]) => IScene[]) | IScene[]) => void
  currentScene: IScene | null
  setCurrentScene: React.Dispatch<React.SetStateAction<IScene | null>>
  currentTemplate: Template
  setCurrentTemplate: React.Dispatch<React.SetStateAction<Template>>
  isSidebarOpen: boolean
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
  displayPreview: boolean
  setDisplayPreview: React.Dispatch<React.SetStateAction<boolean>>
  currentPreview: string
  setCurrentPreview: React.Dispatch<React.SetStateAction<string>>
}

export const TemplateEditorContext = React.createContext<ISceneEditorContext>({
  scenes: [],
  setScenes: () => {},
  currentScene: null,
  setCurrentScene: () => {},
  currentTemplate: {
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
  setCurrentTemplate: () => {},
  isSidebarOpen: true,
  setIsSidebarOpen: () => {},
  displayPreview: false,
  setDisplayPreview: () => {},
  currentPreview: "",
  setCurrentPreview: () => {},
})

export const TemplateEditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [scenes, setScenes] = React.useState<IScene[]>([])
  const [currentScene, setCurrentScene] = React.useState<IScene | null>(null)
  const [currentTemplate, setCurrentTemplate] = React.useState<Template>({
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
    currentTemplate,
    setCurrentTemplate,
    isSidebarOpen,
    setIsSidebarOpen,
    displayPreview,
    setDisplayPreview,
    currentPreview,
    setCurrentPreview,
  }

  return <TemplateEditorContext.Provider value={context}>{children}</TemplateEditorContext.Provider>
}
