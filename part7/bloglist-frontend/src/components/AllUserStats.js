import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { allUsersSelector, asyncGetAllUsers } from '../slices/userSlice'
import NavBar from './NavBar'

const AllUserStats = () => {
  const allUsers = useSelector(allUsersSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncGetAllUsers())
  }, [])

  console.log('allUsers', allUsers)
  return (
    <div>
      <NavBar />
      <h1>Users</h1>
      <table>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {allUsers.map(user => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.username}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default AllUserStats
