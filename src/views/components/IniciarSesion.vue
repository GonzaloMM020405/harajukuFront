<template>
  <BaseModal @close="$emit('cerrar')">
    <h2 class="text-2xl font-bold text-gray-700 mb-4">Iniciar Sesión</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
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
      
      <label class="flex items-center space-x-2 text-gray-600 text-sm">                                                                                         
        <span>
          <button type="button" class="text-blue-600 hover:underline focus:outline-none" @click="openRecoverPass">
            ¿Olvidaste tu contraseña?
          </button>
        </span>
      </label>      
      <button 
             type="submit" 
             class="bg-blue-500 text-white px-4 py-2 rounded w-full font-semibold hover:bg-blue-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
             Iniciar Sesión
           </button>
      <span class="text-sm">
        ¿No tienes cuenta? 
        <button type="button" @click="$emit('switch-to-register')" class="text-blue-600 hover:underline focus:outline-none">
          Registrate
        </button>
      </span>
    </form>
  </BaseModal>
</template>

<script>
import { LoginService } from "../../../src/lib/application/autenticarUsuario/autenticarUsuario.js"
import BaseModal from './BaseModal.vue';
import { useToast } from 'vue-toastification'

export default {
  name: 'IniciarSesion',
  components: { BaseModal },
  emits: ['cerrar', 'switch-to-register', 'login-success'],
  data() {
    return {
      email: '',
      password: '',
      showTermsModal: false,
      showIniciarSesion: false,
    }
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
      async handleSubmit() {
        if (!this.email || !this.password) {
        this.toast.error('Por favor completa todos los campos');
        return;
      }
          try {
            const loginService = new LoginService();            
            const { usuario, token } = await loginService.login(this.email, this.password, this.$store); //llama al servicio de login para autenticar al usuario
            console.log(usuario);
            localStorage.setItem('token', token); //almacena el token en el local storage
            this.toast.success('Inicio de sesión exitoso');
        } catch (error) {
          if (error.response && error.response.status === 401) {
            this.toast.error("Email o contraseña incorrectos");  
          } else {
            this.toast.error("Ocurrió un error en el inicio de sesión");  
          }
        }
    },
    openRecoverPass() {
      console.log("Abriendo el modal de recuperación de contraseña");
      // lógica de recuperación de contraseña
    },
    closeIniciarSesion() {
      this.showIniciarSesion = false;
    }
  }
}
</script>
