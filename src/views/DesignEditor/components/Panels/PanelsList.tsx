import { useStyletron, styled } from "baseui"
import { BASE_ITEMS, VIDEO_PANEL_ITEMS } from "~/constants/app-options"
import useAppContext from "~/hooks/useAppContext"
import Icons from "~/components/Icons"
import { useTranslation } from "react-i18next"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import useEditorType from "~/hooks/useEditorType"
import Scrollable from "~/components/Scrollable"
import { Block } from "baseui/block"
import default_avator from "./default_avator.png"
import Avatar from "~/components/Logo/avatar.png"

const Container = styled("div", (props) => ({
  width: "80px",
  backgroundColor: props.$theme.colors.primary100,
  display: "flex",
  flex: "none",
}))

const PanelsList = () => {
  const { activePanel } = useAppContext()
  const { t } = useTranslation("editor")
  const editorType = useEditorType()
  const PANEL_ITEMS = editorType === "VIDEO" ? VIDEO_PANEL_ITEMS : BASE_ITEMS
  const goPersonal = () => {
    window.location.href = "/personal"
    // location.replace('/personal')
  }
  return (
    <Container className="home_panel">
      <Scrollable autoHide={true}>
        {PANEL_ITEMS.map((panelListItem:any) => (
          <PanelListItem
            // label={t(`panels.panelsList.${panelListItem.id}`)}
            name={panelListItem.name}
            cnname={panelListItem.cnname}
            key={panelListItem.name}
            icon={panelListItem.name}
            activePanel={activePanel}
          />
        ))}

        <div className="header_avatar">
          <img onClick={goPersonal} src={Avatar} alt="" />
        </div>
      </Scrollable>
    </Container>
  )
}

const PanelListItem = ({ cnname, label, icon, activePanel, name }: any) => {
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
      <div>{cnname}</div>
    </Block>
  )
}

export default PanelsList
