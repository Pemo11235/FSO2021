import { createSlice } from '@reduxjs/toolkit'

const notificationAtStart = ''

const initialState = notificationAtStart

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    writeNotification: {
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
export const { writeNotification, resetNotification } =
  notificationSlice.actions

export const setNotification = (text, seconds) => async (dispatch) => {
  dispatch(writeNotification(text))
  setTimeout(() => {
    dispatch(resetNotification())
  }, seconds * 1000)
}
export default notificationSlice.reducer
