import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { blogSelector, getAllBlogsAndUpdateState } from '../slices/blogSlice'
import { userSelector } from '../slices/userSlice'
import CreateBlogForm from './CreateBlogForm'
import Togglable from './Toggable'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material'
import { Send } from '@mui/icons-material'
const BlogList = () => {
  const blogs = useSelector(blogSelector)
  const dispatch = useDispatch()
  const user = useSelector(userSelector)

  return (
    <Container maxWidth="xl">
      <Typography variant="h1" color="initial">
        Blog list
      </Typography>
      {user && (
        <Toolbar sx={{ margin: '5% 0' }}>
          <Togglable buttonLabel="Add new blog">
            {user && <CreateBlogForm />}
          </Togglable>
          <Button
            variant="contained"
            onClick={() => dispatch(getAllBlogsAndUpdateState())}
          >
            refresh list
          </Button>
        </Toolbar>
      )}

      <List>
        {blogs.map(blog => (
          <ListItem key={blog.id}>
            <ListItemIcon>
              <Send />
            </ListItemIcon>
            <ListItemText>
              <Link to={`/blogs/${blog.id}`}>
                <Typography variant="body1" color="initial">
                  {blog.title} - {blog.author}
                </Typography>
              </Link>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default BlogList
