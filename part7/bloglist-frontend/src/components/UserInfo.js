import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetUser, userSelector } from '../slices/userSlice'
const UserInfo = () => {
  const dispatch = useDispatch()
  const user = useSelector(userSelector)

  const handleLogout = async () => {
    console.log('logged out')
    await window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(resetUser())
  }
  const userInfoStyle = {
    display: 'flex',
    flexDirection: 'row',
    border: '1px solid black',
    borderRadius: '5px',
    color: 'white',
    backgroundColor: '#212121',
    height: 'min-content',
    margin: '0 0 0 20px',
    padding: '5px',
  }
  return (
    <div style={userInfoStyle}>
      <h5>{user.username} logged in</h5>
      <button onClick={handleLogout}>log out</button>
    </div>
  )
}

export default UserInfo
