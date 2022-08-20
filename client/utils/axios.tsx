import defaultAxios from 'axios'

const axios = defaultAxios.create({
  baseURL: "http://192.168.1.58:3000" 
})

export default axios;
