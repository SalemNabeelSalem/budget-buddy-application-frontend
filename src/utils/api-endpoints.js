// const BACKEND_BASE_URL = "http://localhost:8080/api/v1.0";

const endpoints = {
  auth: {
    login: "/profile/login",
    register: "/profile/register",
    activate: "/profile/activate",
  },
  actuator: {
    status: "/status",
    health: "/health",
  }
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