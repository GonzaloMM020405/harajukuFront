<template>
  <div v-if="isVisible" ref="banner" id="sticky-banner" tabindex="-1" class="flex justify-between w-full p-4 border-b border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 ">
    <div class="flex items-center mx-auto">
      <p class="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
        <span class="inline-flex p-1 me-3 bg-gray-200 rounded-full dark:bg-gray-600 w-6 h-6 items-center justify-center shrink-0">
          <svg class="w-3 h-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
            <path d="M15 1.943v12.114a1 1 0 0 1-1.581.814L8 11V5l5.419-3.871A1 1 0 0 1 15 1.943ZM7 4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v5a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V4ZM4 17v-5h1v5H4ZM16 5.183v5.634a2.984 2.984 0 0 0 0-5.634Z"/>
          </svg>
          <span class="sr-only">Ícono de promoción</span>
        </span>
        <span>¡Celebra el amor y la belleza este San Valentín en nuestro salón! 💌 Disfruta de la promoción especial: dos cortes por $300 pesos para ti y tu amistad o pareja.</span>
      </p>
      <button @click="closeBanner" class="close-banner text-sm font-medium text-gray-700 dark:text-gray-300 ml-4" aria-label="Cerrar banner">✖</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: true
    }
  },
  methods: {
    closeBanner() {
      this.isVisible = false;
    }
  }
}
</script>
