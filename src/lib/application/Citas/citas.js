// src/lib/application/tipoServicio/typeOfService.ts
import axios from '../infraestructura/http/axios';

export class AppointmentsService {
  // GET paginado + búsqueda
  async getAppointments(page = 1, limit = 10, start_time, end_time, state ) {
    try {
      let url = `/v1/appointments/all?limit=${limit}&skip=${page}`;

      if (start_time) {
        url += `&startDate=${encodeURIComponent(start_time)}`;
      }
            if (end_time) {
        url += `&endDate=${encodeURIComponent(end_time)}`;
      }
            if (state) {
        url += `&state=${encodeURIComponent(state)}`;
      }

      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log('Response data:', data);

      return {
items: data.data.appointments,
isLastPage: data.data.appointments.length < limit,
      };
    } catch (error) {
      console.error('Error fetching types of service:', error);
      throw error;
    }
  }

    async getAppointmentById(id, start_time, end_time, state ) {
    try {
      let url = `/v1/appointments?id=${id}`;

      if (start_time) {
        url += `&startDate=${encodeURIComponent(start_time)}`;
      }
            if (end_time) {
        url += `&endDate=${encodeURIComponent(end_time)}`;
      }
            if (state) {
        url += `&state=${encodeURIComponent(state)}`;
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
  async createAppointment(payload) {
    try {
      const { data } = await axios.post('/v1/appointments', payload, {
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

async updateSlot({ id, slotId }) {
  try {
    if (!id) throw new Error('ID de tipo de servicio no proporcionado');

    const url = `/v1/appointments?id=${encodeURIComponent(id)}`;

    const body = {};
    if (slotId !== undefined) body.slotId = slotId;


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
      const { data } = await axios.delete(`/v1/appointments?id=${encodeURIComponent(id)}`, {
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
