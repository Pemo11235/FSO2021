import React from 'react'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { getAllBlogsAndUpdateState } from '../slices/blogSlice'
import { asyncResetNotification, setNotification } from '../slices/notifySlice'

const CreateBlogForm = () => {
  const [title, setTitle] = React.useState('')
  const [author, setAuthor] = React.useState('')
  const [url, setUrl] = React.useState('')
  const dispatch = useDispatch()

  const handleCreate = async (event, title, author, url) => {
    if (!window.localStorage.getItem('loggedBlogAppUser')) return null

    event.preventDefault()
    const { token } = JSON.parse(
      window.localStorage.getItem('loggedBlogAppUser')
    )
    await blogService.setToken(token)
    await blogService.create({ title, author, url })
    dispatch(
      setNotification({
        notification: `A new blog: ${title} by ${author} is added`,
        notificationType: 'success',
      })
    )
    dispatch(asyncResetNotification())
    dispatch(getAllBlogsAndUpdateState())
  }

  return (
    <>
      <h1>Create new blog</h1>
      <form onSubmit={event => handleCreate(event, title, author, url)}>
        <div>
          title:{' '}
          <input
            id="title"
            type="text"
            name="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:{' '}
          <input
            id="author"
            type="text"
            name="Author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{' '}
          <input
            id="url"
            type="text"
            name="Url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="submit" type="submit">
          Create
        </button>
      </form>
    </>
  )
}

export default CreateBlogForm
