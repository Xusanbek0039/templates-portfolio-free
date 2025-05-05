"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ]

  const projectsDropdown = [
    { name: "Web Development", href: "#web-dev" },
    { name: "Mobile Apps", href: "#mobile-apps" },
    { name: "UI/UX Design", href: "#ui-ux" },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: -20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-green-500"
          >
            Suyunov Husan
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="hidden md:flex space-x-8 items-center"
          >
            {navItems.map((item, index) => {
              if (item.name === "Projects") {
                return (
                  <DropdownMenu key={index}>
                    <DropdownMenuTrigger asChild>
                      <motion.button
                        variants={item}
                        className="text-white hover:text-green-400 transition-colors flex items-center gap-1 group"
                      >
                        Projects
                        <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                      </motion.button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-black/80 backdrop-blur-md border-green-500 text-white">
                      {projectsDropdown.map((project, idx) => (
                        <DropdownMenuItem key={idx} className="hover:bg-green-500/20 cursor-pointer">
                          <a href={project.href} className="w-full">
                            {project.name}
                          </a>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              }
              return (
                <motion.a
                  key={index}
                  variants={item}
                  href={item.href}
                  className="text-white hover:text-green-400 transition-colors"
                >
                  {item.name}
                </motion.a>
              )
            })}
            <motion.div variants={item}>
              <Button className="bg-green-500 hover:bg-green-600 text-black font-medium">Resume</Button>
            </motion.div>
          </motion.div>

          {/* Mobile Navigation Toggle */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:hidden"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-green-400"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/90 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-white hover:text-green-400 transition-colors py-2 border-b border-green-500/20"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button className="bg-green-500 hover:bg-green-600 text-black font-medium w-full">Resume</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
