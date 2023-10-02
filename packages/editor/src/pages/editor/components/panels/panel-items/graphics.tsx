import React from "react"
import AngleDoubleLeft from "~/components/icons/AngleDoubleLeft"
import Scrollable from "~/components/scrollable"
import { vectors } from "~/constants/mock-data"
import { useEditor } from "@layerhub-io/react"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import { Button } from "~/ui/button"

const Graphics = () => {
  const inputFileRef = React.useRef<HTMLInputElement>(null)

  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()

  const addObject = React.useCallback(
    (url: string) => {
      if (editor) {
        const options = {
          type: "StaticVector",
          src: url,
        }
        editor.objects.add(options)
      }
    },
    [editor]
  )

  const handleDropFiles = (files: FileList) => {
    const file = files[0]
    const url = URL.createObjectURL(file)
    editor.objects.add({
      src: url,
      type: "StaticVector",
    })
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDropFiles(e.target.files!)
  }

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click()
  }

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
          justifyContent: "space-between",
          padding: "1.5rem",
        }}
      >
        <div>Graphics</div>

        <div onClick={() => setIsSidebarOpen(false)} style={{ cursor: "pointer", display: "flex" }}>
          <AngleDoubleLeft size={18} />
        </div>
      </div>

      <div className="px-6">
        <Button onClick={handleInputFileRefClick}>Computador</Button>
      </div>
      <Scrollable>
        <input onChange={handleFileInput} type="file" id="file" ref={inputFileRef} style={{ display: "none" }} />
        <div>
          <div style={{ display: "grid", gap: "8px", padding: "1.5rem", gridTemplateColumns: "1fr 1fr" }}>
            {vectors.map((vector, index) => (
              <GraphicItem onClick={() => addObject(vector)} key={index} preview={vector} />
            ))}
          </div>
        </div>
      </Scrollable>
    </div>
  )
}

const GraphicItem = ({ preview, onClick }: { preview: any; onClick?: (option: any) => void }) => {
  return (
    <div
      onClick={onClick}
      className="relative h-20 bg-gray-100 cursor-pointer p-3 rounded-md overflow-hidden before:hover:opacity-100"
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100 h-full w-full" />
      <img src={preview} className="w-full h-full object-contain pointer-events-none align-middle" />
    </div>
  )
}

export default Graphics
