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
  return (
    <>
      <h2>list</h2>
      <h3>{user.username} logged in</h3>
      <button onClick={handleLogout}>log out</button>
    </>
  )
}

export default UserInfo
