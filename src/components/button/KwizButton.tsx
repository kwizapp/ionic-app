import React from 'react'
import niceColors from '../../colors'

interface Props {
  children: string
  onClick: () => void
  width?: number
}

const KwizButton = ({ onClick, children, width }: Props) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: niceColors[1],
      }}
      className={`mx-2 bg-teal-300 hover:bg-teal-400 text-white  py-1 px-4 border-b-4 border-teal-700 hover:border-teal-500 rounded w-${width}`}
    >
      {children}
    </button>
  )
}

export default KwizButton
