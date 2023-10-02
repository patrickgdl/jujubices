import { useEditor } from "@layerhub-io/react"
import { ILayer } from "@layerhub-io/types"
import React from "react"
import { toast } from "react-hot-toast"
import DropZone from "~/components/dropzone"
import AngleDoubleLeft from "~/components/icons/AngleDoubleLeft"
import Scrollable from "~/components/scrollable"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import api from "~/services/api"
import { Button } from "~/ui/button"

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
      <div className="flex flex-1 flex-col">
        <div className="flex items-center font-medium justify-between p-6">
          <div>Uploads</div>

          <div className="cursor-pointer flex" onClick={() => setIsSidebarOpen(false)}>
            <AngleDoubleLeft size={18} />
          </div>
        </div>
        <Scrollable>
          <div className="px-6">
            {saving ? (
              <div> Salvando... </div>
            ) : (
              <Button onClick={handleInputFileRefClick} size="full">
                Computador
              </Button>
            )}
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
          </div>
        </Scrollable>
      </div>
    </DropZone>
  )
}
