import React, { useEffect, useRef } from "react"
import ResizeObserver from "resize-observer-polyfill"
import useAppContext from "~/hooks/useAppContext"
import { getFonts } from "~/store/slices/fonts/actions"
import { getImageKitBackgrounds } from "~/store/slices/imagekit/actions"
import { useAppDispatch } from "~/store/store"

const Container = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch()
  const { isMobile, setIsMobile } = useAppContext()

  const containerRef = useRef<HTMLDivElement>(null)

  const updateMediaQuery = (value: number) => {
    if (!isMobile && value >= 800) {
      setIsMobile(false)
    } else if (!isMobile && value < 800) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  useEffect(() => {
    const containerElement = containerRef.current!
    const containerWidth = containerElement.clientWidth

    updateMediaQuery(containerWidth)

    const resizeObserver = new ResizeObserver((entries) => {
      const { width = containerWidth } = (entries[0] && entries[0].contentRect) || {}
      updateMediaQuery(width)
    })
    resizeObserver.observe(containerElement)

    return () => {
      if (containerElement) {
        resizeObserver.unobserve(containerElement)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(getFonts())
    dispatch(getImageKitBackgrounds())
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </div>
  )
}

export default Container
