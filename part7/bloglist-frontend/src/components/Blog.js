import React from 'react'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { getAllBlogsAndUpdateState } from '../slices/blogSlice'
const Blog = ({ blog }) => {
  const [details, setDetails] = React.useState(false)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const canUserDelete = () => {
    if (!window.localStorage.getItem('loggedBlogAppUser')) return false
    const { username } = JSON.parse(
      window.localStorage.getItem('loggedBlogAppUser')
    )
    return blog.user.username === username
  }
  const handleRemove = async () => {
    if (window.confirm(`Remove blog: ${blog.title} by ${blog.author} ? `)) {
      await blogService.remove(blog.id)
      dispatch(getAllBlogsAndUpdateState())
    }
  }
  const handleLike = (event, blog) => {
    event.preventDefault()
    const buildObject = () => ({
      id: blog.id,
      newObject: {
        id: blog.id,
        title: blog.title,
        author: blog.author,
        likes: blog.likes + 1,
        url: blog.url,
      },
    })
    const { id, newObject } = buildObject(blog)
    blogService.update(id, newObject)
    dispatch(getAllBlogsAndUpdateState())
  }

  return (
    <div style={blogStyle} className={'blog'}>
      <div>
        {blog.title} - {blog.author}
        <button id="view" onClick={() => setDetails(!details)}>
          view
        </button>
        {details && (
          <div>
            URL: {blog.url} <br />
            Likes: {blog.likes}{' '}
            <button id="like" onClick={event => handleLike(event, blog)}>
              Like
            </button>
            <br />
            User: {blog.user.username}
            <br />
            {canUserDelete() && <button onClick={handleRemove}>remove</button>}
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog
