import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { notificationSelector } from '../slices/notifySlice'
import { setUser, userSelector } from '../slices/userSlice'
import LoginForm from './LoginForm'
import Notification from './Notification'
import UserInfo from './UserInfo'
import { AppBar, Toolbar, Typography } from '@mui/material'
const NavBar = () => {
  const [notificationType] = useSelector(notificationSelector)
  const user = useSelector(userSelector)
  const dispatch = useDispatch()

  React.useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
          <Link to="/">Home</Link>
        </Typography>
        <Typography variant="h6" color="inherit" sx={{ flexGrow: 0 }}>
          <Link to="/users">Users</Link>
        </Typography>
        {user && <UserInfo />}
      </Toolbar>
      {notificationType !== null && <Notification />}
      {!user && <LoginForm />}
    </AppBar>
  )
}

export default NavBar
