import { createSlice } from '@reduxjs/toolkit'

const notificationAtStart = ['Default Notification']

const getId = () => (100_000 * Math.random()).toFixed(0)

const asObject = (notification) => ({
  id: getId(),
  notification,
})

const initialState = notificationAtStart.map(asObject)

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
})

export default notificationSlice.reducer
