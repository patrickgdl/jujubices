import { Block } from "baseui/block"
import React from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Scrollable from "~/components/scrollable"
import { getTemplates } from "~/store/slices/templates/actions"
import { selectTemplates } from "~/store/slices/templates/selectors"
import { useAppDispatch } from "~/store/store"

import { ImageItem } from "./image-item"
import useUserRole from "~/hooks/useUserRole"

const NEXT_ROUTE = {
  admin: "/editor",
  user: "/template",
} as { [key: string]: string }

const Templates = () => {
  const role = useUserRole()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { templates } = useSelector(selectTemplates)

  React.useEffect(() => {
    dispatch(getTemplates())
  }, [])

  return (
    <Block
      $style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#FFFFFF",
        fontFamily: "Poppins",
      }}
    >
      <Block $style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Block
          $style={{
            display: "flex",
            alignItems: "center",
            fontWeight: 500,
            padding: "1.5rem",
          }}
        >
          <Block>Templates</Block>
        </Block>

        <Scrollable>
          <Block padding="0 1.5rem">
            <div style={{ display: "grid", gap: "8px", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
              {templates.map(({ uuid, template }, index) => {
                console.log(template)
                const parsed = JSON.parse(template as string)
                console.log(parsed)
                const { preview } = parsed

                return (
                  <React.Fragment key={index}>
                    {preview && (
                      <ImageItem onClick={() => navigate(`${NEXT_ROUTE[role]}/${uuid}`)} preview={preview.src} />
                    )}
                  </React.Fragment>
                )
              })}
            </div>
          </Block>
        </Scrollable>
      </Block>
    </Block>
  )
}

export default Templates