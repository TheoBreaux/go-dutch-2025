import axios from 'axios'

const methods = {
  GET: axios.get,
  PUT: axios.put,
  POST: axios.post,
}

const API = async (method, url, data = null) => {
  // Define headers, especially for POST/PUT requests
  const headers = {
    'Content-Type': 'application/json',
  }

  try {
    const response = await methods[method](url, data, { headers })
    // console.log('RESPONSE: ', response)
    return response.data
  } catch (error) {
    console.error('API Axios Error:', error.response || error.message)
    throw error
  }
}

export default API
