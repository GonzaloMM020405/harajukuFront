<template>
  <BaseModal @close="$emit('cerrar')">
    <h2 class="text-2xl font-bold text-gray-700 mb-4">Ingresa el codigo</h2>
    <form @submit.prevent="validateCode" class="space-y-4">
          <label class="block">
            <span class="text-gray-600 font-medium">Recibiras un codigo de verificacion a tu correo electronico </span>
            <span class="text-gray-600 font-medium">Ingresa el codigo:</span>
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
  </BaseModal>

</template>
<script>
import { ref, defineComponent } from 'vue'
import BaseModal from './BaseModal.vue'

export default defineComponent({
  components: { BaseModal },
  emits: ['cerrar'],
  setup() {
    const code = ref("");

    const validateInput = (event) => {
      // Permitir solo números y limitar a 6 caracteres
      code.value = event.target.value.replace(/\D/g, "").slice(0, 6);
    };

    const validateCode = () => {
      if (code.value.length !== 6) {
        alert("El código debe tener exactamente 6 dígitos.");
        return;
      }
      console.log("Código validado:", code.value);
    };

    return { code, validateCode, validateInput };
  }
});
</script>
