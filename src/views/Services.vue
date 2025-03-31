<template>
  <div>
    <Terminos></Terminos>
    <div class="w-full bg-gradient-to-r from-blue-400 to-teal-300 py-12 px-4 text-center">
      <h2 class="text-2xl md:text-3xl font-bold text-gray-800">
      ¡Personaliza tu experiencia y obtén una cotización a medida para el servicio que necesitas!
      </h2>
    </div>

    <div class="flex flex-col items-center justify-center gap-8 py-10 bg-gray-100">

  <!-- Tarjeta (card) -->
  <div class="bg-white shadow-lg rounded-xl p-8 max-w-lg text-center">
    <h2 class="text-2xl font-bold text-gray-800 mb-2">
      Cotiza tu servicio ahora mismo
    </h2>
    <div class="border-t-2 border-blue-400 w-24 mx-auto my-4"></div>
    <p class="text-sm text-gray-500 mb-6">
      Haz clic aquí para completar el formulario y recibir tu cotización personalizada
    </p>
    <button @click="openModal" 
    class="inline-flex items-center gap-2 border border-blue-400 text-blue-500 hover:bg-blue-50 transition duration-300 font-semibold px-4 py-2 rounded-full">
      Cotizar
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
      </svg>
    </button>

  </div>

  <!-- Modal para cotizar -->
    <div v-if="isModalOpen" @cerrar="closeModal">
  <div class="max-w-lg mx-auto p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-2 text-center">¡Cotiza tu servicio!</h2>
    <p class="text-gray-500 text-center mb-6">
      Llena este formulario y adjunta una imagen de referencia del estilo que quieres tomar.
    </p>

    <form class="space-y-4">
      
      <!-- Tipo de servicio -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de servicio a cotizar</label>
        <select class="w-full border rounded-md py-2 px-4 bg-gray-50">
          <option disabled selected>Selecciona un servicio</option>
          <option>Corte de cabello</option>
          <option>Tinte de cabello</option>
          <option>Alaciado permanente</option>
        </select>
      </div>

      <!-- Descripción -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
        <textarea rows="4" maxlength="225" placeholder="Describe el trabajo que buscas realizarte" 
          class="w-full border rounded-md py-2 px-4 bg-gray-50"></textarea>
        <span class="block text-right text-xs text-gray-400 mt-1">0 / 225</span>
        <span class="text-sm text-red-500">Este campo es requerido</span>
      </div>

      <!-- Texto informativo -->
      <p class="text-sm text-gray-600">
        Procura adjuntar imágenes de tu cabello y de referencia del servicio que quieres solicitar.
      </p>

      <!-- Añadir Imagen -->
      <div>
        <button type="button" class="text-blue-500 font-medium flex items-center gap-1">
          <span class="text-lg">+</span> Añadir Imagen
          <span class="ml-2 text-gray-600 text-sm">0 / <span class="text-red-500">5*</span></span>
        </button>
      </div>

      <!-- Botón enviar -->
      <button type="submit" 
              class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
        Enviar solicitud de cotización
      </button>

    </form>
  </div>
</div>
  <!-- Botón grande azul inferior -->
  <button class="bg-blue-500 hover:bg-blue-600 transition duration-300 text-white font-semibold px-12 py-4 rounded-xl shadow-lg">
    Ver mis cotizaciones
  </button>

</div>


  </div>
</template>

<script>
import Terminos from '../views/components/Terminos.vue'
import BaseModal from '../views/components/BaseModal.vue'

export default {
  name: 'Services',
  components: {
    Terminos,
    BaseModal
  },
  data() {
    return {
      isModalOpen: false
    }
  },
  methods: {
    openModal() {
      this.isModalOpen = true
    },
    closeModal() {
      this.isModalOpen = false
    }
  }
}
</script>