<template>
  <!-- Modal de Inicio Sesión -->
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
        <!-- Botonci para cerrar -->
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
          <span>
            ¿Aún no tienes cuenta?
            <button type="button" @click.prevent="showIniciarSesion = true" class="text-blue-600 hover:underline focus:outline-none">
              Regístrate
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
export default {
  name: 'IniciarSesion',
  emits: ['cerrar'],
  data() {
    return {
      email: '',
      password: '',
      showTermsModal: false,
      showIniciarSesion: false
    }
  },
  methods: {
    handleLogin() {
      // Se elimina la validación de términos ya que en el login generalmente no se requiere
      console.log("Inicio sesión:", { email: this.email});
    },
    openTermsModal() {
      console.log("Abriendo el modal de términos");
      this.showTermsModal = true;
    },
    closeTermsModal() {
      console.log("Cerrando el modal de términos");
      this.showTermsModal = false;
    },
    openRecoverPass() {
      console.log("Abriendo el modal de recuperación de contraseña");
      // logica contraseñappapapkadnspA
  
    },
    closeIniciarSesion() {
      this.showIniciarSesion = false;
    }
  }
}
</script>
