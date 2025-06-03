import axios from '../infraestructura/http/axios';

export class ServicioComprobantes {
  async getComprobanets(skip, limit, id, isReviewed) {
    try {
      const token = localStorage.getItem('token');
      let url = `/v1/paymentproofs/all?skip=${skip}&limit=${limit}`;
      if (id) {
        url += `&quoteId=${encodeURIComponent(id)}`;
      }
      if (isReviewed !== undefined) {
        url += `&isReviewed=${encodeURIComponent(isReviewed)}`;
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response data:", response.data);
      console.log("url:", url);
      return response.data || [];
    } catch (error) {
      console.error("Error al obtener comprobante:", error);
      throw error;
    }
  }

async subirComprobante(formData) {
  try {
    const { data } = await axios.post('/v1/paymentproofs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return data;
  } catch (error) {
    console.error('Error uploading comprobante:', error);
    throw error;
  }
}

  async eliminarComprobante(id) {
    try {
      const response = await axios.delete(`/v1/paymentproofs?id=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al eliminar comprobante:", error.response?.data || error);
      throw error;
    }
  }
async obtenerComprobantePorId(id) {
  try {
    const response = await axios.get(`/v1/paymentproofs?id=${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      responseType: 'blob',
    });
    return response;
  } catch (error) {
    console.error("Error al obtener comprobante por ID:", error.response?.data || error);
    throw error;
  }
}
}
