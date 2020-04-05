import React from 'react'
import { IonPage, IonContent } from '@ionic/react'
import StatsOverlay from '../StatsOverlay'

interface Props {
  id?: string
  className?: string
  children: React.ReactChild[]
  onClick?: () => void
}

const StatsLayout = ({ id, className, onClick, children }: Props) => {
  return (
    <IonPage id={id} className={className} onClick={onClick}>
      <IonContent>{children}</IonContent>

      <StatsOverlay />
    </IonPage>
  )
}

export default StatsLayout
