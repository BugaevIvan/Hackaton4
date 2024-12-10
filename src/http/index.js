import axios from "axios";

const $api = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:5170/api",
});
$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});