import React from 'react'

interface Props {
  title: string
  posterPath?: string
  onClick?: (title: string) => void
}

const MovieCard = ({ title, posterPath, onClick }: Props) => {
  return (
    <div
      onClick={onClick && (() => onClick(title))}
      className="flex m-2 border border-gray-100 rounded-md shadow-lg"
    >
      {posterPath && <img className="w-20 rounded-md" src={posterPath} />}
      <div className="flex items-center p-4">
        <h2 className="font-sans font-medium tracking-wide text-md">{title}</h2>
      </div>
    </div>
  )
}

export default MovieCard
