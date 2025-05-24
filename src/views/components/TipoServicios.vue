<template>
  <div>
    <!-- buscador y botón “Nuevo” -->
    <div class="flex justify-between mb-4">
      <input
        v-model="searchQuery"
        @keyup.enter="loadTypes"
        placeholder="Buscar…"
        class="input w-64"
      />
      <button class="btn-primary" @click="showAddModal = true">
        Nuevo tipo de servicio
      </button>
      <button
  v-if="selectedIds.length"
  @click="deleteSelected"
  class="mb-4 px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
>
  Eliminar seleccionados ({{ selectedIds.length }})
</button>

    </div>

<TypeTable
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
    <TypeModal
      v-if="showAddModal || editingType"
      :typeToEdit="editingType"
      @saved="onSaved"
      @close="closeModal"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { TypeOfServiceService } from '../../lib/application/tipoServicio/typeOfService';

import TypeTable from './Tabla/TypeTable.vue';
import TypeModal from './Tabla/TypeModal.vue';

export default {
  components: { TypeTable, TypeModal },
  data() {
    return {
      searchQuery: '',
      types: [],
      currentPage: 1,
      limit: 10,
      isLastPage: false,
      showAddModal: false,
      editingType: null,
      typeService: new TypeOfServiceService(),
      selectedIds: [],
    };
  },
  mounted() {
    this.loadTypes();
  },
  
  methods: {
    async loadTypes() {
      try {        
        const { items, isLastPage } = await this.typeService.getTypes(
          this.currentPage,
          this.limit,
          this.searchQuery,
        );
        this.types = items;
        this.isLastPage = isLastPage;
      } catch (err) {
        console.error('Error loading types:', err);
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
    await Promise.all(this.selectedIds.map(id => this.typeService.deleteType(id)));
    this.selectedIds = [];
    await this.loadTypes(); // Recarga la lista
  } catch (error) {
    console.error('Error eliminando tipos:', error);
  }
},
    next() {
      if (!this.isLastPage) {
        this.currentPage += 1;
        this.loadTypes();
      }
    },
    prev() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
        this.loadTypes();
      }
    },
    editType(type) {
      this.editingType = { ...type };
    },
    onSaved() {
      this.closeModal();
      this.loadTypes();
    },
    closeModal() {
      this.showAddModal = false;
      this.editingType = null;
    },
  },
};
</script>
