import { Block } from "baseui/block"
import React from "react"
import { useSelector } from "react-redux"
import Scrollable from "~/components/Scrollable"
import { selectTemplates } from "~/store/slices/templates/selectors"

import { ImageItem } from "./ImageItem"
import { useNavigate } from "react-router-dom"

const Templates = () => {
  const navigate = useNavigate()
  const { templates } = useSelector(selectTemplates)

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
              {templates.map(({ id, template }, index) => {
                const parsed = JSON.parse(template as string)
                const { preview } = parsed

                return (
                  <React.Fragment key={index}>
                    {preview && <ImageItem onClick={() => navigate(`/editor/${id}`)} preview={preview.src} />}
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
