import React from 'react'

interface Props {
  secondsRemaining?: number
}

const Timer = ({ secondsRemaining }: Props) => {
  return (
    <div className="absolute z-10 flex items-center justify-center w-12 h-12 text-lg bg-white border-4 border-black border-solid rounded-full">
      {secondsRemaining}
    </div>
  )
}

export default Timer
