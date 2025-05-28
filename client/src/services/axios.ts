import axios from "axios";
import {SERVER_URL} from '../utils/constants'

const protectedAxios = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json'
  },
  withCredentials: true
})

export default protectedAxios