import React from "react"
import useAppContext from "~/hooks/useAppContext"
import panelItems from "./panel-items"
import useIsSidebarOpen from "~/hooks/useIsSidebarOpen"

interface State {
  panel: string
}

const PanelsList = () => {
  const [state, setState] = React.useState<State>({ panel: "Texto" })

  const isSidebarOpen = useIsSidebarOpen()
  const { activePanel, activeSubMenu } = useAppContext()

  React.useEffect(() => {
    setState({ panel: activePanel })
  }, [activePanel])

  React.useEffect(() => {
    if (activeSubMenu) {
      setState({ panel: activeSubMenu })
    } else {
      setState({ panel: activePanel })
    }
  }, [activeSubMenu])

  // @ts-ignore
  const Component = panelItems[state.panel]

  return (
    <div
      className="bg-white flex flex-none border-r border-solid border-gray-200 overflow-hidden transition-all ease-in-out duration-100"
      id="EditorPanelItem"
      style={{
        width: isSidebarOpen ? "306px" : "0px",
      }}
    >
      {Component && <Component />}
    </div>
  )
}

export default PanelsList
