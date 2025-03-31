<template>
  <BaseModal @close="$emit('cerrar')">
    <h2 class="text-2xl font-bold text-gray-700 mb-4">Crea tu cuenta gratuita</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
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
      
      <span class="text-sm">
        ¿Ya tienes cuenta? 
        <button type="button" @click="$emit('switch-to-login')" class="text-blue-600 hover:underline focus:outline-none">
          Inicia Sesión
        </button>
      </span>
    </form>
  </BaseModal>
  <Terminos v-if="showTermsModal" @cerrar="showTermsModal = false" />

 
</template>

<script>
import { ref } from 'vue'
import BaseModal from './BaseModal.vue'
import Terminos from './Terminos.vue'
import IniciarSesion from './IniciarSesion.vue'
import VerificarCodigo from './VerificarCodigo.vue'


export default {
  name: 'Cuenta',
  components: {
    BaseModal,
    Terminos,
    IniciarSesion,
    VerificarCodigo
  },
  emits: ['cerrar', 'switch-to-login','switch-to-verify-code'],
  data() {
    return {
      email: '',
      password: '',
      name: '',
      telefono: '',
      termsAccepted: false,
      showTermsModal: false,
      currentModal: null
    }
  },
  methods: {
    handleSubmit() {
      if (!this.termsAccepted) {
        alert("Debes aceptar los términos y condiciones antes de continuar.")
        return;
      }
      console.log("Cuenta creada con:", {
        name: this.name,
        email: this.email,
        telefono: this.telefono
      });
      this.$emit('switch-to-verify-code');
    },
    openTermsModal() {
      console.log("Abriendo el modal de términos");
      this.showTermsModal = true;
    },
    closeTermsModal() {
      console.log("Cerrando modal de términos");
      this.showTermsModal = false;
    },
    toggleModal(modalName) {
      this.currentModal = this.currentModal === modalName ? null : modalName;
    }
  }
}
</script>