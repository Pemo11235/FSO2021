import React from 'react'

const CreateBlogForm = ({ handleCreate }) => {
  const [title, setTitle] = React.useState('')
  const [author, setAuthor] = React.useState('')
  const [url, setUrl] = React.useState('')

  return (
    <>
      <h1>Create new blog</h1>
      <form onSubmit={(event) => handleCreate(event, title, author, url)}>
        <div>
          title:{' '}
          <input
            id='title'
            type='text'
            name='Title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:{' '}
          <input
            id='author'
            type='text'
            name='Author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{' '}
          <input
            id='url'
            type='text'
            name='Url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='submit' type='submit'>
          Create
        </button>
      </form>
    </>
  )
}

export default CreateBlogForm
