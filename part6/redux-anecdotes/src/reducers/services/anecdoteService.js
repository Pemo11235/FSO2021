import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const { data } = await axios.post(baseUrl, object)
  return data
}

const updateVote = async (id) => {
  const allAnecdotes = await getAll()
  const anecdoteToVote = allAnecdotes.find((a) => a.id === id)
  const changedAnecdote = {
    ...anecdoteToVote,
    votes: anecdoteToVote.votes + 1,
  }
  const { data } = await axios.put(`${baseUrl}/${id}`, changedAnecdote)

  const updatedState = allAnecdotes.map((a) =>
    a.id !== id ? a : changedAnecdote
  )
  return updatedState
}

export default { getAll, createNew, updateVote }
