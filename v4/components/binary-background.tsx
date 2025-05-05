"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import type * as THREE from "three"
import { random } from "maath"

function BinaryParticles({ count = 5000 }) {
  const ref = useRef<THREE.Points>(null!)
  const sphere = random.inSphere(new Float32Array(count * 3), { radius: 20 })

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#00ff00" size={0.05} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  )
}

export default function BinaryBackground() {
  return (
    <div className="fixed inset-0 bg-black">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <BinaryParticles />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
    </div>
  )
}
