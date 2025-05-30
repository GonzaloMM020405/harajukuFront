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
          @click="openCreateModal"
        >
          + Nueva cita
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

    <!-- Tabla de citas -->
    <CitasTable
      :appointments="appointments"
      :selectedIds="selectedIds"
      @updateSelected="selectedIds = $event"
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
    <CitasModal
      v-if="showAddModal"
      :slots="slotsDisponibles"
      :quotes="quotes"
      @created="onCreated"
      @close="closeModal"
    />
  </div>
</template>

<script>
import CitasTable from './CitasTable.vue';
import CitasModal from './CitasModal.vue';

import { AppointmentsService } from '../../../lib/application/Citas/citas';
import { TypeOfServiceService } from '../../../lib/application/tipoServicio/typeOfService';
import { AvailabilityService } from '../../../lib/application/Disponibilidad/disponibilidad';

export default {
  components: { CitasTable, CitasModal },
  data() {
    return {
      appointments: [],
      slots: [],
      slotsDisponibles: [],
      quotes: [],
      currentPage: 1,
      limit: 10,
      isLastPage: false,
      showAddModal: false,
      selectedIds: [],
      startTime: '',
      endTime: '',
      isBooked: null,
      appointmentsService: new AppointmentsService(),
      quoteService: new TypeOfServiceService(),
      availabilityService: new AvailabilityService(),
    };
  },
  mounted() {
  this.loadAppointments();
  },
  methods: {
async loadAppointments() {
  try {
    const response = await this.appointmentsService.getAppointments(this.currentPage, this.limit);
    this.appointments = response.items; // ← items, no response.data.appointments
    this.isLastPage = response.isLastPage; // ← propiedad calculada
  } catch (err) {
    console.error('Error loading appointments:', err);
  }
},
    async loadSlots() {
      try {
        const { items, isLastPage } = await this.availabilityService.getAvailability(
          this.currentPage,
          this.limit,
          this.startTime || null,
          this.endTime || null,
          this.isBooked !== null ? this.isBooked : undefined
        );
        this.slots = items;
        this.isLastPage = isLastPage;
      } catch (err) {
        console.error('Error loading slots:', err);
      }
    },
    async loadQuotes() {
      try {
        this.quotes = await this.quoteService.getCotizaciones(1, 100, '', '', '');
      } catch (err) {
        console.error('Error loading quotes:', err);
      }
    },
    async openCreateModal() {
      await this.loadSlots(); // Recarga slots (para mostrar disponibles)
      await this.loadQuotes(); // Trae cotizaciones
      this.slotsDisponibles = this.slots.filter(slot => !slot.isBooked);
      this.showAddModal = true;
    },
    async deleteSelected() {
      if (!this.selectedIds.length) return;
      const confirmed = confirm('¿Estás seguro de que deseas eliminar las citas seleccionadas?');
      if (!confirmed) return;

      try {
        await Promise.all(this.selectedIds.map(id => this.appointmentsService.deleteSlot(id)));
        this.selectedIds = [];
        await this.loadSlots();
      } catch (error) {
        console.error('Error eliminando citas:', error);
      }
    },
    next() {
      if (!this.isLastPage) {
        this.currentPage++;
        this.loadSlots();
      }
    },
    prev() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.loadSlots();
      }
    },
    onCreated() {
      this.closeModal();
      this.loadSlots();
    },
    closeModal() {
      this.showAddModal = false;
    },
  },
};
</script>
