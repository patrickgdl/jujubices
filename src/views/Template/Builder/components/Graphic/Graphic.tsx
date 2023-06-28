import { styled } from "baseui"
import { Theme } from "baseui/theme"

const Graphic = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  background: $theme.colors.white,
  width: "80px",
}))

export default Graphic
