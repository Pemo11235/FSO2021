import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification, asyncResetNotification } from '../slices/notifySlice'
import {
  setUser,
  credentialSelector,
  setUsername,
  setPassword,
} from '../slices/userSlice'

const LoginForm = () => {
  const { username, password } = useSelector(credentialSelector)
  const dispatch = useDispatch()

  const handleLogin = async event => {
    event.preventDefault()
    console.log('loggin with', username, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setUsername(''))
      dispatch(setPassword(''))
    } catch (exception) {
      dispatch(
        setNotification({
          notification: 'Wrong username or password',
          notificationType: 'error',
        })
      )
      dispatch(asyncResetNotification())
    }
  }
  return (
    <form onSubmit={handleLogin} id="login-form">
      <h2>Log in to application</h2>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => dispatch(setUsername(target.value))}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => dispatch(setPassword(target.value))}
        />
      </div>
      <button id="input-button" type="submit">
        login
      </button>
    </form>
  )
}

export default LoginForm
