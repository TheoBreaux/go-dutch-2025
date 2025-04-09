import axios from 'axios'

const methods = {
  GET: axios.get,
  PUT: axios.put,
  POST: axios.post,
}

const API = async (method, url, data = null) => {
  let headers = {}

  // Only set Content-Type if it's NOT FormData (for file uploads)
  if (!(data instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  try {
    const response = await methods[method](url, data, { headers })
    return response.data
  } catch (error) {
    console.error('API Axios Error:', error.response || error.message)
    throw error
  }
}

export default API
