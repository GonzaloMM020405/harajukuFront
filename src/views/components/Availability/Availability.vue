<template>
  <div>
    <!-- buscador y botón “Nuevo” -->
    <div class="flex justify-between mb-4">
    <input v-model="startTime" type="datetime-local" class="input" />
    <input v-model="endTime" type="datetime-local" class="input ml-2" />
    <select v-model="isBooked" class="input ml-2">
    <option :value="null">Todos</option>
    <option :value="true">Reservados</option>
    <option :value="false">Disponibles</option>
    </select>
      <button class="btn-primary" @click="showAddModal = true">
        Nuevo horario disponible
      </button>
      <button
  v-if="selectedIds.length"
  @click="deleteSelected"
  class="mb-4 px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
>
  Eliminar seleccionados ({{ selectedIds.length }})
</button>

    </div>

<AvailabilityTable
  :types="types"
  :selectedIds="selectedIds" 
  @updateSelected="selectedIds = $event"
  @editType="editType"
/>


    <!-- paginación -->
    <div class="mt-4 flex justify-between">
      <button @click="prev" :disabled="currentPage === 1">Anterior</button>
      <span>Página {{ currentPage }}</span>
      <button @click="next" :disabled="isLastPage">Siguiente</button>
    </div>

    <!-- modal crear / editar -->
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
