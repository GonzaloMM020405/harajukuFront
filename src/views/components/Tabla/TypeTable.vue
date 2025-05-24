<template>
  <div class="overflow-x-auto shadow-md sm:rounded-lg mb-6">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th class="px-6 py-3">Seleccionar</th>
          <th class="px-6 py-3">Nombre</th>
          <th class="px-6 py-3">Precio</th>
          <th class="px-6 py-3">Editar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in types" :key="t.id" class="bg-white border-b">
          <td class="px-6 py-4">
            <input
              type="checkbox"
              :checked="selectedIds.includes(t.id)"
              @change="toggle(t.id)"
            />
          </td>
          <td class="px-6 py-4">{{ t.name }}</td>
          <td class="px-6 py-4">$ {{ t.price }}</td>
          <td class="px-6 py-4">
            <a href="#" @click.prevent="$emit('editType', t)" class="text-blue-600 hover:underline">
              Editar
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: { types: Array, selectedIds: Array },
  methods: {
    toggle(id) {
      const list = this.selectedIds.includes(id)
        ? this.selectedIds.filter((x) => x !== id)
        : [...this.selectedIds, id];
      this.$emit('updateSelected', list);
    },
  },
};
</script>
