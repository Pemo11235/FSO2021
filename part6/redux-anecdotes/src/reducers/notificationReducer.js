import { createSlice } from '@reduxjs/toolkit'

const notificationAtStart = ''

const initialState = notificationAtStart

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification: {
      reducer: (state, action) => {
        return (state = action.payload)
      },
      prepare: (text) => ({
        payload: text,
      }),
    },
    resetNotification(state) {
      return (state = '')
    },
  },
})
export const { setNotification, resetNotification } = notificationSlice.actions
export default notificationSlice.reducer
