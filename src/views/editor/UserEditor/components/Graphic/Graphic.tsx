import { styled } from "baseui"
import { Theme } from "baseui/theme"

const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  background: $theme.colors.white,
  width: "80px",
}))

const Graphic = () => {
  return <Container />
}

export default Graphic
