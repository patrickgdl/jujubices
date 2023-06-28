import React from "react"
import { Block } from "baseui/block"
import { Button } from "baseui/button"
import Images from "~/components/Icons/Images"
import { useNavigate } from "react-router-dom"

const SelectEditor = () => {
  const navigate = useNavigate()
  const [selectedEditor, setSelectedEditor] = React.useState("background")

  return (
    <Block
      $style={{
        height: "100vh",
        width: "100vw",
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Block>
        <Block
          $style={{
            display: "flex",
            gap: "2rem",
          }}
        >
          <Block
            onClick={() => setSelectedEditor("background")}
            $style={{
              height: "180px",
              width: "180px",
              background: selectedEditor === "background" ? "#000000" : "rgb(231, 236, 239)",
              color: selectedEditor === "background" ? "#ffffff" : "#333333",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <Images size={34} />
            <Block>Criar do zero</Block>
          </Block>

          <Block
            onClick={() => setSelectedEditor("template")}
            $style={{
              height: "180px",
              width: "180px",
              background: selectedEditor === "template" ? "#000000" : "rgb(231, 236, 239)",
              color: selectedEditor === "template" ? "#ffffff" : "#333333",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <Images size={36} />
            <Block>Templates</Block>
          </Block>
        </Block>

        <Block $style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
          <Button style={{ width: "180px" }} onClick={() => navigate(`/${selectedEditor}`)}>
            Continuar
          </Button>
        </Block>
      </Block>
    </Block>
  )
}

export default SelectEditor
