<template>
  <BaseModal @close="$emit('cerrar')">
    <h2 class="text-2xl font-bold text-gray-700 mb-4">Crea tu cuenta gratuita</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <label class="block">
        <span class="text-gray-600 font-medium">Nombre Completo:</span>
        <input 
          v-model="newUser.name" 
          type="text" 
          required 
          class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>

      <label class="block">
        <span class="text-gray-600 font-medium">Email:</span>
        <input 
          v-model="newUser.email" 
          type="email" 
          required 
          class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>

     <!-- <label class="block">
        <span class="text-gray-600 font-medium">Teléfono:</span>
        <input 
          v-model="newUser.telefono" 
          type="tel" 
          required 
          class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label> --> 

      <label class="block">
        <span class="text-gray-600 font-medium">Contraseña:</span>
        <input 
          v-model="newUser.password" 
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
import { useToast } from 'vue-toastification'
import { RegisterUser } from '../../../src/lib/application/registrarUsuario/registrarUsuario.js'

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
      newUser: {
        name: '',
        email: '',
        password: ''
      },
      telefono: '',
      termsAccepted: false,
      showTermsModal: false,
      currentModal: null,
      usersService: new RegisterUser(),
    }
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
  async handleSubmit() {
      try {
        if (!this.termsAccepted) {
        this.$toast.error("Debes aceptar los términos y condiciones antes de continuar.");
        return;
      };
        await this.usersService.addUser(this.newUser);
        this.toast.success('Usuario agregado con éxito');
        console.log('Usuario agregado con éxito');
        this.$emit('cerrar');
      } catch (error) {
      // Muestra el mensaje de error específico del backend
      this.toast.error(error.message || 'Error al registrar usuario');
      
      // Opcional: manejo específico por código de estado
      if (error.status === 409) {
        this.toast.error("El correo ya está registrado");
      } else if (error.status === 500) {
        console.error('Error del servidor:', error);
      }
    }
      //this.$emit('switch-to-verify-code');
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