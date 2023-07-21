import { styled } from "baseui"
import { Theme } from "baseui/theme"

import Common from "./common"

const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  background: $theme.colors.white,
}))

const Graphic = () => {
  return (
    <Container>
      <Common />
    </Container>
  )
}

export default Graphic
