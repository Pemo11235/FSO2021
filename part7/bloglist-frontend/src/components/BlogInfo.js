import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { blogSelector, getAllBlogsAndUpdateState } from '../slices/blogSlice'
import NavBar from './NavBar'
import blogService from '../services/blogs'

const BlogInfo = () => {
  const id = useParams().id
  const blogs = useSelector(blogSelector)
  const blogToShow = blogs.find(blog => blog.id === id)

  const dispatch = useDispatch()

  const [comment, setComment] = React.useState('')

  if (!blogToShow) return <Navigate replace to="/" />

  const canUserDelete = () => {
    if (!window.localStorage.getItem('loggedBlogAppUser')) return false
    const { username } = JSON.parse(
      window.localStorage.getItem('loggedBlogAppUser')
    )
    return blogToShow.user.username === username
  }
  const handleRemove = async () => {
    if (
      window.confirm(
        `Remove blog: ${blogToShow.title} by ${blogToShow.author} ? `
      )
    ) {
      await blogService.remove(blogToShow.id)

      await dispatch(getAllBlogsAndUpdateState())
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

  const handleAddComment = async () => {
    await blogService.addComment(blogToShow.id, comment)
    dispatch(getAllBlogsAndUpdateState())
  }

  return (
    <div>
      <NavBar />
      {blogToShow && (
        <>
          <h2>
            {blogToShow.title} - {blogToShow.author}
          </h2>
          <div>
            URL: {blogToShow.url} <br />
            Likes: {blogToShow.likes}{' '}
            <button id="like" onClick={event => handleLike(event, blogToShow)}>
              Like
            </button>
            <br />
            User: {blogToShow.user.username}
            <br />
            {canUserDelete() && <button onClick={handleRemove}>remove</button>}
          </div>
          <div>
            <h3>comments</h3>
            <form onSubmit={handleAddComment}>
              <div>
                <input
                  id="comment"
                  type="text"
                  name="Comment"
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                />
                <button id="submit" type="submit">
                  Add comment
                </button>
              </div>
            </form>
            {blogToShow.comments && (
              <ul>
                {blogToShow.comments.map(comment => (
                  <li key={comment}>{comment}</li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default BlogInfo
