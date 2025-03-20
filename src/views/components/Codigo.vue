<template>
  <!-- Modal para ingresar el codigo de verif -->
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

        <h2 class="text-2xl font-bold text-gray-700 mb-4">Validar codigo</h2>

        <form @submit.prevent="validateCode" class="space-y-4">
          <label class="block">
            <span class="text-gray-600 font-medium">Inserta el codigo:</span>
            <input 
              v-model="code" 
              type="number"
              min="6"
              max="6"
              class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>  
          
          <button 
            type="submit" 
            class="bg-blue-500 text-white px-4 py-2 rounded w-full font-semibold hover:bg-blue-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
            Validar codigo
          </button>   
        </form>
      </div>
    </div>
  </div>

  
  
</template>

<script>
export default {
  code: 'Codigo',
  emits: ['cerrar'],
  data() {
    return {
      code: '',
      showCodigo: false
    }
  },
  methods: {
    validateCode() {
      // Para ver el codigo de validacion en consol
      console.log("EL codigo es:", { code: this.code});
    },
    closeCodigo() {
      this.showCodigo = false;
    }
  }
}
</script>