import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { blogSelector, getAllBlogsAndUpdateState } from '../slices/blogSlice'
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
        <li key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} - {blog.author}
          </Link>
        </li>
      ))}
    </>
  )
}

export default BlogList
