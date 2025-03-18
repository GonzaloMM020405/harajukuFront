<template>
  <!-- Modal de Inicio sesion -->
  <div class="fixed inset-0 flex items-center justify-center z-50 rounded-lg">
    <div class="rounded-lg shadow-xl w-full max-w-3xl flex relative">
      <div class="rounded-l-lg w-1/2 hidden sm:flex bg-white bg-opacity-80 flex items-center justify-center">
        <img 
          src="/public/iconos/hara.png" 
          alt="Imagen de registro"
          class="max-w-full max-h-full object-contain rounded-lg"
        />  
      </div>
      <!-- Sección Derecha (Formulario) -->
      <div class="bg-white w-full sm:w-1/2 p-6 relative rounded-r-lg">
        <!-- Botón para cerrar -->
        <button @click="$emit('cerrar')" class="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl">
          ✖
        </button>

        <h2 class="text-2xl font-bold text-gray-700 mb-4">Iniciar Sesión</h2>

        <form @submit.prevent="handleLogin" class="space-y-4">
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
            <span class="text-gray-600 font-medium">Contraseña:</span>
            <input 
              v-model="password" 
              type="password" 
              required 
              class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <!--link que te lleva a un recovery password-->
          <label class="flex items-center space-x-2 text-gray-600 text-sm">                                                                                         
            <span>
              <button class="text-blue-600 hover:underline focus:outline-none" href="#" @click="openRecoverPass">
                ¿Olvidaste tu contraseña?
              </button>
            </span>
          </label>

          <button 
            type="submit" 
            class="bg-blue-500 text-white px-4 py-2 rounded w-full font-semibold hover:bg-blue-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
            Iniciar Sesion
          </button>
          <span>
            ¿Aun no tienes cuenta?
            <button @click.prevent="showIniciarSesion = true" class="text-blue-600 hover:underline focus:outline-none">
              Registrate
            </button>
          </span>
        </form>
      </div>
    </div>
  </div>

  <Terminos v-if="showTermsModal" @cerrar="closeTermsModal" />
  <IniciarSesion v-if="showIniciarSesion" @cerrar="closeIniciarSesion" />
</template>

<script setup>
import { ref } from 'vue'
import IniciarSesion from './IniciarSesion.vue'

// Variables para los campos de login
const email = ref('')
const password = ref('')                                                                            
const showTermsModal = ref(false)
const emit = defineEmits(['cerrar'])
//logica para el login
const handleLogin = () => {
  if (!termsAccepted.value) {
    alert("Debes aceptar los términos y condiciones antes de continuar.")
    return
  }
  console.log("Inicio sesion:", { email: email.value})
}


const openTermsModal = () => {
  console.log("Abriendo el modal de terminos"); 
  showTermsModal.value = true
}

const closeTermsModal = () => {
  console.log("cerrarando modal terminos");
  showTermsModal.value = false

}

</script>
