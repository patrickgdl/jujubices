import { useActiveObject, useEditor } from "@layerhub-io/react"
import { ILayer } from "@layerhub-io/types"
import { styled } from "baseui"
import React from "react"
import useAppContext from "~/hooks/useAppContext"
import getSelectionType from "~/utils/get-selection-type"

import Items from "./Items"

const DEFAULT_TOOLBOX = "Canvas"

interface ToolboxState {
  toolbox: string
}

const Container = styled("div", (props) => ({
  boxShadow: "rgb(0 0 0 / 15%) 0px 1px 1px",
  height: "50px",
  display: "flex",
}))

const Toolbox = () => {
  const [state, setState] = React.useState<ToolboxState>({ toolbox: "Texto" })

  const editor = useEditor()
  const { setActiveSubMenu } = useAppContext()
  const activeObject = useActiveObject() as ILayer

  React.useEffect(() => {
    const selectionType = getSelectionType(activeObject)

    if (selectionType) {
      if (selectionType.length > 1) {
        setState({ toolbox: "Multiple" })
      } else {
        setState({ toolbox: selectionType[0] })
      }
    } else {
      setState({ toolbox: DEFAULT_TOOLBOX })
      setActiveSubMenu("")
    }
  }, [activeObject])

  React.useEffect(() => {
    let watcher = async () => {
      if (activeObject) {
        // @ts-ignore
        const selectionType = getSelectionType(activeObject) as any

        if (selectionType.length > 1) {
          setState({ toolbox: "Multiple" })
        } else {
          setState({ toolbox: selectionType[0] })
        }
      }
    }

    if (editor) {
      editor.on("history:changed", watcher)
    }

    return () => {
      if (editor) {
        editor.off("history:changed", watcher)
      }
    }
  }, [editor, activeObject])

  // @ts-ignore
  const Component = Items[state.toolbox]

  return (
    <Container>
      {Component ? (
        <Component />
      ) : (
        <div style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center" }}>
          {state.toolbox}
        </div>
      )}
    </Container>
  )
}

export default Toolbox
