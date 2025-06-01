<template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg w-96 space-y-4">
      <h3 class="text-lg font-semibold">
        Nueva cita
      </h3>

      <form @submit.prevent="save">
        <div class="space-y-2">
          <label class="block">Espacio disponible</label>
          <select v-model="slotId" required class="input w-full">
            <option value="" disabled>Seleccione un espacio</option>
            <option v-for="slot in slots" :key="slot.id" :value="slot.id">
              {{ formatSlot(slot) }}
            </option>
          </select>

          <label class="block">Cotización</label>
          <select v-model="quoteId" required class="input w-full">
            <option value="" disabled>Seleccione una cotización</option>
            <option v-for="quote in quotes" :key="quote.id" :value="quote.id">
              {{ formatQuote(quote) }}
            </option>
          </select>
        </div>

        <div class="mt-6 flex justify-end gap-3">
          <button type="button" class="btn-secondary" @click="$emit('close')">Cancelar</button>
          <button class="btn-primary" :disabled="saving">
            {{ saving ? 'Guardando…' : 'Guardar' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';
import { AppointmentsService } from '../../../lib/application/Citas/citas';
import { ServicioCotizaciones } from '../../../lib/application/cotizaciones/cotizaciones';
import { AvailabilityService } from '../../../lib/application/Disponibilidad/disponibilidad';

export default {
  data() {
    return {
      slotId: '',
      quoteId: '',
      slots: [],
      quotes: [],
      saving: false,
      toast: useToast(),
      appointmentService: new AppointmentsService(),
      quoteService: new ServicioCotizaciones(),
      availabilityService: new AvailabilityService(),
    };
  },
  mounted() {
    this.fetchSlots();
    this.fetchQuotes();
  },
  methods: {
    async fetchSlots() {
      try {
        const result = await this.availabilityService.getAvailability(1, 50);
        this.slots = result.items;
      } catch (error) {
        console.error('Error al obtener espacios:', error);
      }
    },
    async fetchQuotes() {
      try {
        this.quotes = await this.quoteService.getCotizaciones(1, 50);
      } catch (error) {
        console.error('Error al obtener cotizaciones:', error);
      }
    },
    formatSlot(slot) {
      return `${new Date(slot.startTime).toLocaleString()} - ${new Date(slot.endTime).toLocaleString()}`;
    },
    formatQuote(quote) {
      return `ID: ${quote.id} - ${quote.description || 'Sin descripción'}`;
    },
    async save() {
      this.saving = true;
      try {
        await this.appointmentService.createAppointment({
          slotId: this.slotId,
          quoteId: this.quoteId,
        });
        this.toast.success('Cita creada correctamente');
        this.$emit('saved');
      } catch (err) {
        console.error('Error al crear cita:', err);
        this.toast.error('Error al crear la cita');
      } finally {
        this.saving = false;
      }
    },
  },
};
</script>
