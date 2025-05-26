<template>
  <div class="w-full max-w-5xl mx-auto bg-white p-6 rounded shadow">
    <h2 class="text-xl font-bold mb-4">Mis Cotizaciones</h2>

    <div v-if="cotizaciones && cotizaciones.length">
      <table class="w-full table-auto border">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2 text-left">Fecha</th>
            <th class="px-4 py-2 text-left">Servicio</th>
            <th class="px-4 py-2 text-left">Descripción</th>
            <th class="px-4 py-2 text-left">Estado</th>
            <th class="px-4 py-2 text-left">Precio</th>
            <th v-if="role === 'admin'" class="px-4 py-2 text-left">Acción</th>

          </tr>
        </thead>
        <tbody>
          <tr
            v-for="c in cotizaciones"
            :key="c.id"
            class="border-t hover:bg-gray-50"
          >
            <td class="px-4 py-2">{{ formatDate(c.time) }}</td>
            <td class="px-4 py-2">{{ getServiceName(c.typeOfServiceID) }}</td>
            <td class="px-4 py-2">{{ c.description }}</td>
            <td class="px-4 py-2 capitalize">{{ c.state }}</td>
            <td class="px-4 py-2">
                {{
                    getServicePrice(c.typeOfServiceID)
                    ? `$${getServicePrice(c.typeOfServiceID).toFixed(2)}`
                    : 'N/A'
                }}
            </td>

            <td v-if="role === 'admin'" class="px-4 py-2">
                <button @click="verDetalle(c.id)" class="text-blue-600 hover:underline text-sm">
                    Ver detalle
                </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-else class="text-gray-500">No tienes cotizaciones registradas.</p>
  </div>

  <QuoteDetail
  v-if="verDetalleId"
  :id="verDetalleId"
  @cerrar="verDetalleId = null"
/>


</template>

<script setup>
import { Dialog } from '@headlessui/vue'
import { ref, onMounted } from 'vue'
import { ServicioCotizaciones } from '../../../lib/application/cotizaciones/cotizaciones'
import { TypeOfServiceService } from '../../../lib/application/tipoServicio/typeOfService'
import QuoteDetail from './QuoteDetail.vue'

const role = ref('admin')
const cotizaciones = ref([])
const servicios = ref([])

const cotizacionApi = new ServicioCotizaciones()
const tipoServicioApi = new TypeOfServiceService()

onMounted(async () => {
  try {
    const data = await cotizacionApi.getCotizaciones(1, 50)
    cotizaciones.value = data

    const { items } = await tipoServicioApi.getTypes(1, 100)
    servicios.value = items
  } catch (error) {
    console.error('Error al cargar cotizaciones o servicios', error)
  }
})

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function getServiceName(serviceId) {
  const servicio = servicios.value.find(s => s.id === serviceId)
  return servicio ? servicio.name : 'Desconocido'
}

function getServicePrice(serviceId) {
  const servicio = servicios.value.find(s => s.id === serviceId)
  return servicio ? servicio.price : null
}


//Var para controlar la visibilidad del detalle administrativo
const verDetalleId = ref(null)
function verDetalle(id) {
  verDetalleId.value = id
}
</script>