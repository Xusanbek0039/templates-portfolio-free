"use client"

import { motion } from "framer-motion"

export default function Skills() {
  const skills = [
    { name: "HTML/CSS", level: 95 },
    { name: "JavaScript", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "React", level: 90 },
    { name: "Next.js", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "Express", level: 85 },
    { name: "MongoDB", level: 75 },
    { name: "PostgreSQL", level: 80 },
    { name: "GraphQL", level: 70 },
    { name: "Docker", level: 65 },
    { name: "AWS", level: 60 },
  ]

  const technologies = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "Redux",
    "Tailwind CSS",
    "GraphQL",
    "Docker",
    "Git",
    "AWS",
    "Firebase",
    "Vercel",
  ]

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
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-green-500">Skills</span>
          </motion.h2>
          <motion.div variants={fadeIn} className="w-20 h-1 bg-green-500 mx-auto mb-8" />
          <motion.p variants={fadeIn} className="max-w-2xl mx-auto text-gray-300">
            I've worked with a variety of technologies in the web development world. Here's an overview of my technical
            skills and expertise.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.h3 variants={fadeIn} className="text-xl font-bold mb-6">
              Technical Proficiency
            </motion.h3>

            <div className="space-y-6">
              {skills.map((skill, index) => (
                <motion.div key={index} variants={fadeIn} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-green-500">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-green-500 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="flex flex-col"
          >
            <motion.h3 variants={fadeIn} className="text-xl font-bold mb-6">
              Technologies & Tools
            </motion.h3>

            <motion.div variants={staggerContainer} className="flex flex-wrap gap-3">
              {technologies.map((tech, index) => (
                <motion.span
                  key={index}
                  variants={fadeIn}
                  className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-sm font-medium text-green-400 hover:bg-green-500/20 transition-colors cursor-default"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            <motion.div variants={fadeIn} className="mt-12">
              <h3 className="text-xl font-bold mb-6">Education & Certifications</h3>
              <div className="space-y-4">
                <div className="border-l-2 border-green-500 pl-4 py-1">
                  <div className="text-green-500 text-sm">2018 - 2022</div>
                  <div className="font-medium">Bachelor of Science in Computer Science</div>
                  <div className="text-gray-400 text-sm">University Name</div>
                </div>
                <div className="border-l-2 border-green-500 pl-4 py-1">
                  <div className="text-green-500 text-sm">2022</div>
                  <div className="font-medium">Full Stack Web Development</div>
                  <div className="text-gray-400 text-sm">Certification Program</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
