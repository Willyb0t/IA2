import axios from 'axios'

export default axios.create({
    baseURL: 'http://192.168.1.51:8000/api/move/'
})