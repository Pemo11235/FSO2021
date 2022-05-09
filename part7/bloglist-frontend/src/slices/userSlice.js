import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    credential: {
      username: '',
      password: '',
    },
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
  },
})

export const { setUser, setUsername, setPassword, resetUser } =
  userSlice.actions
export const userSelector = state => state.user.user
export const credentialSelector = state => state.user.credential
export default userSlice.reducer
