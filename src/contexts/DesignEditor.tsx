import { IScene } from "@layerhub-io/types"
import React from "react"
import {ContextMenuSceneRequest, ContextMenuTimelineRequest, DesignType, IDesign} from "~/interfaces/DesignEditor"

interface ISceneEditorContext {
  scenes: IScene[]
  setScenes: (value: ((prevState: IScene[]) => IScene[]) | IScene[]) => void
  currentScene: IScene | null
  setCurrentScene: React.Dispatch<React.SetStateAction<IScene | null>>
  currentDesign: IDesign
  setCurrentDesign: React.Dispatch<React.SetStateAction<IDesign>>
  isSidebarOpen: boolean
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
  editorType: DesignType
  setEditorType: React.Dispatch<React.SetStateAction<DesignType>>
  uploadAudio: string
  setUploadAudio: React.Dispatch<React.SetStateAction<string>>
  uploadText: string
  setUploadText: React.Dispatch<React.SetStateAction<string>>
  uploadVoice: string
  setUploadVoice: React.Dispatch<React.SetStateAction<string>>
  uploadFile: any
  setUploadFile: React.Dispatch<React.SetStateAction<any>>
  uploadLive: any
  setUploadLive: React.Dispatch<React.SetStateAction<any>>
  uploadVtuber: string
  setUploadVtuber: React.Dispatch<React.SetStateAction<string>>
  uploadScript: string
  setUploadScript: React.Dispatch<React.SetStateAction<string>>
  uploadLanguage: string
  setUploadLanguage: React.Dispatch<React.SetStateAction<string>>
  uploadVoiceName: string
  setUploadVoiceName: React.Dispatch<React.SetStateAction<string>>
  templateId: string
  setTemplateId: React.Dispatch<React.SetStateAction<string>>
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
      width: 1,
      height: 1,
    },
    metadata: {},
    name: "",
    preview: "",
    scenes: [],
    type: "",
  },
  setCurrentDesign: () => {},
  isSidebarOpen: true,
  setIsSidebarOpen: () => {},
  editorType: "GRAPHIC",
  setEditorType: () => {},
  uploadAudio: "",
  setUploadAudio: () => {},
  uploadVtuber: "",
  setUploadVtuber: () => {},
  uploadText: "",
  setUploadText: () => {},
  uploadVoice: "",
  setUploadVoice: () => {},
  uploadFile: [],
  setUploadFile: () => [],
  uploadLive: [],
  setUploadLive: () => [],
  uploadScript: "",
  setUploadScript: () => {},
  uploadLanguage: "",
  setUploadLanguage: () => {},
  uploadVoiceName: "",
  setUploadVoiceName: () => {},
  templateId: "",
  setTemplateId: () => {},
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
      width: 1,
      height: 1,
    },
    metadata: {},
    name: "",
    preview: "",
    scenes: [],
    type: "",
  })
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)
  const [editorType, setEditorType] = React.useState<DesignType>("GRAPHIC")
  const [uploadAudio, setUploadAudio] = React.useState<string>("")
  const [uploadText, setUploadText] = React.useState<string>("")
  const [uploadVoice, setUploadVoice] = React.useState<string>("")
  const [uploadFile, setUploadFile] = React.useState<any>([])
  const [uploadLive, setUploadLive] = React.useState<any>([])
  const [uploadVtuber, setUploadVtuber] = React.useState<string>("")
  const [uploadScript, setUploadScript] = React.useState<string>("")
  const [uploadLanguage, setUploadLanguage] = React.useState<string>("")
  const [uploadVoiceName, setUploadVoiceName] = React.useState<string>("")
  const [templateId, setTemplateId] = React.useState<string>("")
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
    editorType,
    setEditorType,
    uploadAudio,
    setUploadAudio,
    uploadText,
    setUploadText,
    uploadVoice,
    setUploadVoice,
    uploadFile,
    setUploadFile,
    uploadLive,
    setUploadLive,
    uploadVtuber,
    setUploadVtuber,
    uploadScript,
    setUploadScript,
    uploadLanguage,
    setUploadLanguage,
    uploadVoiceName,
    setUploadVoiceName,
    templateId,
    setTemplateId,
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
