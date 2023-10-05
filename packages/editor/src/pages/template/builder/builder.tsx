import useImportOrCreateScene from "~/hooks/useImportOrCreateScene"

import Canvas from "./components/canvas"
import Navbar from "./components/navbar"
import LeftBar from "./components/leftbar"
import RightBar from "./components/rightbar"

const Builder = () => {
  useImportOrCreateScene()

  return (
    <div className="h-screen w-screen bg-white">
      <Navbar />

      <div className="grid grid-cols-[300px_1fr_300px] h-full">
        <LeftBar />

        <Canvas />

        <RightBar />
      </div>
    </div>
  )
}

export default Builder
