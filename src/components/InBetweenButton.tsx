import React from 'react'

interface InBetweenButtonProps {
  ix: number
  scoreQuestion: (ix: number) => void
}

export const InBetweenButton = ({
  scoreQuestion,
  ix,
}: InBetweenButtonProps) => {
  return (
    <div className="absolute" style={{ top: '-2em' }}>
      <button
        className="text-xs bg-teal-500 hover:bg-teal-400 text-white font-bold py-3 px-4 border-b-4 border-teal-700 hover:border-teal-500 rounded-full shadow-sm"
        onClick={() => scoreQuestion(ix)}
      >
        HERE
      </button>
    </div>
  )
}
