import { useQuery } from '@apollo/client'
import React from 'react'
import { ALL_BOOKS, GET_BOOK_BY_GENRE, ME } from '../queries'

const Recommend = ({ show }) => {
  const { data, loading } = useQuery(ME)
  const favoriteGenre = data?.me?.favoriteGenre
  const { data: booksByGenre, loading: loadingBooksByGenre } = useQuery(
    GET_BOOK_BY_GENRE,
    {
      variables: { genre: favoriteGenre },
    }
  )
  console.log(booksByGenre.allBooks)

  if (!show) {
    return null
  }
  return (
    <div>
      <h2>Recommendations</h2>
      <div>
        <p>
          Books in your favorite genre <b>{favoriteGenre}</b>
        </p>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {!loadingBooksByGenre &&
            booksByGenre.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
