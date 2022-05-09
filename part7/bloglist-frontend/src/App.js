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
  const [newBlogNotification, setNewBlogNotification] = React.useState(null)

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
  const handleCreate = async (event, title, author, url) => {
    if (!window.localStorage.getItem('loggedBlogAppUser')) return null

    event.preventDefault()
    const { token } = JSON.parse(
      window.localStorage.getItem('loggedBlogAppUser')
    )
    await blogService.setToken(token)
    await blogService.create({ title, author, url })
    setNewBlogNotification(`A new blog: ${title} by ${author} is added`)
    setTimeout(() => {
      setNewBlogNotification(null)
    }, 5000)
    handleUpdate()
  }
  const newBlogNotify = () => (
    <div
      style={{
        border: '2px solid green',
        borderRadius: '2%',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <h3 style={{ color: 'green' }}>{newBlogNotification}</h3>
    </div>
  )

  const handleUpdate = () => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }
  const handleLike = (event, blog) => {
    event.preventDefault()
    const buildObject = () => ({
      id: blog.id,
      newObject: {
        id: blog.id,
        title: blog.title,
        author: blog.author,
        likes: blog.likes + 1,
        url: blog.url,
      },
    })
    const { id, newObject } = buildObject(blog)
    blogService.update(id, newObject)
    handleUpdate()
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

  const handleLogout = async () => {
    console.log('logged out')
    await window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin} id="login-form">
      <h2>Log in to application</h2>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="input-button" type="submit">
        login
      </button>
    </form>
  )

  const blogList = () => (
    <>
      <h2>blogs</h2>
      <button onClick={() => handleUpdate()}>refresh list</button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} handleLike={handleLike} />
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
      className="error"
      style={{
        border: '2px solid red',
        borderRadius: '2%',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <h3 id="error-text" style={{ color: 'red' }}>
        {errorMessage}
      </h3>
    </div>
  )

  return (
    <div>
      {errorMessage && errorNotify()}
      {newBlogNotification && newBlogNotify()}
      {!user && loginForm()}
      {user && userLoggedIn()}
      {user && (
        <Togglable buttonLabel="Add new blog">
          {user && <CreateBlogForm handleCreate={handleCreate} />}
        </Togglable>
      )}
      {user && blogList()}
    </div>
  )
}

export default App
