import axios from '../infraestructura/http/axios';

export class ServicioCotizaciones {
    async getCotizaciones(skip, limit) {
        try {
            let url = `/v1/quotes/all?skip=${skip}&limit=${limit}`
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error("Error al obtener cotizaciones:", error);
            throw error;
        }
    }

    async agregarCotizacion(cotizacion) {
        try {
            const payload = {
                typeOfServiceID: cotizacion.typeOfServiceID,
                clientID: cotizacion.clientID,
                description: cotizacion.description,
            };

            const response = await axios.post(`/v1/quotes`, payload);

            return response.data;
        } catch (error) {
            console.error("Error al agregar cotización:", error);
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

            const response = await axios.put(`/v1/quotes?id=${cotizacion._id}`, payload);
            return response.data;
        }
        catch (error) {
            console.error("Error al actualizar cotización:", error);
            throw error;
        }
    }

    async eliminarCotizacion(id) {
        try {
            const response = await axios.delete(`/v1/quotes?id=${id}`);
            return response.data;
        } catch (error) {
            console.error("Error al eliminar cotización:", error);
            throw error;
        }
    }

    async obtenerCotizacionPorId(id) {
        try {
            const response = await axios.get(`/v1/quotes?id=${id}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener cotización por ID:", error);
            throw error;
        }
    }
}