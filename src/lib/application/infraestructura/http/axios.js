import axios from 'axios';
import store from '../../../../vuex'; 

axios.defaults.baseURL = 'http://127.0.0.1:8080';

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(
  response => response, 
  error => {
    if (error.response && error.response.status === 401) {
      const originalRequest = error.config;

      if (originalRequest.url === '/authentication/login') {
        return Promise.reject(error); 
      }

      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      localStorage.removeItem('permisos');
      
      store.dispatch('logout');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default axios;
