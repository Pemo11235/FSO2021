import React from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, handleLike }) => {
  const [details, setDetails] = React.useState(false)

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
  const handleRemove = () => {
    if (window.confirm(`Remove blog: ${blog.title} by ${blog.author} ? `)) {
      blogService.remove(blog.id)
    }
  }

  return (
    <div style={blogStyle} className={'blog'}>
      <div>
        {blog.title} - {blog.author}
        <button onClick={() => setDetails(!details)}>view</button>
        {details && (
          <div>
            URL: {blog.url} <br />
            Likes: {blog.likes}{' '}
            <button onClick={(event) => handleLike(event, blog)}>Like</button>
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
