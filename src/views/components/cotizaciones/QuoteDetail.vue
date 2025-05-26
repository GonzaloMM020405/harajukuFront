<template>
  <div class="mt-6 p-4 border rounded bg-gray-50 shadow">
    <h3 class="text-lg font-bold mb-2">Detalle de Cotización</h3>

    <div v-if="cotizacion">
      <p><strong>ID:</strong> {{ cotizacion.id }}</p>
      <p><strong>Descripción:</strong> {{ cotizacion.description }}</p>
      <p><strong>Estado:</strong> {{ cotizacion.state }}</p>
      <p><strong>Precio:</strong> {{ cotizacion.price ? `$${cotizacion.price.toFixed(2)}` : 'N/A' }}</p>
      <p><strong>Fecha:</strong> {{ formatDate(cotizacion.time) }}</p>
    </div>

    <div v-else class="text-gray-500">Cargando detalle de cotización...</div>

    <button @click="$emit('cerrar')" class="mt-4 px-4 py-2 bg-red-500 text-white rounded">
      Cerrar
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { ServicioCotizaciones } from '../../../lib/application/cotizaciones/cotizaciones'

const props = defineProps({
  id: String
})

const cotizacion = ref(null)
const cotizacionApi = new ServicioCotizaciones()

async function loadCotizacion() {
  if (!props.id) return
  try {
    const response = await cotizacionApi.obtenerCotizacionPorId(props.id)
    cotizacion.value = response
    console.log('Cotización recibida:', cotizacion.value)
  } catch (err) {
    console.error('Error cargando detalle:', err)
  }
}

watch(
  () => props.id,
  async (newId) => {
    if (newId) {
      await loadCotizacion()
    }
  },
  { immediate: true } // 👈 ejecuta la primera vez que entra
)

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
