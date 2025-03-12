<template>
  <!-- Modal -->
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96 relative">
      <!-- Botón para cerrar -->
      <button @click="$emit('cerrar')" class="absolute top-2 right-2 text-red-500">✖</button>

      <h2 class="text-xl font-semibold mb-4">Iniciar Sesión</h2>

      <form @submit.prevent="handleLogin">
        <label class="block mb-2">
          Email:
          <input v-model="email" type="email" required class="w-full border p-2 rounded" />
        </label>

        <label class="block mb-4">
          Contraseña:
          <input v-model="password" type="password" required class="w-full border p-2 rounded" />
        </label>

        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Ingresar
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Variables para los campos de login
const email = ref('')
const password = ref('')

const handleLogin = () => {
  console.log(`Email: ${email.value}, Password: ${password.value}`)
  // Aquí puedes agregar la lógica de autenticación
}
</script>
