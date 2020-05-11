import React from 'react'
import classNames from 'classnames'

interface Props {
  /** The movie title */
  title: string
  /** The url to the movie poster */
  posterPath?: string
  /** The onClick handler function */
  onClick?: (title: string) => void
}

/**
 * Card Component displayed on the Bonus Question Screen
 */
const MovieCard = ({ title, posterPath, onClick }: Props) => {
  return (
    <div
      onClick={onClick && (() => onClick(title))}
      className="flex m-2 border border-gray-100 rounded-md shadow-lg"
    >
      {posterPath && <img className="w-20 rounded-md" src={posterPath} />}

      <div
        className={classNames('flex items-center', posterPath ? 'p-4' : 'p-8')}
      >
        <h2 className="font-sans font-medium tracking-wide text-md">{title}</h2>
      </div>
    </div>
  )
}

export default MovieCard
