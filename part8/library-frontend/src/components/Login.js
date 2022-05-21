import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { LOGIN } from '../queries'

const Login = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    },
  })

  const onChangeName = ({ target }) => setUsername(target.value)
  const onChangePassword = ({ target }) => setPassword(target.value)
  const resetState = () => {
    setUsername('')
    setPassword('')
  }
  const onSubmit = (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
    resetState()
    setPage('authors')
  }

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data])

  if (!show) {
    return null
  }

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username:
          <input type={'text'} onChange={onChangeName} value={username} />
        </div>
        <div>
          password:
          <input
            type={'password'}
            onChange={onChangePassword}
            value={password}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </>
  )
}

export default Login
