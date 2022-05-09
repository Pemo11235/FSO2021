import React from 'react'
import { useSelector } from 'react-redux'
import { notificationSelector } from '../slices/notifySlice'

const Notification = () => {
  const [notification, notificationType] = useSelector(notificationSelector)
  const colorNotification = notificationType === 'success' ? 'green' : 'red'
  const notificationStyle = {
    border: `2px solid ${colorNotification}`,
    borderRadius: '2%',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  }
  return (
    <div style={notificationStyle}>
      <h3 style={{ color: colorNotification }}>{notification}</h3>
    </div>
  )
}
export default Notification
