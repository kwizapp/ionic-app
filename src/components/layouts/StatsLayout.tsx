import React from 'react'
import { IonPage, IonContent } from '@ionic/react'
import StatsOverlay from '../StatsOverlay'

interface Props {
  /** The ID of component */
  id?: string
  /** The CSS class name */
  className?: string
  /** The child component */
  children: React.ReactNode
  /** The onClick handler function */
  onClick?: () => void
}

/**
 * Basic Layout Component that displays the `<StatsOverlay />` as an overlay.
 */
const StatsLayout = ({ id, className, onClick, children }: Props) => {
  return (
    <IonPage id={id} className={className} onClick={onClick}>
      <IonContent className="text-center">{children}</IonContent>

      <StatsOverlay />
    </IonPage>
  )
}

export default StatsLayout
