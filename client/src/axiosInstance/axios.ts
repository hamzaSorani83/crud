import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost/react/crud/server/api/',
})

export default instance;