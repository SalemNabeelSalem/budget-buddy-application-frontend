import axios from "axios";

import {BACKEND_BASE_URL} from "./api-endpoints";

import toast from "react-hot-toast";

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
    if (error.response) {
      if (error.response.status === 400) {
        // alert("400 Bad Request: The request was invalid. Please check your input and try again.");
        toast.error(
          `400 Bad Request: ${error.response.data.message || "The request was invalid. Please check your input and try again."}`
        );
      } else if (error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else if (error.response.status === 403) {
        toast.error(
          `403 Forbidden: ${error.response.data.message || "You do not have permission to access this resource."}`
        );
      } else if (error.response.status === 409) {
        toast.error(
          `409 Conflict: ${error.response.data.message || "The request could not be completed due to a conflict with the current state of the resource."}`
        );
      } else if (error.response.status === 500) {
        toast.error(
          `500 Internal Server Error: ${error.response.data.message || "An unexpected error occurred on the server. Please try again later."}`
        );
      }
    } else if (error.request) {
      toast.error(
        `Network Error: ${error.message || "Unable to connect to the server. Please check your internet connection and try again."}`
      )
    } else {
      toast.error(
        `Error: ${error.message || "An unexpected error occurred. Please try again."}`
      );
    }

    return Promise.reject(error);
  }
);

export default AxiosConfig;