<!-- BaseModal.vue -->
<template>
    <div class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div class="rounded-lg shadow-xl w-full max-w-3xl flex relative bg-white">
        <!-- Sección Izquierda (Imagen) -->
        <div class="rounded-l-lg w-1/2 hidden sm:flex bg-opacity-80 items-center justify-center">
          <img 
            src="/public/iconos/hara.png" 
            alt="Imagen de modal"
            class="max-w-full max-h-full object-contain rounded-lg"
          />  
        </div>
        
        <!-- Sección Derecha (Contenido dinámico) -->
        <div class="w-full sm:w-1/2 p-6 relative">
          <button 
            @click="$emit('close')" 
            class="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
          >
          </button>
          <slot></slot>
        </div>
      </div>
    </div>
  </template>