// src/lib/application/tipoServicio/typeOfService.ts
import axios from '../infraestructura/http/axios';

export class AvailabilityService {
  // GET paginado + búsqueda
  async getAvailability(page = 1, limit = 10, start_time, end_time, is_booked ) {
    try {
      let url = `/v1/availabilityslots?limit=${limit}&skip=${page}`;

      if (start_time) {
        url += `&start_time=${encodeURIComponent(start_time)}`;
      }
            if (end_time) {
        url += `&end_time=${encodeURIComponent(end_time)}`;
      }
            if (is_booked) {
        url += `&is_booked=${encodeURIComponent(is_booked)}`;
      }

      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log('Response data:', data);

      return {
        meta:  data.data.meta,
        items: data.data.slots,
        isLastPage: data.data.slots.length < limit,
      };
    } catch (error) {
      console.error('Error fetching types of service:', error);
      throw error;
    }
  }

  // POST
  async addSlot(payload) {
    try {
      const { data } = await axios.post('/v1/availabilityslots', payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return data.data;
    } catch (error) {
      console.error('Error adding type of service:', error.response?.data || error);
      throw error;
    }
  }

async updateSlot({ id, StartTime, EndTime, is_booked }) {
  try {
    if (!id) throw new Error('ID de tipo de servicio no proporcionado');

    const url = `/v1/availabilityslots?id=${encodeURIComponent(id)}`;

    const body = {};
    if (StartTime !== undefined) body.StartTime = StartTime;
    if (EndTime !== undefined) body.EndTime = EndTime;
    if (is_booked !== undefined) body.is_booked = is_booked;

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
  async deleteSlot(id) {
    try {
      const { data } = await axios.delete(`/v1/availabilityslots?id=${encodeURIComponent(id)}`, {
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
}
