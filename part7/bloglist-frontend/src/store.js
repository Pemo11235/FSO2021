import { configureStore } from '@reduxjs/toolkit'
import notifyReducer from './slices/notifySlice'
import blogReducer from './slices/blogSlice'
import userReducer from './slices/userSlice'

const store = configureStore({
  reducer: {
    blog: blogReducer,
    notify: notifyReducer,
    user: userReducer,
  },
})

export default store
