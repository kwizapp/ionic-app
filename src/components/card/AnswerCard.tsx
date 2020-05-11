import React from 'react'

interface Props {
  /** The movie title */
  title: string
  /** The onClick handler function */
  onClick: (title: string) => void
}

/**
 * Card Component displayed on the Question Screen
 */
const AnswerCard = ({ title, onClick }: Props) => {
  return (
    <div
      onClick={() => onClick(title)}
      className="flex m-2 border border-gray-100 rounded-md shadow-lg h-32 border text-left"
    >
      <div className="p-8 flex items-center">
        <h2 className="text-xl font-medium tracking-wide">{title}</h2>
      </div>
    </div>
  )
}

export default AnswerCard
