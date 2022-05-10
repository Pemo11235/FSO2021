import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { blogSelector, getAllBlogsAndUpdateState } from './slices/blogSlice'
import { userSelector } from './slices/userSlice'
import BlogList from './components/BlogList'
import NavBar from './components/NavBar'
const App = () => {
  const blogs = useSelector(blogSelector)
  const user = useSelector(userSelector)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllBlogsAndUpdateState())
  }, [blogs])

  return (
    <div>
      <NavBar />
      {user && <BlogList />}
    </div>
  )
}

export default App
