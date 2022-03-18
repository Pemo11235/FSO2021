import { createSlice } from '@reduxjs/toolkit'
import { clear } from '@testing-library/user-event/dist/clear'
import { useSelector } from 'react-redux'

const notificationAtStart = { text: '', timeoutID: null }

const initialState = notificationAtStart

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    writeNotification: {
      reducer: (state, action) => {
        if (state.timeoutID) {
          clearTimeout(state.timeoutID)
        }
        return (state = action.payload)
      },
      prepare: (text, ID) => ({
        payload: {
          text,
          timeoutID: ID,
        },
      }),
    },
    resetNotification(state) {
      return (state = { text: '', timeoutID: null })
    },
  },
})
export const { writeNotification, resetNotification } =
  notificationSlice.actions

export const setNotification =
  (text, seconds) => async (dispatch, getState) => {
    const timeoutID = setTimeout(() => {
      dispatch(resetNotification())
    }, seconds * 1000)
    dispatch(writeNotification(text, timeoutID))
  }
export default notificationSlice.reducer
