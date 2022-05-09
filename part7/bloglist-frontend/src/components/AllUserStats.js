import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { notificationSelector } from '../slices/notifySlice'
import {
  allUsersSelector,
  asyncGetAllUsers,
  userSelector,
} from '../slices/userSlice'
import LoginForm from './LoginForm'
import Notification from './Notification'
import UserInfo from './UserInfo'

const AllUserStats = () => {
  const allUsers = useSelector(allUsersSelector)
  const dispatch = useDispatch()
  const [notificationType] = useSelector(notificationSelector)
  const padding = { padding: '5px' }
  const user = useSelector(userSelector)

  useEffect(() => {
    dispatch(asyncGetAllUsers())
  }, [allUsers])

  console.log('allUsers', allUsers)
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
      <h1>Users</h1>
      <table>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {allUsers.map(user => (
          <tr key={user.id}>
            <td>{user.username}</td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default AllUserStats
