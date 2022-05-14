import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const NewAuthor = ({ show }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [changeBirthYear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const { data, loading } = useQuery(ALL_AUTHORS)
  const allAuthors = data?.allAuthors

  const onSubmit = (e) => {
    e.preventDefault()

    changeBirthYear({ variables: { name, setBornTo: parseInt(born) } })
    setName('')
    setBorn('')
  }
  const onChangeName = ({ target }) => setName(target.value)
  const onChangeBorn = ({ target }) => setBorn(target.value)

  return (
    <>
      {!show && null}
      {show && (
        <div>
          <h2>Set birth year</h2>
          <form onSubmit={onSubmit}>
            <div>
              Name:
              {loading && <div>Loading . . .</div>}
              {!loading && (
                <select onChange={onChangeName} value={name}>
                  {allAuthors.map((a) => (
                    <option key={a.name}>{a.name}</option>
                  ))}
                </select>
              )}
            </div>
            <div>
              Born:
              <input type={'number'} onChange={onChangeBorn} value={born} />
            </div>
            <button type='submit'>Update year</button>
          </form>
        </div>
      )}
    </>
  )
}

export default NewAuthor
