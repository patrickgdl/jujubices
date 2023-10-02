import { useTranslation } from "react-i18next"
import Icons from "~/components/icons"
import Scrollable from "~/components/scrollable"
import { BASE_ITEMS } from "~/constants/app-options"
import useAppContext from "~/hooks/useAppContext"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import { cn } from "~/utils/cn"

const PanelsList = () => {
  const { activePanel } = useAppContext()
  const { t } = useTranslation("editor")

  return (
    <div className="w-20 bg-gray-100 display flex flex-none">
      <Scrollable autoHide={true}>
        {BASE_ITEMS.map((panelListItem) => (
          <PanelListItem
            label={t(`panels.panelsList.${panelListItem.id}`)}
            name={panelListItem.name}
            key={panelListItem.name}
            icon={panelListItem.name}
            activePanel={activePanel}
          />
        ))}
      </Scrollable>
    </div>
  )
}

const PanelListItem = ({ label, icon, activePanel, name }: any) => {
  const { setActivePanel } = useAppContext()
  const setIsSidebarOpen = useSetIsSidebarOpen()

  // @ts-ignore
  const Icon = Icons[icon]

  return (
    <div
      id="EditorPanelList"
      onClick={() => {
        setIsSidebarOpen(true)
        setActivePanel(name)
      }}
      className={cn(
        "w-20 h-20 flex items-center flex-col justify-center font-medium text-sm gap-1 select-none transition-all hover:cursor-pointer hover:bg-gray-200 hover:transition-all hover:text-black",
        activePanel === name ? "bg-white" : "bg-gray-100"
      )}
    >
      <Icon size={24} />
      <div>{label}</div>
    </div>
  )
}

export default PanelsList
