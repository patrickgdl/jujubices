import React from "react"

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="h-screen w-screen flex flex-col bg-white">{children}</div>
}

export default Container
