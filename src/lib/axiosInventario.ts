import axios from "axios";

const axiosInventario = axios.create({
  baseURL:
    import.meta.env.VITE_API_INVENTARIO_URL || "http://localhost:8081/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

axiosInventario.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "API Inventario Error:",
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

export default axiosInventario;
