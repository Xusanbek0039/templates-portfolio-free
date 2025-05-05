"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all")

  const filters = [
    { id: "all", name: "All" },
    { id: "web", name: "Web Development" },
    { id: "mobile", name: "Mobile Apps" },
    { id: "ui", name: "UI/UX Design" },
  ]

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform with payment integration, user authentication, and product management. Built with Next.js, Node.js, and MongoDB.",
      image: "/placeholder.svg?height=300&width=500",
      category: "web",
      technologies: ["Next.js", "Node.js", "MongoDB", "Stripe"],
      demoLink: "#",
      githubLink: "#",
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates, team workspaces, and progress tracking. Built with React, Firebase, and Tailwind CSS.",
      image: "/placeholder.svg?height=300&width=500",
      category: "web",
      technologies: ["React", "Firebase", "Tailwind CSS", "Redux"],
      demoLink: "#",
      githubLink: "#",
    },
    {
      id: 3,
      title: "Mobile Fitness Tracker",
      description:
        "A cross-platform mobile app for tracking workouts, nutrition, and health metrics. Built with React Native and Firebase.",
      image: "/placeholder.svg?height=300&width=500",
      category: "mobile",
      technologies: ["React Native", "Firebase", "Redux", "Expo"],
      demoLink: "#",
      githubLink: "#",
    },
    {
      id: 4,
      title: "Portfolio Website Design",
      description:
        "A modern portfolio website design for a photographer with gallery features and contact form. Designed with Figma and implemented with React.",
      image: "/placeholder.svg?height=300&width=500",
      category: "ui",
      technologies: ["Figma", "React", "Framer Motion", "Tailwind CSS"],
      demoLink: "#",
      githubLink: "#",
    },
    {
      id: 5,
      title: "Real-time Chat Application",
      description:
        "A real-time messaging platform with private chats, group channels, and file sharing. Built with Socket.io, Express, and React.",
      image: "/placeholder.svg?height=300&width=500",
      category: "web",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
      demoLink: "#",
      githubLink: "#",
    },
    {
      id: 6,
      title: "Restaurant Booking System",
      description:
        "An online reservation system for restaurants with table management, customer profiles, and automated reminders. Built with Next.js and PostgreSQL.",
      image: "/placeholder.svg?height=300&width=500",
      category: "web",
      technologies: ["Next.js", "PostgreSQL", "Tailwind CSS", "Stripe"],
      demoLink: "#",
      githubLink: "#",
    },
  ]

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.category === activeFilter)

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-green-500">Projects</span>
          </motion.h2>
          <motion.div variants={fadeIn} className="w-20 h-1 bg-green-500 mx-auto mb-8" />
          <motion.p variants={fadeIn} className="max-w-2xl mx-auto text-gray-300">
            Here are some of my recent projects. Each project reflects my skills and expertise in different areas of web
            development.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              variants={fadeIn}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === filter.id ? "bg-green-500 text-black" : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
              onClick={() => setActiveFilter(filter.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.name}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-gray-900 border-gray-800 overflow-hidden h-full flex flex-col">
                  <div className="relative overflow-hidden aspect-video">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 opacity-60" />
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-white">{project.title}</CardTitle>
                    <CardDescription className="text-gray-400">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-800 rounded-md text-xs font-medium text-green-400">
                        {tech}
                      </span>
                    ))}
                  </CardContent>
                  <CardFooter className="flex justify-between mt-auto">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-green-500 hover:text-green-400 hover:bg-green-500/10 gap-1"
                      asChild
                    >
                      <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        Demo
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-green-500 hover:text-green-400 hover:bg-green-500/10 gap-1"
                      asChild
                    >
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        Code
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="text-center mt-12"
        >
          <Button className="bg-green-500 hover:bg-green-600 text-black font-medium px-6" size="lg" asChild>
            <a href="#" className="inline-flex items-center">
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
