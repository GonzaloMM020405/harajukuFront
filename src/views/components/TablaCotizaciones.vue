<template>
  <div class="p-4 space-y-4">

    <!-- Barra de búsqueda -->
    <div class="flex items-center justify-between">
      <div class="relative w-full max-w-sm">
        <input
          v-model="searchQuery"
          type="text"
          class="w-full px-4 py-2 pr-10 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          placeholder="Buscar Cotizaciones"
        />
        <!-- Ícono de búsqueda (ej. Heroicons) -->
        <svg
          class="w-5 h-5 absolute right-3 top-2.5 text-gray-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.3 3.3a7.5 7.5 0 016.4 13.4z"
          />
        </svg>
      </div>
    </div>

    <!-- Tabla -->
    <div class="overflow-x-auto">
      <table class="min-w-full border border-gray-200 text-sm">
        <thead class="bg-gray-100 text-gray-700">
          <tr>
            <th class="px-4 py-2 text-left">Referencia</th>
            <th class="px-4 py-2 text-left">Servicio(s)</th>
            <th class="px-4 py-2 text-left">Fecha de respuesta</th>
            <th class="px-4 py-2 text-left">Estatus</th>
            <th class="px-4 py-2 text-left">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <!-- Ciclo para mostrar las cotizaciones filtradas -->
          <tr
            v-for="(cotizacion, index) in filteredCotizaciones"
            :key="index"
            class="border-b border-gray-200"
          >
            <td class="px-4 py-2">{{ cotizacion.referencia }}</td>
            <td class="px-4 py-2">{{ cotizacion.servicios }}</td>
            <td class="px-4 py-2">{{ cotizacion.fecha }}</td>
            <td class="px-4 py-2">{{ cotizacion.estatus }}</td>
            <td class="px-4 py-2 font-semibold">
              ${{ cotizacion.subtotal.toLocaleString() }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Totales -->
    <div class="flex justify-end space-x-6 items-center">
      <div class="text-right">
        <p>Productos: <span class="font-semibold">${{ totalProductos }}</span></p>
        <p>Servicio: <span class="font-semibold">${{ totalServicios }}</span></p>
      </div>
      <div class="bg-blue-50 border border-blue-100 px-6 py-3 rounded">
        <p class="text-xl font-bold text-gray-800">Total ${{ granTotal }}</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "TablaCotizaciones",
  data() {
    return {
      searchQuery: "",
      cotizaciones: [
        // Aquí puedes agregar cuantas filas necesites
        {
          referencia: "Tinte",
          servicios: "Corte, Peinado",
          fecha: "7/11/2024",
          estatus: "Cotizado",
          subtotal: 400,
        },
      ],
      // Ejemplo de totales (podrías calcularlos dinámicamente según la data real)
      totalProductos: 100,
      totalServicios: 300,
    };
  },
  computed: {
    granTotal() {
      return this.totalProductos + this.totalServicios;
    },
    filteredCotizaciones() {
      // Filtrado básico por 'searchQuery'
      const query = this.searchQuery.toLowerCase();
      return this.cotizaciones.filter((c) =>
        c.referencia.toLowerCase().includes(query)
      );
    },
  },
};
</script>

<style scoped>
/* Puedes agregar estilos adicionales si lo deseas */
</style>
