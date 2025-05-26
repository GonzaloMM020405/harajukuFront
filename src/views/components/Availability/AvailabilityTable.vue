<template>
  <div class="overflow-x-auto shadow-md sm:rounded-lg mb-6">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th class="px-6 py-3">Seleccionar</th>
          <th class="px-6 py-3">Inicio</th>
          <th class="px-6 py-3">Fin</th>
          <th class="px-6 py-3">Reservado</th>
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
          <td class="px-6 py-4">{{ formatDate(t.startTime) }}</td>
          <td class="px-6 py-4">{{ formatDate(t.endTime) }}</td>
          <td class="px-6 py-4">
            <span :class="t.is_booked ? 'text-red-600' : 'text-green-600'">
              {{ t.is_booked ? 'Sí' : 'No' }}
            </span>
          </td>
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
export default {
  props: {
    types: Array,
    selectedIds: Array,
  },
  methods: {
    toggle(id) {
      const list = this.selectedIds.includes(id)
        ? this.selectedIds.filter((x) => x !== id)
        : [...this.selectedIds, id];
      this.$emit('updateSelected', list);
    },
    formatDate(dateStr) {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      return date.toLocaleString(); // puedes usar .toLocaleDateString() si quieres solo la fecha
    },
  },
};
</script>
