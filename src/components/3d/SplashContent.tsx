//@ts-nocheck
import React, { useMemo, useRef } from 'react'
import { useFrame, useLoader, useThree } from 'react-three-fiber'
import * as THREE from 'three'
import { posterAssetLinks } from './posterLinks'

/**
 * Displays floating movies on the canvas
 */
export const SplashContent = () => {
  const NUMBER_OF_MOVIES = 65

  const { viewport } = useThree()
  const groupRef = useRef<THREE.Group>()

  // load some move textures to display on the splash screen

  const textures = useLoader(THREE.TextureLoader, posterAssetLinks)

  const movies = useMemo(
    () =>
      new Array(NUMBER_OF_MOVIES)
        .fill((v: number) => v)
        .map((_, i) => ({
          position: [
            i < 5
              ? 0
              : viewport.width / 2 - Math.random() * viewport.width * 4.0,
            10 - Math.random() * 10,
            -5,
          ],
          factor: 0.4 + Math.random(),
          direction: Math.random() < 0.5 ? -1 : 1, // randomly decide if up or down
        })),
    [],
  )

  useFrame(() => {
    movies.forEach((data, i) => {
      data.position[1] -= (data.factor / 20) * data.direction
      if (data.direction === 1 ? data.position[1] < -50 : data.position[1] > 50)
        data.position = [
          i < 5 ? 0 : viewport.width / 2 - Math.random() * viewport.width,
          20 * data.direction,
          data.position[2],
        ]
      const { position, factor } = data

      if (groupRef.current) {
        groupRef.current.children[i].position.set(
          position[0],
          position[1],
          position[2],
        )

        groupRef.current.children[i].scale.set(
          1 + factor,
          1 + factor,
          1 + factor,
        )
        groupRef.current.children[i].updateMatrix()
      }
    })
  })

  return (
    <>
      {/* back plane */}
      <mesh position={[0, 0, -6]}>
        <planeBufferGeometry attach="geometry" args={[100, 100]} />
        <meshPhysicalMaterial
          attach="material"
          color={new THREE.Color('#173753')}
        />
      </mesh>

      {/* movies */}
      <group ref={groupRef}>
        {movies.map((cube, i) => {
          return (
            <mesh key={i}>
              <boxBufferGeometry attach="geometry" args={[1, 1.51, 0.2]} />
              <meshPhysicalMaterial
                reflectivity={0}
                map={textures[Math.floor(Math.random() * textures.length)]}
                attach="material"
              />
            </mesh>
          )
        })}
      </group>
    </>
  )
}
