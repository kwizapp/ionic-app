import React from 'react'

interface Props {
  title: string
  posterPath: string
  onClick: (title: string) => void
}

const MovieCard = ({ title, posterPath, onClick }: Props) => {
  return (
    <div
      onClick={() => onClick(title)}
      className="flex m-2 border border-gray-100 shadow-lg rounded-md"
    >
      <img className="rounded-md w-20" src={posterPath} />
      <div className="p-4 flex items-center">
        <h2 className="font-sans text-md tracking-wide">{title}</h2>
      </div>
    </div>
  )
}

export default MovieCard
