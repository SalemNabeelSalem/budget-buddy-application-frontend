export const BASE_URL = "https://budget-buddy-application-backend.onrender.com/api/v1.0";

export const API_ENDPOINTS = {
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