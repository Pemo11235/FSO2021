import { Typography, Button } from '@mui/material'
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
    borderRadius: '5px',
    height: 'min-content',
    margin: '0 0 0 20px',
    padding: '5px',
  }
  return (
    <div style={userInfoStyle}>
      <Typography variant="h6" color="inherit" sx={{ color: 'white' }}>
        <h5>{user.username} logged in</h5>
      </Typography>
      <Button variant="text" color="secondary" onClick={handleLogout}>
        Log Out
      </Button>
    </div>
  )
}

export default UserInfo
