import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { notificationSelector } from '../slices/notifySlice'
import { setUser, userSelector } from '../slices/userSlice'
import LoginForm from './LoginForm'
import Notification from './Notification'
import UserInfo from './UserInfo'

const NavBar = () => {
  const padding = { padding: '5px' }
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
    <div>
      <div>
        <Link style={padding} to="/">
          Home
        </Link>
        <Link style={padding} to="/users">
          Users
        </Link>
      </div>
      {notificationType !== null && <Notification />}
      {!user && <LoginForm />}
      {user && <UserInfo />}
    </div>
  )
}

export default NavBar
