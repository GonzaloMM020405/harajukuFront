<template>
  <div class="p-6 space-y-6 bg-gray-100 min-h-screen">

    <!-- Filtros y acciones -->
    <div class="bg-white p-4 rounded-lg shadow flex flex-wrap items-end gap-4">
      <div class="flex flex-col">
        <label class="text-sm font-medium text-gray-700 mb-1">Desde</label>
        <input v-model="startTime" type="datetime-local" class="input w-56" />
      </div>

      <div class="flex flex-col">
        <label class="text-sm font-medium text-gray-700 mb-1">Hasta</label>
        <input v-model="endTime" type="datetime-local" class="input w-56" />
      </div>

      <div class="flex flex-col">
        <label class="text-sm font-medium text-gray-700 mb-1">Estado</label>
        <select v-model="isBooked" class="input w-40">
          <option :value="null">Todos</option>
          <option :value="true">Reservados</option>
          <option :value="false">Disponibles</option>
        </select>
      </div>

      <div class="ml-auto flex gap-2 mt-4 sm:mt-0">
        <button
          class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          @click="showAddModal = true"
        >
          + Nuevo horario
        </button>

        <button
          v-if="selectedIds.length"
          @click="deleteSelected"
          class="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
        >
          Eliminar seleccionados ({{ selectedIds.length }})
        </button>
      </div>
    </div>

    <!-- Tabla de horarios -->
    <AvailabilityTable
      :types="types"
      :selectedIds="selectedIds"
      @updateSelected="selectedIds = $event"
      @editType="editType"
    />

    <!-- Paginación -->
    <div class="flex justify-between items-center">
      <button
        @click="prev"
        :disabled="currentPage === 1"
        class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        ← Anterior
      </button>

      <span class="text-sm font-medium text-gray-600">Página {{ currentPage }}</span>

      <button
        @click="next"
        :disabled="isLastPage"
        class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Siguiente →
      </button>
    </div>

    <!-- Modal -->
    <AvailabilityModal
      v-if="showAddModal || editingType !== null"
      :typeToEdit="editingType"
      @saved="onSaved"
      @close="closeModal"
    />
  </div>
</template>


<script>
import { mapGetters } from 'vuex';
import { AvailabilityService } from '../../../lib/application/Disponibilidad/disponibilidad';
import { ref } from 'vue';


import AvailabilityTable from './AvailabilityTable.vue';
import AvailabilityModal from './AvailabilityModal.vue';

export default {
  components: { AvailabilityTable, AvailabilityModal },
  data() {
    return {
      searchQuery: '',
      types: [],
      currentPage: 1,
      limit: 10,
      isLastPage: false,
      showAddModal: false,
      editingType: null,
      availabilityService: new AvailabilityService(),
      selectedIds: [],
      startTime: '',
    endTime: '',
    isBooked: null,
    };
  },
  mounted() {
    this.loadSlots();
  },
  computed: {
  calendarEvents() {
    return this.types.map(slot => ({
      id: slot.id,
      title: slot.isBooked ? 'Reservado' : 'Disponible',
      start: slot.startTime,
      end: slot.endTime,
      color: slot.isBooked ? '#e53e3e' : '#38a169', // rojo o verde
    }));
  }
},
  methods: {
async loadSlots() {
  try {
    const { items, isLastPage } = await this.availabilityService.getAvailability(
      this.currentPage,
      this.limit,
      this.startTime || null,
      this.endTime || null,
      this.isBooked !== null ? this.isBooked : undefined
    );
    this.types = items;
    this.isLastPage = isLastPage;
  } catch (err) {
    console.error('Error loading availability slots:', err);
  }
},
    updateSelected(list) {
  this.selectedIds = list;
},
async deleteSelected() {
  if (!this.selectedIds.length) return;

  const confirmed = confirm('¿Estás seguro de que deseas eliminar los tipos seleccionados?');
  if (!confirmed) return;

  try {
    await Promise.all(this.selectedIds.map(id => this.availabilityService.deleteSlot(id)));
    this.selectedIds = [];
    await this.loadSlots(); // Recarga la lista
  } catch (error) {
    console.error('Error eliminando tipos:', error);
  }
},
    next() {
      if (!this.isLastPage) {
        this.currentPage += 1;
        this.loadSlots();
      }
    },
    prev() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
        this.loadSlots();
      }
    },
editType(type) {
  this.editingType = { ...type };
},
    onSaved() {
      this.closeModal();
      this.loadSlots();
    },
closeModal() {
  this.showAddModal = false;
  this.editingType = null;
},
  },
};
</script>
