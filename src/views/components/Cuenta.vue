<template>
  <!-- Modal de Registro -->
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
        <!-- Bootoncin cerrar -->
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
          <!-- Checkbox para aceptar términos y abrir modal de términos -->
          <label class="flex items-center space-x-2 text-gray-600 text-sm">
            <input v-model="termsAccepted" type="checkbox" class="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500">
            <span>
              Acepto los
              <button type="button" class="text-blue-600 hover:underline focus:outline-none" @click="openTermsModal">
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
          <span>
            ¿Ya tienes una cuenta?
            <button type="button" @click="openIniciarSesion" class="text-blue-600 hover:underline focus:outline-none">
              Inicia Sesión
            </button>
          </span>
        </form>
      </div>
    </div>
  </div>

  <Terminos v-if="showTermsModal" @cerrar="closeTermsModal" />
  <IniciarSesion v-if="showIniciarSesion" @cerrar="closeIniciarSesion" />
</template>

<script>
import { ref } from 'vue'
import Terminos from './Terminos.vue'
import IniciarSesion from './IniciarSesion.vue'

export default {
  name: 'Cuenta',
  components: {
    Terminos,
    IniciarSesion
  },
  emits: ['cerrar'],
  data() {
    return {
      email: '',
      password: '',
      name: '',
      telefono: '',
      termsAccepted: false,
      showTermsModal: false,
      showIniciarSesion: false
    }
  },
  methods: {
    handleLogin() {
      if (!this.termsAccepted) {
        alert("Debes aceptar los términos y condiciones antes de continuar.")
        return;
      }
      console.log("Cuenta creada con:", {
        name: this.name,
        email: this.email,
        telefono: this.telefono
      });
    },
    openTermsModal() {
      console.log("Abriendo el modal de términos");
      this.showTermsModal = true;
    },
    closeTermsModal() {
      console.log("Cerrando modal de términos");
      this.showTermsModal = false;
    },
    closeIniciarSesion() {
      this.showIniciarSesion = false;
    },
    openIniciarSesion() {
      this.showIniciarSesion = true;
      this.closeTermsModal();
    }
  }
}
</script>
