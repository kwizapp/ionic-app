import { IonIcon } from '@ionic/react'
import { logoGithub } from 'ionicons/icons'
import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import * as THREE from 'three'

import { SplashContent } from './SplashContent'

/**
 * Light Components for the three scene
 */
const Lights = () => {
  const { camera, scene } = useThree()
  const lightRef = useRef<THREE.SpotLight>()

  const lightTarget = new THREE.Object3D()
  scene.add(lightTarget)

  React.useEffect(() => {
    if (lightRef.current) {
      // initialize spotlight
      lightRef.current.target = lightTarget
    }
  }, [])

  useFrame((state) => {
    // each frame, move the light target by a small amount
    if (lightRef.current) {
      const x =
        Math.sin(state.clock.elapsedTime * 2.0) *
        Math.cos(state.clock.elapsedTime * 0.5)
      const y = Math.sin(state.clock.elapsedTime * 2.0)
      lightRef.current.target.position.set(x, y, 0)
    }
  })

  return (
    <>
      <spotLight
        penumbra={0.1}
        ref={lightRef}
        position={camera.position}
        angle={0.3}
      />
      <ambientLight intensity={0.2} />
    </>
  )
}

/**
 * Main component for the splash screen, holds the canvas and the html overlay
 */
const SplashContainer = () => {
  return (
    <>
      {/* SCENE */}
      <Canvas style={{ backgroundColor: '#173753ff' }}>
        <Suspense fallback={null}>
          <SplashContent />
        </Suspense>
        <Lights />
        <fog attach="fog" args={[0x090b1f, 0, 30]} />
      </Canvas>

      {/* GUI */}
      <>
        <div className="absolute top-0 w-full">
          <div className="text-white px-4  text-7xl m-auto">
            <span style={{ color: '#aedcc0' }}>K</span>
            <span style={{ color: '#7eb09b' }}>w</span>
            <span style={{ color: '#7bd389' }}>i</span>
            <span style={{ color: '#38e4ae' }}>z</span>
          </div>
          <div className="text-white  ml-12 text-xl font-light">
            test your movie knowledge
          </div>
        </div>
        <div className="text-white absolute top-64 text-xl font-light text-center inset-0">
          tap screen to start
        </div>
        <div
          className="absolute bottom-0 right-0 mr-4 mb-2"
          style={{ color: '#38e4ae' }}
        >
          <IonIcon
            size="large"
            icon={logoGithub}
            className="hover:text-teal-500 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              window.open('https://github.com/kwizapp/kwiz', '_blank')
            }}
          />
        </div>
      </>
    </>
  )
}

export default SplashContainer
