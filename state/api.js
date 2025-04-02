import axios from 'axios'

const methods = {
  GET: axios.get,
  PUT: axios.put,
  POST: axios.post,
}

const API = async (method, url, data = null) => {
  try {
    const response = await methods[method](url, data)
    return response.data
  } catch (error) {
    console.error('API Axios Error:', error.response || error.message)
    throw error
  }
}

export default API
