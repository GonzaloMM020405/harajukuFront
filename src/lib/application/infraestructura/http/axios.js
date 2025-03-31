import axios from 'axios';
import store from '../../../../vuex'; 

// Configuración base
const api = axios.create({
  baseURL: 'http://127.0.0.1:8080', // URL del backend
  withCredentials: true, // Necesario para cookies/tokens en CORS
  headers: {
    'Content-Type': 'application/json', // Header por defecto
  },
});

// Interceptor de solicitudes (request)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Interceptor de respuestas (response)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Limpia almacenamiento local y Vuex
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      localStorage.removeItem('permisos');
      store.dispatch('logout');
    }

    return Promise.reject(error);
  }
);

export default api;
