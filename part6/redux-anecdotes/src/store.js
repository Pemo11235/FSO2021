import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer, { setAnecdotes } from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import anecdoteService from './reducers/services/anecdoteService'

export const store = configureStore({
  reducer: {
    anecdote: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer,
  },
})


console.log(store.getState())
