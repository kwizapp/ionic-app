import React from 'react'
import { Canvas } from 'react-three-fiber'

import { SplashContent } from './SplashContent'

const SplashContainer = () => {
  return (
    <>
      <Canvas style={{ backgroundColor: '#173753ff' }}>
        <SplashContent />
        <hemisphereLight intensity={0.35} />
        <spotLight
          position={[30, 0, 30]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
          shadow-mapSize-width={256}
          shadow-mapSize-height={256}
        />
        <pointLight position={[-30, 0, -30]} intensity={0.5} />
      </Canvas>
      <>
        <div className="text-white absolute text-9xl p-8 top-8">Kwiz</div>
        <div className="text-white absolute text-xl font-light p-8 ml-12 top-40">
          test your movie knowledge
        </div>
        <div className="text-white absolute top-64 text-xl font-light text-center inset-0">
          press screen to start
        </div>
      </>
    </>
  )
}

export default SplashContainer
