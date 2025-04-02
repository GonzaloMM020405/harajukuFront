import axios from '../../application/infraestructura/http/axios';

export class LoginService {
    async login(email, password, store) {
        try {
            // Realiza la solicitud de autenticación
            const { data } = await axios.post(`/v1/users/login`, { email, password });

            // Verifica si la respuesta tiene éxito y contiene el token
            if (!data || !data.data || !data.data.token) {
              throw new Error("Datos de usuario o token no disponibles");
          }
          

            // Extraer el token correctamente
            const { token } = data.data;

            // Guardar el token en localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('email', email);  // Guardar el email si es necesario

            // Almacenar usuario y token en el store (si es necesario)
            store.dispatch('setUser', { user: email, token });

            // Retorna el token correctamente
            return { token };

        } catch (error) {
            // Manejo de errores específicos
            if (error.response && error.response.status === 401) {
                throw new Error('Email o contraseña incorrectos');
            } else {
                console.error('Error en la autenticación:', error);
                throw new Error('Error en la autenticación: ' + (error.response?.data?.message || error.message));
            }
        }
    }
}
