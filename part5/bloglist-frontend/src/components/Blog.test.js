import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  it('renders correctly with closed toggle', () => {
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
  it('renders correctly with open toggle', () => {
    const blog = {
      id: 'test-id',
      title: 'test-title',
      author: 'test-author',
      url: 'test-url',
      likes: 99,
      user: { username: 'test-username' },
    }
    const { container, getByText } = render(<Blog blog={blog} />)
    const button = getByText('view')

    fireEvent.click(button)

    expect(container).toHaveTextContent(blog.title)
    expect(container).toHaveTextContent(blog.author)
    expect(container).toHaveTextContent(blog.url)
    expect(container).toHaveTextContent(blog.likes)
  })

  it('click likes correctly', () => {
    const blog = {
      id: 'test-id',
      title: 'test-title',
      author: 'test-author',
      url: 'test-url',
      likes: 99,
      user: { username: 'test-username' },
    }
    const mockHandleLike = jest.fn()
    const { getByText } = render(
      <Blog blog={blog} handleLike={mockHandleLike} />
    )
    const view = getByText('view')
    fireEvent.click(view)
    const like = getByText('Like')
    fireEvent.click(like)
    fireEvent.click(like)

    expect(mockHandleLike.mock.calls).toHaveLength(2)
  })
})
