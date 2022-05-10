import React from 'react'
import PropTypes from 'prop-types'
import { Button, Container } from '@mui/material'

const Togglable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = React.useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <Container>
      <div style={hideWhenVisible}>
        <Button
          variant="contained"
          id="open-create-blog-form"
          onClick={toggleVisibility}
        >
          {buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button
          variant="contained"
          color="secondary"
          onClick={toggleVisibility}
        >
          Cancel
        </Button>
      </div>
    </Container>
  )
}

Togglable.propTypes = { buttonLabel: PropTypes.string.isRequired }
export default Togglable
