"use client"

import { motion } from "framer-motion"
import { Code, Globe, Server } from "lucide-react"

export default function About() {
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
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="text-green-500">Me</span>
          </motion.h2>
          <motion.div variants={fadeIn} className="w-20 h-1 bg-green-500 mx-auto mb-8" />
          <motion.p variants={fadeIn} className="max-w-2xl mx-auto text-gray-300">
            I'm a passionate Full Stack Web Developer with expertise in building modern, responsive, and user-friendly
            web applications.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
            className="relative"
          >
            <div className="aspect-square rounded-lg overflow-hidden border-2 border-green-500 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-green-900/30 z-10" />
              <img
                src="/placeholder.svg?height=500&width=500"
                alt="Suyunov Husan"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 w-40 h-40 border-2 border-green-500 rounded-lg" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.h3 variants={fadeIn} className="text-2xl font-bold mb-4">
              Full Stack Web Developer
            </motion.h3>
            <motion.p variants={fadeIn} className="text-gray-300 mb-6">
              With over 5 years of experience in web development, I specialize in creating robust and scalable
              applications using modern technologies and best practices.
            </motion.p>

            <motion.div variants={staggerContainer} className="grid gap-6">
              <motion.div variants={fadeIn} className="flex items-start gap-4">
                <div className="p-3 bg-green-500/10 rounded-lg text-green-500">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Frontend Development</h4>
                  <p className="text-gray-400 text-sm">
                    Creating responsive and interactive user interfaces with React, Next.js, and modern CSS frameworks.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="flex items-start gap-4">
                <div className="p-3 bg-green-500/10 rounded-lg text-green-500">
                  <Server className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Backend Development</h4>
                  <p className="text-gray-400 text-sm">
                    Building robust APIs and server-side applications with Node.js, Express, and various databases.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="flex items-start gap-4">
                <div className="p-3 bg-green-500/10 rounded-lg text-green-500">
                  <Code className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Full Stack Solutions</h4>
                  <p className="text-gray-400 text-sm">
                    Delivering end-to-end web applications with seamless integration between frontend and backend.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
