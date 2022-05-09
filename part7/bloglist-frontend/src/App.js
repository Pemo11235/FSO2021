import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Toggable'
import { notificationSelector } from './slices/notifySlice'
import { blogSelector, getAllBlogsAndUpdateState } from './slices/blogSlice'
import { userSelector, setUser } from './slices/userSlice'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import UserInfo from './components/UserInfo'
import { Link } from 'react-router-dom'
const App = () => {
  const blogs = useSelector(blogSelector)
  const user = useSelector(userSelector)
  const [notificationType] = useSelector(notificationSelector)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllBlogsAndUpdateState())
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  const padding = { padding: '5px' }
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
      {user && (
        <Togglable buttonLabel="Add new blog">
          {user && <CreateBlogForm />}
        </Togglable>
      )}
      {user && <BlogList />}
    </div>
  )
}

export default App
