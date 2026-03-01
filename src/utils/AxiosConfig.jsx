import axios from "axios";

import {BACKEND_BASE_URL} from "./api-endpoints";

const AxiosConfig = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

const ExcludeEndpoints = [
  "/profile/login",
  "/profile/register",
  "/profile/activate",
  "/status",
  "/health",
];

// request interceptor to add token to headers
AxiosConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token && !ExcludeEndpoints.some((endpoint) => config.url.includes(endpoint))) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor to handle errors globally
AxiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) { // handle specific status codes
      if (error.response.status === 400) {
        alert("400 Bad Request");
      } else if (error.response.status === 401) { // unauthorized, token might be invalid or expired
        localStorage.removeItem("token");
        window.location.href = "/login"; // redirect to login page
      } else if (error.response.status === 403) { // forbidden, user does not have permission
        alert("403 Forbidden: You do not have permission to access this resource.");
      } else if (error.response.status === 500) { // internal server error
        alert("An error occurred on the server. Please try again later.");
      }
    } else if (error.request) { // no response received from server
      alert("No response from server. Please check your network connection.");
    } else { // other errors
      alert("An error occurred. Please try again.");
    }

    return Promise.reject(error);
  }
);

export default AxiosConfig;