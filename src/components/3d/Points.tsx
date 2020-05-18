import React, { useRef } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'

function DoubleCone() {
  const mesh = useRef<any>()

  useFrame(() => (mesh.current.rotation.y += 0.01))

  return (
    <group ref={mesh} rotation={[0, 0, 0.15]}>
      <mesh position={[0, 1.5, 0]} scale={[3, 3, 3]} ref={mesh}>
        <coneBufferGeometry attach="geometry" args={[0.5, 1, 8]} />
        <meshStandardMaterial flatShading color="#68A7B2" attach="material" />
      </mesh>
      <mesh
        position={[0, -1.5, 0]}
        scale={[3, 3, 3]}
        rotation={[-Math.PI, 0, 0]}
      >
        <coneBufferGeometry attach="geometry" args={[0.5, 1, 8]} />
        <meshStandardMaterial flatShading color="#68A7B2" attach="material" />
      </mesh>
    </group>
  )
}

interface Props {
  points: number
}

const Points = ({ points }: Props) => {
  return (
    <div className="flex items-center">
      <div>
        <Canvas style={{ height: 50, width: 50 }}>
          <pointLight position={[5, 10, 5]} />
          <pointLight position={[5, -10, 5]} />
          <DoubleCone />
        </Canvas>
      </div>
      <div className="font-light">{points}</div>
    </div>
  )
}

export default Points
