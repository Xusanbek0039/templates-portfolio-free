"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)

    const handleLinkHoverStart = () => setLinkHovered(true)
    const handleLinkHoverEnd = () => setLinkHovered(false)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    const links = document.querySelectorAll("a, button")
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkHoverStart)
      link.addEventListener("mouseleave", handleLinkHoverEnd)
    })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)

      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkHoverStart)
        link.removeEventListener("mouseleave", handleLinkHoverEnd)
      })
    }
  }, [])

  const cursorVariants = {
    default: {
      height: 32,
      width: 32,
      x: position.x - 16,
      y: position.y - 16,
      backgroundColor: "rgba(0, 255, 0, 0.2)",
      mixBlendMode: "difference" as const,
    },
    clicked: {
      height: 24,
      width: 24,
      x: position.x - 12,
      y: position.y - 12,
      backgroundColor: "rgba(0, 255, 0, 0.6)",
    },
    hovered: {
      height: 48,
      width: 48,
      x: position.x - 24,
      y: position.y - 24,
      backgroundColor: "rgba(0, 255, 0, 0.4)",
      mixBlendMode: "difference" as const,
    },
  }

  const cursorDotVariants = {
    default: {
      height: 6,
      width: 6,
      x: position.x - 3,
      y: position.y - 3,
      backgroundColor: "#00ff00",
    },
    clicked: {
      height: 4,
      width: 4,
      x: position.x - 2,
      y: position.y - 2,
    },
  }

  return (
    <>
      <motion.div
        className="cursor-ring fixed top-0 left-0 rounded-full pointer-events-none z-50"
        variants={cursorVariants}
        animate={linkHovered ? "hovered" : clicked ? "clicked" : "default"}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="cursor-dot fixed top-0 left-0 rounded-full pointer-events-none z-50"
        variants={cursorDotVariants}
        animate={clicked ? "clicked" : "default"}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <style jsx global>{`
        body {
          cursor: none;
        }
      `}</style>
    </>
  )
}
