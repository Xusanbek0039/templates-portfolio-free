"use client"

import { motion } from "framer-motion"
import { ArrowUp } from "lucide-react"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <footer className="py-10 bg-black/50 backdrop-blur-md relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h3 className="text-2xl font-bold text-green-500 mb-2">Suyunov Husan</h3>
            <p className="text-gray-400">Full Stack Web Developer</p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-gray-400 mb-2">&copy; {new Date().getFullYear()} All Rights Reserved</p>
            <p className="text-gray-500 text-sm">Designed & Built by Suyunov Husan</p>
          </div>
        </motion.div>
      </div>

      <button
        onClick={scrollToTop}
        className="absolute right-6 bottom-6 p-3 bg-green-500 text-black rounded-full hover:bg-green-600 transition-colors"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  )
}
