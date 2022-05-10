import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { blogSelector, getAllBlogsAndUpdateState } from './slices/blogSlice'
import { userSelector } from './slices/userSlice'
import BlogList from './components/BlogList'
import NavBar from './components/NavBar'
import { Container } from '@mui/material'
const App = () => {
  const blogs = useSelector(blogSelector)
  const user = useSelector(userSelector)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllBlogsAndUpdateState())
  }, [blogs])

  return (
    <Container
      sx={{
        backgroundColor: '#f2f2f2',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        padding: 0,
        margin: '0 0 50px 0',
        width: '100vw',
        height: '100vw',
      }}
    >
      <NavBar />
      {user && <BlogList />}
    </Container>
  )
}

export default App
