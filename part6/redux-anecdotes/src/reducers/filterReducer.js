import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: {
      reducer: (state, action) => {
        return (state = action.payload)
      },
      prepare: (text) => ({
        payload: text,
      }),
    },
  },
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer
