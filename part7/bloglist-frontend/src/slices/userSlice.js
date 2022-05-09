import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    credential: {
      username: '',
      password: '',
    },
    allUsers: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setUsername: (state, action) => {
      state.credential.username = action.payload
    },
    setPassword: (state, action) => {
      state.credential.password = action.payload
    },
    resetUser: state => {
      state.user = null
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload
    },
  },
})

export const { setUser, setUsername, setPassword, resetUser, setAllUsers } =
  userSlice.actions

export const asyncGetAllUsers = () => dispatch => {
  userService.getAll().then(users => {
    dispatch(setAllUsers(users))
  })
}
export const userSelector = state => state.user.user
export const credentialSelector = state => state.user.credential
export const allUsersSelector = state => state.user.allUsers
export default userSlice.reducer
