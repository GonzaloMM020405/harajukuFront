<template>
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded-lg shadow max-w-md w-full">
      <h2 class="text-lg font-bold mb-4">Editar Cotización</h2>

      <div class="mb-4">
        <label class="block font-medium mb-1">Estado</label>
        <select v-model="form.state" class="w-full border rounded px-3 py-2">
          <option value="requires_proof">Requiere evidencia</option>
          <option value="approved">Aprobada</option>
          <option value="rejected">Rechazada</option>
        </select>
      </div>

      <div class="mb-4">
        <label class="block font-medium mb-1">Precio</label>
        <input
          v-model.number="form.price"
          type="number"
          class="w-full border rounded px-3 py-2"
        />
      </div>

      <div class="flex justify-end gap-2">
        <button @click="$emit('cerrar')" class="px-4 py-2 bg-gray-300 text-gray-800 rounded">Cancelar</button>
        <button @click="guardar" class="px-4 py-2 bg-blue-600 text-white rounded">Guardar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { ServicioCotizaciones } from '../../../lib/application/cotizaciones/cotizaciones'

const props = defineProps({
  quote: Object,
  visible: Boolean,
})

const emit = defineEmits(['cerrar', 'actualizado'])

const form = ref({
  state: '',
  price: 0
})

watch(() => props.quote, (nueva) => {
  if (nueva) {
    form.value.state = nueva.state
    form.value.price = nueva.price
  }
}, { immediate: true })

async function guardar() {
  const api = new ServicioCotizaciones()

  try {
    // 1. Cambiar estado solo si es diferente
    if (form.value.state !== props.quote.state) {
      await api.cambiarEstadoCotizacion(props.quote.id, form.value.state)
    }

    // 2. Cambiar precio solo si es diferente
    if (form.value.price !== props.quote.price) {
      await api.actualizarCotizacion({
        _id: props.quote.id, // usa _id si así lo espera tu backend
        price: form.value.price,
        description: props.quote.description, // requerido por tu API
        typeOfServiceID: props.quote.typeOfServiceID,
        clientID: props.quote.clientID,
        state: form.value.state, // puedes enviarlo, pero será ignorado por esta ruta
        testRequired: props.quote.testRequired || false,
      })
    }

    emit('actualizado')  // para recargar
    emit('cerrar')       // cerrar modal
  } catch (err) {
    console.error('Error actualizando cotización', err)
    alert('Error al actualizar ❌')
  }
}




</script>
