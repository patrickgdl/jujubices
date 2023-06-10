import { Canvas as LayerhubCanvas, useEditor, useFrame } from "@layerhub-io/react"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"

import React from "react"

const NINE_PEX_SIXTEEN_RATIO = {
  width: 1080,
  height: 1920,
}

const Canvas = () => {
  const frame = useFrame()
  const editor = useEditor()
  const { currentDesign, setCurrentDesign } = useDesignEditorContext()

  React.useEffect(() => {
    if (frame) {
      if (editor) {
        editor.frame.resize({
          width: NINE_PEX_SIXTEEN_RATIO.width,
          height: NINE_PEX_SIXTEEN_RATIO.height,
        })

        setCurrentDesign({
          ...currentDesign,
          frame: {
            width: NINE_PEX_SIXTEEN_RATIO.width,
            height: NINE_PEX_SIXTEEN_RATIO.height,
          },
        })
      }
    }
  }, [editor])

  return (
    <div style={{ flex: 1, display: "flex", position: "relative" }}>
      {/* <ContextMenu /> */}

      <LayerhubCanvas
        config={{
          background: "#f1f2f6",
          frameMargin: 20,
          shadow: {
            blur: 4,
            color: "#fcfcfc",
            offsetX: 0,
            offsetY: 0,
          },
        }}
      />
    </div>
  )
}

export default Canvas
