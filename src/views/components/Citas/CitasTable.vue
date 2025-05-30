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
            <a href="#" @click.prevent="$emit('editAppointment', appointment)" class="text-blue-600 hover:underline">
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
    appointments: Array,
    selectedIds: Array,
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
