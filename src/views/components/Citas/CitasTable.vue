<template>
  <div class="overflow-x-auto shadow-md sm:rounded-lg mb-6">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th class="px-6 py-3">Seleccionar</th>
          <th class="px-6 py-3">ID de la cita</th>
          <th class="px-6 py-3">Usuario</th>
          <th class="px-6 py-3">Estado</th>
          <th class="px-6 py-3">ID del slot</th>
          <th class="px-6 py-3">Comprobante</th>
          <th class="px-6 py-3">Editar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="appointment in appointments" :key="appointment.id" class="bg-white border-b">
          <td class="px-6 py-4">
            <input
              type="checkbox"
              :checked="selectedIds.includes(appointment.id)"
              @change="toggle(appointment.id)"
            />
          </td>
          <td class="px-6 py-4">{{ appointment.id }}</td>
          <td class="px-6 py-4">{{ appointment.userId }}</td>
          <td class="px-6 py-4">
            <span :class="statusColor(appointment.status)">
              {{ appointment.status }}
            </span>
          </td>
          <td class="px-6 py-4">{{ appointment.slotId }}</td>
          <td class="px-6 py-4">
<div v-if="comprobantes[appointment.quoteId]">
<button
  @click="verComprobante(appointment.quoteId)"
  class="text-blue-600 hover:underline"
>
  Ver comprobante
</button>


  <button
    v-if="role === 'admin'"
    @click="eliminar(appointment.quoteId)"
    class="ml-2 text-red-600 hover:underline"
  >
    Eliminar
  </button>
</div>
<div v-else>
  <input type="file" @change="e => handleFileInput(e, appointment.quoteId)" />
  <p v-if="archivosPendientes[appointment.quoteId]" class="mt-2 text-sm text-gray-700">
    Archivo seleccionado: {{ archivosPendientes[appointment.quoteId].name }}
  </p>
  <a href="#" @click.prevent="abrirModal(appointment.id, appointment.quoteId)" class="text-blue-600 hover:underline ml-2">
    Subir desde modal
  </a>
</div>

          </td>
          <td class="px-6 py-4">
            <a href="#" @click.prevent="$emit('editAppointment', appointment)" class="text-blue-600 hover:underline">
              Editar
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
   <div v-if="modalVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div class="bg-white rounded-lg p-6 w-80 relative">
    <h3 class="text-lg font-semibold mb-4">Subir comprobante</h3>
      <input type="file" @change="handleFileChange" />
    <div class="flex justify-end space-x-2">
      <button @click="cancelarModal" class="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
      <button @click="confirmarSubida" :disabled="!archivo" class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
        Subir
      </button>
    </div>
  </div>
</div>
</template>
<script>
import { ServicioComprobantes } from '../../../lib/application/Comprobantes/comprobantes';
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    appointments: Array,
    selectedIds: Array,
  },
  data() {
    return {
      archivosPendientes: {},
      archivo: null,
      modalVisible: false,

    };
  },
  emits: ['updateSelected', 'editAppointment'],
  setup(props, { emit }) {
    const store = useStore();
    const role = computed(() => store.getters.getUserRole);
    const comprobantes = ref({});
    const servicio = new ServicioComprobantes();
    const modalVisible = ref(false);
    const archivo = ref(null);
    const citaSeleccionada = ref(null);
    const quoteIdSeleccionada = ref(null);

    const abrirModal = (citaId, quoteId) => {
      citaSeleccionada.value = citaId;
      quoteIdSeleccionada.value = quoteId;
      modalVisible.value = true;
    };

const handleFileInput = async (event, quoteId) => {
  const file = event.target.files[0];
  if (!file) return;

  archivosPendientes.value[quoteId] = file;

  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('quoteId', quoteId);

    await servicio.subirComprobante(formData);

    archivosPendientes.value[quoteId] = null;
    await cargarComprobantes();
  } catch (error) {
    console.error('Error al subir comprobante:', error);
  }
};


    const cancelarModal = () => {
      modalVisible.value = false;
      archivo.value = null;
      citaSeleccionada.value = null;
      quoteIdSeleccionada.value = null;
    };

    const handleFileChange = (event) => {
      archivo.value = event.target.files[0];
    };

const confirmarSubida = async () => {
  const quoteId = quoteIdSeleccionada.value;
  const file = archivo.value;

  if (!file || !quoteId) return;

  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('quoteId', quoteId);

    await servicio.subirComprobante(formData);
    await cargarComprobantes();

    archivo.value = null;
    cancelarModal();
  } catch (error) {
    console.error('Error al subir comprobante:', error);
  }
};


    const cargarComprobantes = async () => {
      try {
        const todos = await servicio.getComprobanets(1, 100);
        comprobantes.value = {};
        console.log('Comprobantes cargados:', todos);

        for (const comprobante of todos) {
          const quoteId = comprobante.quoteId;
          // Solo guardamos el primero si hay varios
          if (quoteId && !comprobantes.value[quoteId]) {
            comprobantes.value[quoteId] = comprobante;
          }
        }
      } catch (error) {
        console.error('Error al cargar comprobantes:', error);
      }
    };


    const verComprobante = async (quoteId) => {
  try {
    const response = await servicio.obtenerComprobantePorId(quoteId);
    const blob = new Blob([response.data], { type: response.headers['content-type'] });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank'; // abre en nueva pestaña
    link.download = `comprobante-${quoteId}`; // nombre por defecto si se descarga

    link.click();

    setTimeout(() => URL.revokeObjectURL(url), 100);
  } catch (error) {
    console.error("Error al ver comprobante:", error);
  }
};

    const eliminar = async (quoteId) => {
      try {
        await servicio.eliminarComprobante(quoteId);
        delete comprobantes.value[quoteId];
      } catch (error) {
        console.error('Error al eliminar comprobante:', error);
      }
    };

    onMounted(() => {
      cargarComprobantes();
    });

    return {
      role,
      comprobantes,
      eliminar,
      abrirModal,
      modalVisible,
      cancelarModal,
      handleFileChange,
      confirmarSubida,
      archivo,
      handleFileInput,
      verComprobante,
    };
  },
  methods: {
    toggle(id) {
      const list = this.selectedIds.includes(id)
        ? this.selectedIds.filter((x) => x !== id)
        : [...this.selectedIds, id];
      this.$emit('updateSelected', list);
    },
    statusColor(status) {
      switch (status) {
        case 'pending':
          return 'text-yellow-500';
        case 'confirmed':
          return 'text-green-600';
        case 'cancelled':
          return 'text-red-600';
        default:
          return 'text-gray-600';
      }
    },
  },
};
</script>