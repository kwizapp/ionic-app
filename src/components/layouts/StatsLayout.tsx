import React from 'react'
import { IonPage, IonContent } from '@ionic/react'
import StatsOverlay from '../StatsOverlay'

interface Props {
  id?: string
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

const StatsLayout = ({ id, className, onClick, children }: Props) => {
  return (
    <IonPage id={id} className={className} onClick={onClick}>
      <IonContent className="text-center">{children}</IonContent>

      <StatsOverlay />
    </IonPage>
  )
}

export default StatsLayout
