// @ts-nocheck
import { LightTheme, ThemeProvider } from "baseui"
import { Button, KIND } from "baseui/button"
import { Drawer, SIZE } from "baseui/drawer"
import { nanoid } from "nanoid"
import React from "react"
import { useSelector } from "react-redux"

import { addPage } from "./store/slices/design-editor/actions"
import { selectPages } from "./store/slices/design-editor/selectors"
import { useAppDispatch } from "./store/store"

const Pages = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  const dispatch = useAppDispatch()
  const pages = useSelector(selectPages)

  const handleAddPage = () => {
    dispatch(
      addPage({
        id: nanoid(),
        name: "New page",
      })
    )
  }

  return (
    <ThemeProvider theme={LightTheme}>
      <Button
        onClick={() => setIsOpen(true)}
        kind={KIND.secondary}
        $style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          zIndex: 1,
          display: isOpen ? "none" : "block",
        }}
      >
        Pages
      </Button>
      <Drawer size={SIZE.auto} isOpen={isOpen} autoFocus onClose={() => setIsOpen(false)}>
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "grid", gap: "1rem", padding: "1rem 0" }}>
            {pages.map((page, index) => {
              return (
                <div
                  style={{
                    width: "180px",
                    height: "60px",
                    border: "1px solid gray",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  key={page.id}
                >
                  Page {index}
                </div>
              )
            })}
          </div>

          <Button onClick={handleAddPage}>Add Page</Button>
        </div>
      </Drawer>
    </ThemeProvider>
  )
}

export default Pages
