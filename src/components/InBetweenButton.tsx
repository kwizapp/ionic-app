import React from 'react'

interface InBetweenButtonProps {
  ix: number
  scoreQuestion: (ix: number) => void
  backgroundColor: string
}

export const InBetweenButton = ({
  scoreQuestion,
  ix,
  backgroundColor,
}: InBetweenButtonProps) => {
  return (
    <div className="absolute" style={{ top: '-2em' }}>
      <button
        className="text-xs text-white font-bold py-3 px-4 border-b-4  rounded-full shadow-sm bg-teal-700"
        style={{
          backgroundColor: backgroundColor,
          borderColor: 'rgba(44, 122, 123, 1)',
        }}
        onClick={() => scoreQuestion(ix)}
      >
        HERE
      </button>
    </div>
  )
}
