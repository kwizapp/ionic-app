import React from 'react'

interface Props {
  children: JSX.Element
  className?: any
  margin: string
  style?: React.CSSProperties
}

const TriviaOverlay = ({ children, className, margin, style }: Props) => {
  return (
    <div
      className={`absolute flex rounded-md ${className}`}
      style={{
        background: 'rgba(255, 255, 255, 0.85)',
        border: '1px solid #B7B7B7',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        width: `calc(100% - 2 * ${margin})`,
        left: margin,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export default TriviaOverlay
