import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  it('renders correctly', () => {
    const blog = {
      id: 'test-id',
      title: 'test-title',
      author: 'test-author',
      url: 'test-url',
      likes: 99,
      user: { username: 'test-username' },
    }

    const { container } = render(<Blog blog={blog} />)

    expect(container).toHaveTextContent(blog.title)
    expect(container).toHaveTextContent(blog.author)
    expect(container).not.toHaveTextContent(blog.url)
    expect(container).not.toHaveTextContent(blog.likes)
  })
})
