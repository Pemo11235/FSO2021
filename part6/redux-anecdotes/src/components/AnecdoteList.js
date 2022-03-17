import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {
  resetNotification,
  setNotification,
} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => {
    const stateToSort = [...state.anecdote]
    return stateToSort.sort(({ votes: a }, { votes: b }) => b - a)
  })

  const vote = (id) => {
    dispatch(voteAnecdote(id))
    dispatch(setNotification('You just voted an anecdote !'))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
