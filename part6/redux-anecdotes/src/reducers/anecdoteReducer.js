import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from './services/anecdoteService'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll()
  dispatch(setAnecdotes(anecdotes))
}

export const createAnecdote = (content) => async (dispatch) => {
  const newAnecdote = await anecdoteService.createNew(content)
  dispatch(appendAnecdote(newAnecdote))
}

export const updateVote = (id) => async (dispatch) => {
  const updatedAnecdotes = await anecdoteService.updateVote(id)
  dispatch(setAnecdotes(updatedAnecdotes))
}
export default anecdoteSlice.reducer
