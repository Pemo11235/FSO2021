import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateBlogForm from './CreateBlogForm'
test('<CreateBlogForm /> updates parent state and calls onSubmit', () => {
  const handleCreate = jest.fn()

  const component = render(<CreateBlogForm handleCreate={handleCreate} />)

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')

  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'test-title' },
  })
  fireEvent.change(authorInput, {
    target: { value: 'test-author' },
  })
  fireEvent.change(urlInput, {
    target: { value: 'test-url' },
  })
  fireEvent.submit(form)

  expect(handleCreate.mock.calls[0][1]).toBe('test-title')
  expect(handleCreate.mock.calls[0][2]).toBe('test-author')
  expect(handleCreate.mock.calls[0][3]).toBe('test-url')
})
