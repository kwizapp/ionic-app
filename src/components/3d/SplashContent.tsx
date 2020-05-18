import niceColors from 'nice-color-palettes'
import React, { useMemo, useRef } from 'react'
import { useFrame, useThree } from 'react-three-fiber'
import * as THREE from 'three'

export const SplashContent = () => {
  const NUMBER_OF_CUBES = 20
  const { viewport, clock } = useThree()

  const colors = useMemo(() => {
    const array = new Float32Array(NUMBER_OF_CUBES * 3)
    const color = new THREE.Color()
    for (let i = 0; i < NUMBER_OF_CUBES; i++)
      color
        .set(niceColors[17][Math.floor(Math.random() * 5)])
        .convertSRGBToLinear()
        .toArray(array, i * 3)
    return array
  }, [NUMBER_OF_CUBES])

  const model = useRef<any>()

  const dummy = useMemo(() => new THREE.Object3D(), [])
  const cubes = useMemo(
    () =>
      new Array(NUMBER_OF_CUBES)
        .fill((v: number) => v)
        .map((_, i) => ({
          position: [
            i < 5 ? 0 : viewport.width / 2 - Math.random() * viewport.width * 2,
            10 - Math.random() * 10,
            -5,
          ],
          factor: 0.2 + Math.random(),
          direction: Math.random() < 0.5 ? -1 : 1,
          rotation: [
            Math.sin(Math.random()) * Math.PI,
            Math.sin(Math.random()) * Math.PI,
            Math.cos(Math.random()) * Math.PI,
          ],
        })),
    [],
  )

  useFrame(() => {
    cubes.forEach((data, i) => {
      const t = clock.getElapsedTime()
      data.position[1] -= (data.factor / 5) * data.direction
      if (data.direction === 1 ? data.position[1] < -50 : data.position[1] > 50)
        data.position = [
          i < 5 ? 0 : viewport.width / 2 - Math.random() * viewport.width,
          50 * data.direction,
          data.position[2],
        ]
      const { position, rotation, factor } = data

      dummy.position.set(position[0], position[1], position[2])
      dummy.rotation.set(
        rotation[0] + t * factor,
        rotation[1] + t * factor,
        rotation[2] + t * factor,
      )
      dummy.scale.set(1 + factor, 1 + factor, 1 + factor)
      dummy.updateMatrix()
      model.current.setMatrixAt(i, dummy.matrix)
    })
    model.current.instanceMatrix.needsUpdate = true
  })

  const x = (
    //@ts-ignore
    <instancedBufferAttribute
      attachObject={['attributes', 'color']}
      args={[colors, 3]}
    />
  )

  return (
    <>
      <instancedMesh
        ref={model}
        args={[null as any, null as any, cubes.length]}
      >
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]}>
          {x}
        </boxBufferGeometry>
        <meshPhongMaterial attach="material" vertexColors={true} />
      </instancedMesh>
      <pointLight position={[5, 10, 1]} />
    </>
  )
}
