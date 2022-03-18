import { connect } from 'react-redux'
import React from 'react'

const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: 'lightgreen',
  }

  const showNotification = notification.text !== ''

  return <>{showNotification && <div style={style}>{notification.text}</div>}</>
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

export default connect(mapStateToProps)(Notification)
