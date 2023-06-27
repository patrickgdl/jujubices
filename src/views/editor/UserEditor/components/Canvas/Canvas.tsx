import { Canvas as LayerhubCanvas } from "@layerhub-io/react"

const Canvas = () => {
  return (
    <div style={{ flex: 1, display: "flex", position: "relative" }}>
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
