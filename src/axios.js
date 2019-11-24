import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8080'
});

axiosInstance.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';

export default axiosInstance;