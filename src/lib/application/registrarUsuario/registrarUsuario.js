import axios from '../../application/infraestructura/http/axios';

export class RegisterUser {
    async addUser(user) {
        try {
            const payload = {
              name: user.name,
              email: user.email,
              password: user.password,
            };
            console.log('Payload:', payload);
        
            const response = await axios.post(`/v1/users/`, payload);
            console.log('User added successfully:', response.data);
            console.log('payload:', payload);
      
            return response.data;
          } catch (error) {
            if (error.response) {
                // Extrae el mensaje de error del backend si existe
                const backendError = error.response.data?.messages?.[0] || 
                                    error.response.data?.message || 
                                    'Error desconocido del servidor';
                
                // Crea un nuevo error con el mensaje del backend
                const formattedError = new Error(backendError);
                formattedError.status = error.response.status;
                
                throw formattedError;
            } else {
                throw new Error('Error de conexión con el servidor');
            }
        }
    }
}