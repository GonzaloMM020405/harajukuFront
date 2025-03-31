import axios from '../../application/infraestructura/http/axios';

export class LoginService {
    async login(email, password, store) {
      try {
        // Realiza la solicitud de autenticación
        const { data } = await axios.post('/v1/users/login', { email, password });
  
        // Verifica si la respuesta y los datos existen
        if (!data || !data.usuario || !data.token) {
          throw new Error("Datos de usuario o token no disponibles");
        }
  
        // Desestructurar la data para mayor claridad
        const { usuario: usuarioData, token } = data;
  
        // Crear instancia de la entidad Usuario
        const usuario = new Usuario(
          new id_usuario(usuarioData.id_usuario),
          new nombre_usuario(usuarioData.nombre_usuario),
          new correo_usuario(usuarioData.correo_usuario)
        );
  
        // Guardar el token en localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));
        localStorage.setItem('email', JSON.stringify(email));
  
        // Almacenar usuario y token en el store
        store.dispatch('setUser', { user: usuario, token });
  
        // Retorna el usuario y el token
        return { usuario, token };
  
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