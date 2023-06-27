import { styled } from "baseui"

const Panel = styled("div", (props) => ({
  width: "80px",
  backgroundColor: props.$theme.colors.white,
  display: "flex",
  flex: "none",
}))

export default Panel
