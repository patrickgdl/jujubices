import { useEditor } from "@layerhub-io/react"
import { ILayer } from "@layerhub-io/types"
import { Block } from "baseui/block"
import { Button, SIZE } from "baseui/button"
import React from "react"
import { toast } from "react-hot-toast"
import DropZone from "~/components/Dropzone"
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft"
import Scrollable from "~/components/Scrollable"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import api from "~/services/api"

export default function () {
  const inputFileRef = React.useRef<HTMLInputElement>(null)

  const [uploads, setUploads] = React.useState<any[]>([])
  const [saving, setSvaing] = React.useState<boolean>(false)

  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()

  const handleDropFiles = async (files: FileList) => {
    const file = files[0]

    const { fileId, url, thumbnailUrl } = await api.uploadToImageKit(file, "backgrounds")

    toast.success("Background salvo com sucesso!")

    const upload = {
      id: fileId,
      src: url,
      preview: thumbnailUrl,
      type: "StaticImage",
    }

    setUploads([...uploads, upload])
  }

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click()
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDropFiles(e.target.files!)
  }

  const addImageToCanvas = (props: Partial<ILayer>) => {
    editor.objects.add(props)
  }

  return (
    <DropZone handleDropFiles={handleDropFiles}>
      <Block $style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Block
          $style={{
            display: "flex",
            alignItems: "center",
            fontWeight: 500,
            justifyContent: "space-between",
            padding: "1.5rem",
          }}
        >
          <Block>Uploads</Block>

          <Block onClick={() => setIsSidebarOpen(false)} $style={{ cursor: "pointer", display: "flex" }}>
            <AngleDoubleLeft size={18} />
          </Block>
        </Block>
        <Scrollable>
          <Block padding={"0 1.5rem"}>
            <Button
              onClick={handleInputFileRefClick}
              size={SIZE.compact}
              isLoading={saving}
              overrides={{
                Root: {
                  style: {
                    width: "100%",
                  },
                },
              }}
            >
              Computador
            </Button>
            <input onChange={handleFileInput} type="file" id="file" ref={inputFileRef} style={{ display: "none" }} />

            <div
              style={{
                marginTop: "1rem",
                display: "grid",
                gap: "0.5rem",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              {uploads.map((upload) => (
                <div
                  key={upload.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => addImageToCanvas(upload)}
                >
                  <div>
                    <img width="100%" src={upload.preview ? upload.preview : upload.url} alt="preview" />
                  </div>
                </div>
              ))}
            </div>
          </Block>
        </Scrollable>
      </Block>
    </DropZone>
  )
}