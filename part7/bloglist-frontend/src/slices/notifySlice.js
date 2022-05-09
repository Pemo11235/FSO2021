import { createSlice } from '@reduxjs/toolkit'

export const notifySlice = createSlice({
  name: 'notify',
  initialState: { notification: null, notificationType: null },
  reducers: {
    setNotification: (state, action) => {
      const { notification, notificationType } = action.payload
      state.notification = notification
      state.notificationType = notificationType
    },
    resetNotification: state => {
      state.notification = null
      state.notificationType = null
    },
  },
})

export const { setNotification, resetNotification } = notifySlice.actions

export const asyncResetNotification =
  (time = 5000) =>
  dispatch => {
    setTimeout(() => {
      dispatch(resetNotification())
    }, time)
  }
export const notificationSelector = state => [
  state.notify.notification,
  state.notify.notificationType,
]

export default notifySlice.reducer
