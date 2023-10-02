import { useEditor, useFrame } from "@layerhub-io/react"
import Scrollbar from "@layerhub-io/react-custom-scrollbar"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/ui/tabs"
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "~/ui/dialog"
import React from "react"
import { HexColorPicker } from "react-colorful"
import AngleDoubleLeft from "~/components/icons/AngleDoubleLeft"
import SwapHorizontal from "~/components/icons/SwapHorizontal"
import Scrollable from "~/components/scrollable"
import { sampleFrames } from "~/constants/editor"
import useTemplateEditorContext from "~/hooks/useTemplateEditorContext"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import { Button } from "~/ui/button"
import { Input } from "~/ui/input"
import { PlusIcon } from "@radix-ui/react-icons"

const colors = ["#ffffff", "#9B9B9B", "#4A4A4A", "#000000", "#A70C2C", "#DA9A15", "#F8E71D", "#47821A", "#4990E2"]

interface State {
  backgroundColor: string
}

const Customize = () => {
  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()

  const [state, setState] = React.useState<State>({
    backgroundColor: "#000000",
  })

  const changeBackgroundColor = (color: string) => {
    if (editor) {
      editor.frame.setBackgroundColor(color)
    }
  }
  const handleChange = (type: string, value: any) => {
    setState({ ...state, [type]: value })
    changeBackgroundColor(value)
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center font-medium justify-between p-6">
        <div>Customizar</div>

        <div onClick={() => setIsSidebarOpen(false)} className="cursor-pointer flex">
          <AngleDoubleLeft size={18} />
        </div>
      </div>

      <Scrollable>
        <div className="px-6">
          <div>
            <ResizeTemplate />
            <div className="text-sm text-center pt-1">1080 x 1920px</div>
          </div>

          <div className="pt-2">
            <div
              style={{
                background: "#fafafa",
                borderRadius: "8px",
                border: "1px solid #ececf5",
                padding: "0.45rem 1rem",
                fontSize: "14px",
              }}
            >
              <div style={{ padding: "0.5rem 0" }}>Cor de Fundo do Objeto</div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gap: "0.5rem",
                  paddingTop: "0.25rem",
                }}
              >
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon">
                      <PlusIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-6">
                    <div
                      style={{
                        padding: "1rem",
                        background: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        textAlign: "center",
                      }}
                    >
                      <HexColorPicker onChange={(v) => handleChange("backgroundColor", v)} />
                      <Input
                        value={state.backgroundColor}
                        onChange={(e) => handleChange("backgroundColor", (e.target as any).value)}
                        placeholder="#000000"
                      />
                    </div>
                  </PopoverContent>
                </Popover>

                {colors.map((color) => (
                  <div
                    onClick={() => handleChange("backgroundColor", color)}
                    key={color}
                    style={{
                      background: color,
                      borderRadius: "4px",
                      border: "1px solid #d7d8e3",
                      height: "34px",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Scrollable>
    </div>
  )
}

const ResizeTemplate = () => {
  const [desiredFrame, setDesiredFrame] = React.useState({
    width: 0,
    height: 0,
  })
  const [selectedFrame, setSelectedFrame] = React.useState<any>({
    id: 0,
    width: 0,
    height: 0,
  })

  const frame = useFrame()
  const editor = useEditor()
  const { currentTemplate, setCurrentTemplate } = useTemplateEditorContext()

  React.useEffect(() => {
    if (frame) {
      setDesiredFrame({
        width: frame.width,
        height: frame.height,
      })
    }
  }, [frame])

  const applyResize = () => {
    const size = selectedFrame || desiredFrame

    if (editor) {
      editor.frame.resize({
        width: parseInt(size.width),
        height: parseInt(size.height),
      })

      setCurrentTemplate({
        ...currentTemplate,
        frame: {
          width: parseInt(size.width),
          height: parseInt(size.height),
        },
      })
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="full">Redimensionar</Button>
        </DialogTrigger>

        <DialogContent>
          <div className="px-6 w-full">
            <div className=" pt-8 pb-4 px-4">Escolha um formato e redimensione seu modelo.</div>

            <div className="flex items-center justify-center">
              <Tabs defaultValue="preset">
                <TabsList>
                  <TabsTrigger value="preset">Tamanho pré-definidos</TabsTrigger>
                  <TabsTrigger value="custom">Tamanho customizado</TabsTrigger>
                </TabsList>

                <TabsContent value="preset">
                  <div style={{ width: "100%", height: "400px" }}>
                    <Scrollbar>
                      <div style={{ display: "flex", flexDirection: "column", padding: "1rem 5rem" }}>
                        {sampleFrames.map((sampleFrame, index) => (
                          <div
                            onClick={() => setSelectedFrame(sampleFrame)}
                            className="cursor-pointer hover:bg-gray-100"
                            style={{
                              backgroundColor: selectedFrame.id === sampleFrame.id ? "rgb(243,244,245)" : "#ffffff",
                              margin: "0.25rem 0",
                            }}
                            key={index}
                          >
                            <div style={{ fontSize: "13px" }}>
                              <div style={{ fontWeight: 500 }}>{sampleFrame.name}</div>
                              <div style={{ color: "rgb(119,119,119)" }}>
                                {sampleFrame.width} x {sampleFrame.height}px
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Scrollbar>
                  </div>
                </TabsContent>

                <TabsContent value="custom">
                  <div style={{ padding: "2rem 2rem" }}>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 50px 1fr",
                        alignItems: "end",
                        fontSize: "14px",
                      }}
                    >
                      <Input
                        onChange={(e: any) => setDesiredFrame({ ...desiredFrame, width: e.target.value })}
                        value={desiredFrame.width}
                      />

                      <Button size="sm">
                        <SwapHorizontal size={24} />
                      </Button>
                      <Input
                        onChange={(e: any) => setDesiredFrame({ ...desiredFrame, height: e.target.value })}
                        value={desiredFrame.height}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={applyResize} size="lg">
              Redimensionar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Customize
