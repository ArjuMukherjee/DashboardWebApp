import axios from 'axios';

const baseUrl = 'https://dashboardwebapp-backend.onrender.com'
const AxiosInstance = axios.create({
    baseURL: baseUrl, 
    headers: {
        "Content-Type": "application/json", 
        accept: "application/json"
    }
})

export default AxiosInstance