import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

let token = null
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}
const create = async (newBlog) => {
  if (!token) return null
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((response) => response.data)
}

export default { getAll, setToken, create, update }
