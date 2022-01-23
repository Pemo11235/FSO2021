import React from 'react'
const Blog = ({ blog }) => {
  const [details, setDetails] = React.useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} - {blog.author}
        <button onClick={() => setDetails(!details)}>view</button>
        {details && (
          <div>
            URL: {blog.url} <br />
            Likes: {blog.likes} <button>Like</button>
            <br />
            User: {blog.user.username}
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog
