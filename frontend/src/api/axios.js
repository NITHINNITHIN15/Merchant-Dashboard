import axios from "axios";
// import { getToken} from "../utils/auth";
import { getToken, logout } from "../utils/auth";

const api = axios.create({
  baseURL: "http://localhost:5000/api", 
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      logout(); 
      window.location.href = "/login"; 
    }
    return Promise.reject(err);
  }
);

export default api;
