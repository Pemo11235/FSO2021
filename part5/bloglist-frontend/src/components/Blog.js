import React from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog }) => {
  const [details, setDetails] = React.useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLike = (event) => {
    event.preventDefault()
    const { id, newObject } = buildObject()
    blogService.update(id, newObject)
  }

  const canUserDelete = () => {
    const { username } = JSON.parse(
      window.localStorage.getItem('loggedBlogAppUser')
    )
    return blog.user.username === username
  }
  const handleRemove = (event) => {
    if (window.confirm(`Remove blog: ${blog.title} by ${blog.author} ? `)) {
      blogService.remove(blog.id)
    }
  }

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

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} - {blog.author}
        <button onClick={() => setDetails(!details)}>view</button>
        {details && (
          <div>
            URL: {blog.url} <br />
            Likes: {blog.likes} <button onClick={handleLike}>Like</button>
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
