const { VITE_CLOUDINARY_CLOUD_NAME, VITE_BACKEND_BASE_URL } = import.meta.env;

export const CLOUDINARY_CLOUD_NAME = VITE_CLOUDINARY_CLOUD_NAME;
export const BACKEND_BASE_URL = VITE_BACKEND_BASE_URL;

const endpoints = {
  auth: {
    login: "/profile/login",
    register: "/profile/register",
    activate: "/profile/activate",
  },
  actuator: {
    status: "/status",
    health: "/health",
  },
  cloudinary: {
    upload: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
  },
};

export const API_ENDPOINTS = Object.freeze(endpoints);

/*
export function buildUrl(path) {
  const backendBaseUrl = BACKEND_BASE_URL.replace(/\/+$/, ""); // Remove trailing slashes
  const endpointPath = path.replace(/^\/+/, ""); // Remove leading slashes
  return `${backendBaseUrl}/${endpointPath}`;
}
*/

// console.log(buildUrl(API_ENDPOINTS.actuator.health)); // http://localhost:8080/api/v1.0/status/health