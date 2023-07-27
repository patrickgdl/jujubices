import { useEditor } from "@layerhub-io/react"
import React from "react"
import { useSelector } from "react-redux"
import AngleDoubleLeft from "~/components/icons/AngleDoubleLeft"
import Scrollable from "~/components/scrollable"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import { selectBackgrounds } from "~/store/slices/imagekit/selectors"

const Images = () => {
  const editor = useEditor()
  const backgrounds = useSelector(selectBackgrounds)
  const setIsSidebarOpen = useSetIsSidebarOpen()

  const addObject = React.useCallback(
    (url: string) => {
      if (editor) {
        const options = {
          type: "StaticImage",
          src: url,
        }
        editor.objects.add(options)
      }
    },
    [editor]
  )

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
        <div>Imagens</div>

        <div onClick={() => setIsSidebarOpen(false)} style={{ cursor: "pointer", display: "flex" }}>
          <AngleDoubleLeft size={18} />
        </div>
      </div>
      <Scrollable>
        <div className="px-6">
          <div style={{ display: "grid", gap: "8px", gridTemplateColumns: "1fr 1fr" }}>
            {backgrounds.map((image, index) => {
              return <ImageItem key={index} onClick={() => addObject(image.url)} preview={image.thumbnail} />
            })}
          </div>
        </div>
      </Scrollable>
    </div>
  )
}

const ImageItem = ({ preview, onClick }: { preview: any; onClick?: (option: any) => void }) => {
  return (
    <div
      onClick={onClick}
      className="relative bg-gray-100 cursor-pointer rounded-md overflow-hidden before:hover:opacity-100"
    >
      <div className="absolute shadow-md top-0 left-0 right-0 bottom-0 opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100 h-full w-full" />

      <img src={preview} className="w-full h-full object-contain pointer-events-none align-middle" />
    </div>
  )
}

export default Images
