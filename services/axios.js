import axios from 'axios'

const api = axios.create({
  baseURL: 'https://frontend-test.idaproject.com/api/',
  headers: {'X-Custom-Header': 'ida-api'}
})

export default api
