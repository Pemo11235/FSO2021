import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { useState } from 'react'
import { updateCache } from '../App'
import { ALL_BOOKS, BOOK_ADDED, GET_ALL_BOOKS_GENRES } from '../queries'

const Books = ({ show }) => {
  const { data, loading } = useQuery(ALL_BOOKS)
  const [filterByGenre, setFilterByGenre] = useState('ALL')
  const { data: dataGenres } = useQuery(GET_ALL_BOOKS_GENRES)
  const client = useApolloClient()
  const books = data?.allBooks
  const booksByGenres = books && getAllBooksGenres(dataGenres?.allBooks)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const { bookAdded } = subscriptionData.data
      updateCache(client.cache, { query: ALL_BOOKS }, bookAdded)
    },
  })

  const isBookGenresAllowed = (book) => {
    if (filterByGenre === 'ALL') return true
    return book.genres.includes(filterByGenre)
  }
  const onGenreFilterClick = (genre) => {
    setFilterByGenre(genre)
  }

  if (!show) {
    return null
  }

  return (
    <>
      {loading && <div>loading...</div>}
      {!loading && (
        <div>
          <h2>books</h2>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {books.map(
                (a) =>
                  isBookGenresAllowed(a) && (
                    <tr key={a.title}>
                      <td>{a.title}</td>
                      <td>{a.author.name}</td>
                      <td>{a.published}</td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
          <div>
            {booksByGenres.map((b) => (
              <button key={`genre-${b}`} onClick={() => onGenreFilterClick(b)}>
                {b}
              </button>
            ))}
            <button
              key={'reset-filter'}
              onClick={() => onGenreFilterClick('ALL')}>
              reset
            </button>
          </div>
        </div>
      )}
    </>
  )
}

const getAllBooksGenres = (allBooks) => {
  return [...new Set(allBooks?.map((b) => b.genres).flat())]
}

export default Books
