<template>
  <!-- Modal -->
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white p-6 rounded-lg shadow-xl w-96 relative">
      <!-- Botón para cerrar -->
      <button @click="$emit('cerrar')" class="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl">
        ✖
      </button>

      <h2 class="text-2xl font-bold text-gray-700 mb-4">Crea tu cuenta gratuita</h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <label class="block">
          <span class="text-gray-600 font-medium">Nombre Completo:</span>
          <input 
            v-model="name" 
            type="text" 
            required 
            class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label class="block">
          <span class="text-gray-600 font-medium">Email:</span>
          <input 
            v-model="email" 
            type="email" 
            required 
            class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label class="block">
          <span class="text-gray-600 font-medium">Teléfono:</span>
          <input 
            v-model="telefono" 
            type="tel" 
            required 
            class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label class="block">
          <span class="text-gray-600 font-medium">Contraseña:</span>
          <input 
            v-model="password" 
            type="password" 
            required 
            class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <!--para que se acepten los terminos y condiciones-->
         <!-- Checkbox con botón que abre el modal -->
        <label class="flex items-center space-x-2 text-gray-600 text-sm">
          <input v-model="termsAccepted" type="checkbox" class="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500">
          <span>
            Acepto los
            <button @click.prevent="showTermsModal = true" class="text-blue-600 hover:underline focus:outline-none" href="#">
              Términos y Condiciones
            </button>
          </span>
        </label>

        <button 
          type="submit" 
          class="bg-blue-500 text-white px-4 py-2 rounded w-full font-semibold hover:bg-blue-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          :disabled="!termsAccepted">
          Crear cuenta
        </button>
      </form>
    </div>
  </div>

  <Terminos v-if="showTermsModal" @cerrar="showTermsModal = false" />
</template>


<script setup>
import { ref } from 'vue'
import Terminos from './Terminos.vue'

// Variables para los campos de login
const email = ref('')
const password = ref('')
const name = ref('')
const telefono = ref('')
const termsAccepted = ref(false) // osea variable para que acepte terminos y condiciones

//logica para el login
const handleLogin = () => {
  if (!termsAccepted.value) {
    alert("Debes aceptar los términos y condiciones antes de continuar.")
    return
  }
   console.log("Cuenta creada con:", { name: name.value, email: email.value, telefono: telefono.value })
}
</script>
