import React from 'react'
import blogService from '../services/blogs'

const CreateBlogForm = () => {
  const [title, setTitle] = React.useState('')
  const [author, setAuthor] = React.useState('')
  const [url, setUrl] = React.useState('')

  const [newBlogNotification, setNewBlogNotification] = React.useState(null)

  const handleCreate = async (event) => {
    event.preventDefault()
    const { token } = JSON.parse(
      window.localStorage.getItem('loggedBlogAppUser')
    )
    await blogService.setToken(token)
    await blogService.create({ title, author, url })
    setNewBlogNotification(`A new blog: ${title} by ${author} is added`)
    setTimeout(() => {
      setNewBlogNotification(null)
    }, 5000)
  }
  const newBlogNotify = () => (
    <div
      style={{
        border: '2px solid green',
        borderRadius: '2%',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      <h3 style={{ color: 'green' }}>{newBlogNotification}</h3>
    </div>
  )

  return (
    <>
      {newBlogNotification && newBlogNotify()}
      <h1>Create new blog</h1>
      <form onSubmit={handleCreate}>
        <div>
          title:{' '}
          <input
            type='text'
            name='Title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:{' '}
          <input
            type='text'
            name='Author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{' '}
          <input
            type='text'
            name='Url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>Create</button>
      </form>
    </>
  )
}

export default CreateBlogForm
