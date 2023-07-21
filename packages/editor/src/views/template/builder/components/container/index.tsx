import React from "react"
import { Block } from "baseui/block"

const Container = ({ children }: { children: React.ReactNode }) => {
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
      {children}
    </Block>
  )
}

export default Container
