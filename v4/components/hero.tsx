"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text3D, OrbitControls } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type * as THREE from "three"

function AnimatedText3D() {
  const textRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2
      textRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.1 + 0.1
    }
  })

  return (
    <Text3D
      ref={textRef}
      font="/fonts/Inter_Bold.json"
      size={0.5}
      height={0.1}
      curveSegments={12}
      bevelEnabled
      bevelThickness={0.02}
      bevelSize={0.02}
      bevelOffset={0}
      bevelSegments={5}
      position={[-2, 0, 0]}
    >
      HUSAN
      <meshStandardMaterial color="#00ff00" />
    </Text3D>
  )
}

export default function Hero() {
  return (
    <section id="home" className="min-h-screen pt-20 flex flex-col justify-center relative">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-sm font-medium text-green-500 mb-2"
          >
            FULL STACK WEB DEVELOPER
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Suyunov Husan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-gray-300 text-lg mb-8 max-w-lg"
          >
            Building modern web applications with cutting-edge technologies. Transforming ideas into exceptional digital
            experiences.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Button className="bg-green-500 hover:bg-green-600 text-black font-medium px-6 py-6" size="lg">
              View Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="border-green-500 text-green-500 hover:bg-green-500/10 font-medium px-6 py-6"
              size="lg"
            >
              Contact Me
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="h-[400px] md:h-[500px]"
        >
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <AnimatedText3D />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.2,
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          className="text-green-500 text-sm"
        >
          Scroll Down
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.4,
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          className="w-1 h-10 bg-gradient-to-b from-green-500 to-transparent mt-2"
        />
      </div>
    </section>
  )
}
