import Common from "./Common"
import Flip from "./Shared/Flip"

const Image = () => {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        padding: "0 12px",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Flip />
      </div>

      <Common />
    </div>
  )
}

export default Image
