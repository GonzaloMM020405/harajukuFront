<template>
    <div class="fixed inset-0 bg-black/40 flex items-center justify-center">
        <div class="bg-white p-6 rounded-lg w-96 space-y-4">
            <h3 class="text-lg font-semibold">
                {{ typeToEdit ? 'Editar horario' : 'Nuevo horario' }}
            </h3>

            <form @submit.prevent="save">
<div class="space-y-2">
    <label class="block">Hora de inicio</label>
    <input v-model="form.StartTime" type="datetime-local" required class="input w-full" />

    <label class="block">Hora de fin</label>
    <input v-model="form.EndTime" type="datetime-local" required class="input w-full" />
</div>

<!-- Mostrar solo si está editando -->
<div v-if="typeToEdit" class="space-y-2">
    <label class="block">¿Está reservado?</label>
    <select v-model="form.is_booked" class="input w-full">
        <option :value="true">Sí</option>
        <option :value="false">No</option>
    </select>
</div>

<div class="mt-6 flex justify-end gap-3">
    <button type="button" class="btn-secondary" @click="$emit('close')">Cancelar</button>
    <button
        v-if="typeToEdit"
        type="button"
        class="btn-primary"
        :disabled="saving"
        @click="updateSlot"
    >
        {{ saving ? 'Guardando…' : 'Actualizar' }}
    </button>
    <button
        v-else
        type="button"
        class="btn-primary"
        :disabled="saving"
        @click="createSlot"
    >
        {{ saving ? 'Guardando…' : 'Guardar' }}
    </button>
</div>
            </form>
        </div>
    </div>
</template>

<script>
import { useToast } from 'vue-toastification';
import { AvailabilityService } from '../../../lib/application/Disponibilidad/disponibilidad';

export default {
    props: {
        typeToEdit: Object,
    },
    watch: {
        'form.is_booked'(val) {
            if (val === 'true') this.form.is_booked = true;
            else if (val === 'false') this.form.is_booked = false;
        },
    },
    data() {
        return {
            saving: false,
            service: new AvailabilityService(),
            toast: useToast(),
            form: {
                StartTime: this.typeToEdit?.StartTime || '',
                EndTime: this.typeToEdit?.EndTime || '',
                is_booked: this.typeToEdit?.is_booked === true,
            },
        };
    },
   methods: {
  async createSlot() {
    this.saving = true;
    try {
      const payload = {
        StartTime: new Date(this.form.StartTime).toISOString(),
        EndTime: new Date(this.form.EndTime).toISOString(),
      };

      await this.service.addSlot(payload);
      this.toast.success('Horario creado correctamente');
      this.$emit('saved');
    } catch (err) {
      console.error('Error al crear:', err);
      this.toast.error('Error al crear el horario');
    } finally {
      this.saving = false;
    }
  },

  async updateSlot() {
    this.saving = true;
    try {
      const payload = {
        StartTime: new Date(this.form.StartTime).toISOString(),
        EndTime: new Date(this.form.EndTime).toISOString(),
        is_booked: this.form.is_booked,
      };

      if (!this.typeToEdit?.id) {
        throw new Error('ID no disponible para actualizar');
      }

      await this.service.updateSlot({
        id: this.typeToEdit.id,
        ...payload,
      });

      this.toast.success('Horario actualizado correctamente');
      this.$emit('saved');
    } catch (err) {
      console.error('Error al actualizar:', err);
      this.toast.error('Error al actualizar el horario');
    } finally {
      this.saving = false;
    }
  }
}

};
</script>
