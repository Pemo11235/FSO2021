import React from 'react'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { getAllBlogsAndUpdateState } from '../slices/blogSlice'
import { asyncResetNotification, setNotification } from '../slices/notifySlice'
import Typography from '@mui/material/Typography'
import { Button, Container, Input, InputLabel } from '@mui/material'

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
      <Typography variant="h2" color="initial">
        Create new blog
      </Typography>
      <form onSubmit={event => handleCreate(event, title, author, url)}>
        <Container sx={{ margin: '20px 0' }}>
          <div>
            <InputLabel> Title : </InputLabel>
            <Input
              id="title"
              type="text"
              name="Title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            <InputLabel>Author :</InputLabel>
            <Input
              id="author"
              type="text"
              name="Author"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            <InputLabel>Url :</InputLabel>
            <Input
              id="url"
              type="text"
              name="Url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
        </Container>
        <Button variant="contained" id="submit" type="submit">
          Create
        </Button>
      </form>
    </>
  )
}

export default CreateBlogForm
