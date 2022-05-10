import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { allUsersSelector } from '../slices/userSlice'
import NavBar from './NavBar'

const UserStats = () => {
  const id = useParams().id
  const users = useSelector(allUsersSelector)
  const userToShow = users.find(user => user.id === id)

  const userBlogs = () => (
    <div>
      <h3>added blogs</h3>
      <ul>
        {userToShow.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )

  if (!userToShow) {
    return <Navigate replace to="/" />
  }
  return (
    <div>
      <NavBar />
      <h2>{userToShow.username}</h2>
      {userToShow.blogs && userBlogs()}
    </div>
  )
}

export default UserStats
