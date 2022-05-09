import { configureStore } from '@reduxjs/toolkit'
import notifyReducer from './slices/notifySlice'
import blogReducer from './slices/blogSlice'

const store = configureStore({
  reducer: {
    blog: blogReducer,
    notify: notifyReducer,
  },
})

export default store
