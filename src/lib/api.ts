// lib/api.ts
import axios from "axios";
import Cookies from "js-cookie"; // Si usas cookies


const urlBase = process.env.NEXT_PUBLIC_BACKEND_URL;
const api = axios.create({
  baseURL: urlBase, // <-- Cambia por tu BASE_URL real
});

// Interceptor para agregar token a cada request
api.interceptors.request.use((config) => {
// Si el token está en cookie:
  const token = Cookies.get("token");
  // O si usas localStorage:
  // const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

export default api;
