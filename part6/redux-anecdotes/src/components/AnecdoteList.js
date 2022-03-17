import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateVote, voteAnecdote } from '../reducers/anecdoteReducer'
import {
  resetNotification,
  setNotification,
  writeNotification,
} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector((state) => {
    const stateToFilter = Array.from(state.anecdote)
    const stateFiltered = stateToFilter.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    )
    return stateFiltered.sort(({ votes: a }, { votes: b }) => b - a)
  })

  const vote = ({ id, content }) => {
    dispatch(updateVote(id))
    dispatch(setNotification(`You voted: ${content} `, 5))
  }

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
