import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    handleUpdate()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleUpdate = () => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('loggin with', username, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setPassword('')
      setUsername('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    console.log('logged out')
    await window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const blogList = () => (
    <>
      <h2>blogs</h2>
      <button onClick={() => handleUpdate()}>refresh list</button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  )

  const userLoggedIn = () => (
    <>
      <h2>list</h2>
      <h3>{user.username} logged in</h3>
      <button onClick={handleLogout}>log out</button>
    </>
  )

  const errorNotify = () => (
    <div
      style={{
        border: '2px solid red',
        borderRadius: '2%',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      <h3 style={{ color: 'red' }}>{errorMessage}</h3>
    </div>
  )

  return (
    <div>
      {errorMessage && errorNotify()}
      {!user && loginForm()}
      {user && userLoggedIn()}
      {user && (
        <Togglable buttonLabel='Add new blog'>
          {user && <CreateBlogForm />}
        </Togglable>
      )}
      {user && blogList()}
    </div>
  )
}

export default App
