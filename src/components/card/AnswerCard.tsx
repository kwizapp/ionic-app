import React from 'react'

interface Props {
  /** The movie title */
  title: string
  /** The onClick handler function */
  onClick: (title: string) => void
  /** The background color of the card */
  backgroundColor?: string
}

/**
 * Card Component displayed on the Question Screen
 */
const AnswerCard = ({ title, onClick, backgroundColor }: Props) => {
  return (
    <div
      onClick={() => onClick(title)}
      className="flex m-2 border rounded-md shadow-2xl h-32 border text-left"
      style={{
        backgroundColor,
      }}
    >
      <div className="p-8 flex items-center">
        <h2 className="text-xl text-white font-medium tracking-wide">
          {title}
        </h2>
      </div>
    </div>
  )
}

export default AnswerCard
