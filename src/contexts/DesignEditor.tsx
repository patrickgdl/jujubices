import { IScene } from "@layerhub-io/types"
import React from "react"
import { ContextMenuSceneRequest, ContextMenuTimelineRequest, IDesign } from "~/interfaces/DesignEditor"

interface ISceneEditorContext {
  scenes: IScene[]
  setScenes: (value: ((prevState: IScene[]) => IScene[]) | IScene[]) => void
  currentScene: IScene | null
  setCurrentScene: React.Dispatch<React.SetStateAction<IScene | null>>
  currentDesign: IDesign
  setCurrentDesign: React.Dispatch<React.SetStateAction<IDesign>>
  isSidebarOpen: boolean
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
  displayPlayback: boolean
  setDisplayPlayback: React.Dispatch<React.SetStateAction<boolean>>
  displayPreview: boolean
  setDisplayPreview: React.Dispatch<React.SetStateAction<boolean>>
  currentPreview: string
  setCurrentPreview: React.Dispatch<React.SetStateAction<string>>
  maxTime: number
  setMaxTime: React.Dispatch<React.SetStateAction<number>>
  contextMenuTimelineRequest: ContextMenuTimelineRequest
  setContextMenuTimelineRequest: React.Dispatch<React.SetStateAction<ContextMenuTimelineRequest>>
  contextMenuSceneRequest: ContextMenuTimelineRequest
  setContextMenuSceneRequest: React.Dispatch<React.SetStateAction<ContextMenuTimelineRequest>>
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
    previews: [],
    scenes: [],
    type: "",
    published: false,
  },
  setCurrentDesign: () => {},
  isSidebarOpen: true,
  setIsSidebarOpen: () => {},
  displayPlayback: false,
  setDisplayPlayback: () => {},
  displayPreview: false,
  setDisplayPreview: () => {},
  currentPreview: "",
  setCurrentPreview: () => {},
  maxTime: 0,
  setMaxTime: () => {},
  contextMenuTimelineRequest: {
    id: "",
    left: 0,
    top: 0,
    visible: false,
  },
  setContextMenuTimelineRequest: () => {},
  contextMenuSceneRequest: {
    id: "",
    left: 0,
    top: 0,
    visible: false,
  },
  setContextMenuSceneRequest: () => {},
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
    previews: [],
    scenes: [],
    type: "",
    published: false,
  })
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)
  const [displayPlayback, setDisplayPlayback] = React.useState<boolean>(false)
  const [displayPreview, setDisplayPreview] = React.useState<boolean>(false)
  const [currentPreview, setCurrentPreview] = React.useState<string>("")
  const [maxTime, setMaxTime] = React.useState(5000)
  const [contextMenuTimelineRequest, setContextMenuTimelineRequest] = React.useState<ContextMenuTimelineRequest>({
    id: "",
    left: 0,
    top: 0,
    visible: false,
  })
  const [contextMenuSceneRequest, setContextMenuSceneRequest] = React.useState<ContextMenuSceneRequest>({
    id: "",
    left: 0,
    top: 0,
    visible: false,
  })

  const context = {
    scenes,
    setScenes,
    currentScene,
    setCurrentScene,
    currentDesign,
    setCurrentDesign,
    isSidebarOpen,
    setIsSidebarOpen,
    displayPlayback,
    setDisplayPlayback,
    displayPreview,
    setDisplayPreview,
    currentPreview,
    setCurrentPreview,
    maxTime,
    setMaxTime,
    contextMenuTimelineRequest,
    setContextMenuTimelineRequest,
    contextMenuSceneRequest,
    setContextMenuSceneRequest,
  }

  return <DesignEditorContext.Provider value={context}>{children}</DesignEditorContext.Provider>
}
