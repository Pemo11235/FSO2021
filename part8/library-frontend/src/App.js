import { useApolloClient, useSubscription } from '@apollo/client'
import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewAuthor from './components/NewAuthor'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import { BOOK_ADDED } from './queries'
const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      alert('A new books is added !')
    },
  })

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  useEffect(() => {
    setToken(localStorage.getItem('library-user-token'))
  }, [token])

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('edit')}>edit author</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={handleLogout}>logout</button>
          </>
        )}
      </div>

      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      {!token && (
        <Login show={page === 'login'} setToken={setToken} setPage={setPage} />
      )}
      {token && (
        <>
          <NewBook show={page === 'add'} />
          <NewAuthor show={page === 'edit'} />
          <Recommend show={page === 'recommend'} />
        </>
      )}
    </div>
  )
}

export default App
