import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { blogSelector, getAllBlogsAndUpdateState } from '../slices/blogSlice'
import Blog from './Blog'
const BlogList = () => {
  const blogs = useSelector(blogSelector)
  const dispatch = useDispatch()

  return (
    <>
      <h1>blogs</h1>
      <button onClick={() => dispatch(getAllBlogsAndUpdateState())}>
        refresh list
      </button>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  )
}

export default BlogList
