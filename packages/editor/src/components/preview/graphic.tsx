import React from "react"
import { useEditor } from "@layerhub-io/react"

const Graphic = () => {
  const editor = useEditor()
  const [loading, setLoading] = React.useState(true)
  const [state, setState] = React.useState({
    image: "",
  })

  const makePreview = React.useCallback(async () => {
    if (editor) {
      const template = editor.scene.exportToJSON()
      const image = (await editor.renderer.render(template)) as string
      setState({ image })
      setLoading(false)
    }
  }, [editor])

  React.useEffect(() => {
    makePreview()
  }, [editor])

  return (
    <div className="flex-1 flex items-center justify-center p-20">
      {!loading && <img width="auto" height="100%" src={state.image} />}
    </div>
  )
}

export default Graphic
