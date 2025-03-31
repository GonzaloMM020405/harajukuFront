import axios from '../../application/infraestructura/http/axios';

export class RegisterUser {
    async addUser(user) {
        try {
            const payload = {
              name: user.name,
              email: user.email,
              password: user.password,
            };
        
            const response = await axios.post(`/v1/users/`, payload, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                //'X-User-Email': email
              }
            });
        
            return response.data;
          } catch (error) {
            console.error('Error adding user:', error.response?.data || error);
            throw error;
          }  
    }
}