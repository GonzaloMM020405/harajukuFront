// src/lib/application/tipoServicio/typeOfService.ts
import axios from '../infraestructura/http/axios';

export class TypeOfServiceService {
  // GET paginado + búsqueda
  async getTypes(page = 1, limit = 10, searchQuery = '') {
    try {
      let url = `/v1/typesofservice/all?limit=${limit}&skip=${page}`;
      if (searchQuery) {
        url += `&filters[name]=${encodeURIComponent(searchQuery)}`;
      }

      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log('Response data:', data);

      return {
        meta:  data.data.meta,
        items: data.data.typeOfServices,
        isLastPage: data.data.typeOfServices.length < limit,
      };
    } catch (error) {
      console.error('Error fetching types of service:', error);
      throw error;
    }
  }

  // POST
  async addType(payload) {
    try {
      const { data } = await axios.post('/v1/typesofservice', payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return data.data;            // nuevo registro
    } catch (error) {
      console.error('Error adding type of service:', error.response?.data || error);
      throw error;
    }
  }

  // PATCH
async updateType({ id, name, price }) {
  try {
    if (!id) throw new Error('ID de tipo de servicio no proporcionado');

    const url = `/v1/typesofservice?id=${encodeURIComponent(id)}`;

    const body = {};
    if (name !== undefined) body.name = name;
    if (price !== undefined) body.price = price;

    const { data } = await axios.put(url, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return data.data;
  } catch (error) {
    console.error('Error updating type of service:', error.response?.data || error);
    throw error;
  }
}


  // DELETE
  async deleteType(id) {
    try {
      const { data } = await axios.delete(`/v1/typesofservice?id=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return data;
    } catch (error) {
      console.error('Error deleting type of service:', error.response?.data || error);
      throw error;
    }
  }

  async getTypeById(id) {
    try {
      const { data } = await axios.get(`/v1/typesofservice/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return data.data;
    } catch (error) {
      console.error('Error fetching type of service by ID:', error.response?.data || error);
      throw error;
    }
  }
}
