import { useSelector, useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { voteAnecdote } from './reducers/anecdoteReducer'

const App = () => (
  <div>
    <h2>Anecdotes</h2>
    <AnecdoteList />
    <AnecdoteForm />
  </div>
)

export default App
