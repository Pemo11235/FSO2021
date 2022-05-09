import { configureStore } from '@reduxjs/toolkit'
import notifyReducer from './slices/notifySlice'

const store = configureStore({
  reducer: {
    notify: notifyReducer,
  },
})

export default store
