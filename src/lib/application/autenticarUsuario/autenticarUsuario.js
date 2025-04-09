import axios from '../../application/infraestructura/http/axios';

export class LoginService {
    async login(email, password, store) {
        try {
            // Realiza la solicitud de autenticación
            const { data } = await axios.post(`/v1/users/login`, { email, password });

            if (!data || !data.data || !data.data.token || !data.data.role) {
                throw new Error("Datos de usuario, token o rol no disponibles");
            }

            // Extraer el token correctamente
            const { token, role } = data.data;

            // Guardar el token en localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('email', email);
            localStorage.setItem('role', role)

            // Almacenar usuario y token en el store (si es necesario)
            store.dispatch('setUser', { user: email, token, role });

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
