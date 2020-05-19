import React from 'react'

interface Props {
  /** The child component to render */
  children: JSX.Element
  /** The CSS classname */
  className?: any
  /** The margin to apply */
  margin: string
  /** The CSS style properties */
  style?: React.CSSProperties
}

/**
 * Displays an overlay on the Trivia Screen.
 */
const TriviaOverlay = ({ children, className, margin, style }: Props) => {
  return (
    <div
      className={`absolute flex ${className}`}
      style={{
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
