import { styled, useStyletron } from "baseui"
import { Block } from "baseui/block"
import { useTranslation } from "react-i18next"
import Icons from "~/components/Icons"
import Scrollable from "~/components/Scrollable"
import { BASE_ITEMS } from "~/constants/app-options"
import useAppContext from "~/hooks/useAppContext"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"

const Container = styled("div", (props) => ({
  width: "80px",
  backgroundColor: props.$theme.colors.primary100,
  display: "flex",
  flex: "none",
}))

const PanelsList = () => {
  const { activePanel } = useAppContext()
  const { t } = useTranslation("editor")

  return (
    <Container>
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
    </Container>
  )
}

const PanelListItem = ({ label, icon, activePanel, name }: any) => {
  const { setActivePanel } = useAppContext()
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const [css, theme] = useStyletron()
  // @ts-ignore
  const Icon = Icons[icon]
  return (
    <Block
      id="EditorPanelList"
      onClick={() => {
        setIsSidebarOpen(true)
        setActivePanel(name)
      }}
      $style={{
        width: "80px",
        height: "80px",
        backgroundColor: name === activePanel ? theme.colors.white : theme.colors.primary100,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        fontFamily: "Poppins",
        fontWeight: 500,
        fontSize: "0.8rem",
        userSelect: "none",
        transition: "all 0.5s",
        gap: "0.1rem",
        ":hover": {
          cursor: "pointer",
          backgroundColor: theme.colors.white,
          transition: "all 1s",
        },
      }}
    >
      <Icon size={24} />
      <div>{label}</div>
    </Block>
  )
}

export default PanelsList