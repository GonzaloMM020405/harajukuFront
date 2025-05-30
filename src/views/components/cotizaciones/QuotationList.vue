<template>
  <div class="w-full max-w-5xl mx-auto bg-white p-6 rounded shadow">
    <h2 class="text-xl font-bold mb-4">Mis Cotizaciones 📗</h2>

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
            <!-- Botón para ver detalle solo si es admin -->
            <td v-if="role === 'admin'" class="px-4 py-2">
                <button @click="verDetalle(c.id)" class="mt-4 px-4 py-2 bg-orange-500 text-white rounded">
                    Revisar
                </button>
                <button @click="confirmarEliminacion(c.id)" class="mt-4 px-4 py-2 bg-red-500 text-white rounded">
                    Eliminar
                </button>
            </td>
            
          </tr>
        </tbody>
      </table>
    </div>

    <p v-else class="text-gray-500">No tienes cotizaciones registradas.</p>
  </div>
  <!--Para hacerlo modal y se despliegue--->

  <Dialog :open="verDetalleId !== null" @close="verDetalleId = null" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4">
      <!-- Fondo difuminado -->
      <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" />

      <!-- Contenido del modal -->
      <div class="relative z-10 w-full max-w-3xl bg-white p-6 rounded-lg shadow-xl">
        <QuoteDetail
          v-if="verDetalleId"
          :id="verDetalleId"
          @cerrar="verDetalleId = null"
        />
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import { Dialog } from '@headlessui/vue'
import { ref, onMounted } from 'vue'
import { ServicioCotizaciones } from '../../../lib/application/cotizaciones/cotizaciones'
import { TypeOfServiceService } from '../../../lib/application/tipoServicio/typeOfService'
import QuoteDetail from './QuoteDetail.vue'

//const role = ref('admin')
import { useStore } from 'vuex'
import { computed } from 'vue'

//valor dinamico 
const store = useStore()
const role = computed(() => store.getters.getUserRole)


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
  if(role.value !== 'admin') {
    alert('Solo los administradores pueden ver los detalles de las cotizaciones.')
    return
  }
  verDetalleId.value = id
}

async function confirmarEliminacion(id) {
  const confirmar = confirm("¿Estás seguro que deseas eliminar esta cotización?");
  if (!confirmar) return;

  try {
    console.log("ID a eliminar:", id);
    await cotizacionApi.eliminarCotizacion(id);
    alert("Cotización eliminada correctamente.");

    await cargarCotizaciones(); // 👈 esta es la forma correcta
  } catch (error) {
    alert("No se pudo eliminar la cotización.");
    console.error("Error al eliminar:", error);
  }
}

async function cargarCotizaciones() {
  try {
    const data = await cotizacionApi.getCotizaciones(skip.value, limit.value);
    cotizaciones.value = data;
  } catch (error) {
    console.error("Error al cargar cotizaciones:", error);
    cotizaciones.value = []; // fallback vacío si falla
  }
}



</script>
