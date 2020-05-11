import React, { useEffect, useState } from 'react'
import Heart from './Heart'

function generateHearts(livesTotal: number, livesRemaining: number) {
  const usedLives = Array(livesTotal - livesRemaining)
    .fill(0)
    .map(() => ({ full: false }))

  const remainingLives = Array(livesRemaining)
    .fill(0)
    .map(() => ({ full: true }))

  return [...usedLives, ...remainingLives]
}

interface Props {
  /** The number of lives total */
  livesTotal: number
  /** The number of lives remaining */
  livesRemaining: number
}

/**
 * Displays multiple `<Heart />` components.
 */
const Hearts = ({ livesTotal, livesRemaining }: Props) => {
  const [hearts, setHearts] = useState(
    generateHearts(livesTotal, livesRemaining),
  )

  useEffect(() => {
    setHearts(generateHearts(livesTotal, livesRemaining))
  }, [livesTotal, livesRemaining])

  return (
    <div className="flex w-64 mx-auto">
      {hearts.map((h: any, ix: number) => {
        return <Heart key={ix} full={h.full} />
      })}
    </div>
  )
}

export default Hearts
