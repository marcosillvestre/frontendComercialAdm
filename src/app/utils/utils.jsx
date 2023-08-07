import axios from 'axios';



const URI = axios.create({
    baseURL: `${import.meta.env.VITE_API}`
})


export default URI