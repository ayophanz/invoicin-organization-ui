import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.common.Accept = 'application/json';
axios.interceptors.request.use(
    (config) => {
        if (localStorage.getItem('id_token')) {
            config.headers.Authorization = `Bearer ${localStorage.getItem('id_token')}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axios;