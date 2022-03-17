import { useSelector } from 'react-redux'
import React from 'react'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: 'lightgreen',
  }

  const notification = useSelector((state) => state.notification)
  const showNotification = notification !== ''

  return <>{showNotification && <div style={style}>{notification}</div>}</>
}

export default Notification
