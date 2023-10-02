import React from "react"
import useTemplateEditorContext from "~/hooks/useTemplateEditorContext"
import { Input } from "~/ui/input"

interface State {
  name: string
  width: number
}

const TemplateTitle = () => {
  const [state, setState] = React.useState<State>({ name: "Sem título", width: 0 })

  const { currentTemplate, setCurrentTemplate } = useTemplateEditorContext()
  const inputTitleRef = React.useRef(null)
  const spanRef = React.useRef<HTMLDivElement | null>(null)

  const handleInputChange = (name: string) => {
    setState({ ...state, name: name, width: spanRef.current?.clientWidth! })
    setCurrentTemplate({ ...currentTemplate, name })
  }

  React.useEffect(() => {
    const name = currentTemplate.name
    if (name || name === "") {
      spanRef.current!.innerHTML = name
      setState({ ...state, name: name, width: spanRef.current?.clientWidth! + 20 })
    }
  }, [currentTemplate.name])

  React.useEffect(() => {
    setState({ ...state, width: spanRef.current?.clientWidth! + 20 })
  }, [state.name])

  return (
    <div className="flex items-center justify-center opacity-100">
      <div className="flex absolute top-[-10px] left-[50%] w-full">
        <div className="absolute top-[-10px] left-[50%] text-sm font-medium" ref={spanRef}>
          {state.name}
        </div>
      </div>

      <div className={`flex w-[${state.width}px]`}>
        <Input
          className="bg-transparent border-none shadow-none"
          onChange={(e: any) => handleInputChange(e.target.value)}
          value={state.name}
          ref={inputTitleRef}
        />
      </div>
    </div>
  )
}

export default TemplateTitle
