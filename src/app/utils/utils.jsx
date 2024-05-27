import axios from 'axios';

const URI = axios.create({
    baseURL: `${import.meta.env.VITE_API}`
})


URI.interceptors.request.use(async config => {
    const userData = await localStorage.getItem('userData')
    const token = userData && JSON.parse(userData).token
    config.headers.Authorization = `Bearer ${token}`
    return config
})


export default URI