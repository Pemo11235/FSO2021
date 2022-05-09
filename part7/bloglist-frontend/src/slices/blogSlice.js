import { createSlice } from '@reduxjs/toolkit'
import blogServices from '../services/blogs'
export const blogSlice = createSlice({
  name: 'blog',
  initialState: { blog: [] },
  reducers: {
    setBlogs: (state, action) => {
      state.blog = action.payload
    },
  },
})

export const { setBlogs } = blogSlice.actions

export const getAllBlogsAndUpdateState = () => dispatch => {
  blogServices
    .getAll()
    .then(blogs => dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes))))
}
export const blogSelector = state => state.blog.blog
export default blogSlice.reducer
