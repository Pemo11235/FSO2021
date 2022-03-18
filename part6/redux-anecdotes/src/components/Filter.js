import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = ({ setFilter }) => {
  const handleChange = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      Filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = { setFilter }
export default connect(null, mapDispatchToProps)(Filter)
