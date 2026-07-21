import axios from "axios";

export const axiosInstance=axios.create({
    baseURL:"http://localhost:2724",
    withCredentials:true,
});



axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("AccessToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);