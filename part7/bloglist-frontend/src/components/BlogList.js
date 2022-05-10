import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { blogSelector, getAllBlogsAndUpdateState } from '../slices/blogSlice'
import { userSelector } from '../slices/userSlice'
import CreateBlogForm from './CreateBlogForm'
import Togglable from './Toggable'
const BlogList = () => {
  const blogs = useSelector(blogSelector)
  const dispatch = useDispatch()
  const user = useSelector(userSelector)

  return (
    <>
      <h1>blogs</h1>
      {user && (
        <Togglable buttonLabel="Add new blog">
          {user && <CreateBlogForm />}
        </Togglable>
      )}
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
