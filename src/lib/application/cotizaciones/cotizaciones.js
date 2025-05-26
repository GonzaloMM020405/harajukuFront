import axios from '../infraestructura/http/axios';

export class ServicioCotizaciones {
  async getCotizaciones(skip, limit) {
    try {
      const token = localStorage.getItem('token');
      let url = `/v1/quotes/all?skip=${skip}&limit=${limit}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data.quotes || []
    } catch (error) {
      console.error("Error al obtener cotizaciones:", error);
      throw error;
    }
  }

  async agregarCotizacion(cotizacion) {
    try {
      // Verifica si hay archivos
      const hasFiles = cotizacion.files && cotizacion.files.length > 0;

      if (hasFiles) {
        // Construye FormData
        const formData = new FormData();
        formData.append('typeOfServiceID', cotizacion.typeOfServiceID);
        formData.append('description', cotizacion.description);

        cotizacion.files.forEach(file => {
          formData.append('file', file); 
        });

        const response = await axios.post('/v1/quotes?file', formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        return response.data;
      } else {
        // Sin archivos, enviar como JSON
        const payload = {
          typeOfServiceID: cotizacion.typeOfServiceID,
          description: cotizacion.description,
        };

        const response = await axios.post('/v1/quotes', payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        return response.data;
      }
    } catch (error) {
      console.error("Error al agregar cotización:", error.response?.data || error);
      throw error;
    }
  }

  async actualizarCotizacion(cotizacion) {
    try {
      const payload = {
        typeOfServiceID: cotizacion.typeOfServiceID,
        clientID: cotizacion.clientID,
        description: cotizacion.description,
        state: cotizacion.state,
        price: cotizacion.price,
        testRequired: cotizacion.testRequired,
      };

      const response = await axios.put(`/v1/quotes?id=${cotizacion._id}`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error al actualizar cotización:", error.response?.data || error);
      throw error;
    }
  }

  async eliminarCotizacion(id) {
    try {
      const response = await axios.delete(`/v1/quotes?id=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al eliminar cotización:", error.response?.data || error);
      throw error;
    }
  }

  async obtenerCotizacionPorId(id) {
    try {
      const response = await axios.get(`/v1/quotes?id=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error al obtener cotización por ID:", error.response?.data || error);
      throw error;
    }
  }
}
