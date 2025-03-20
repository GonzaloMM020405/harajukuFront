<!-- BaseModal.vue -->
<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 rounded-lg">
      <div class="rounded-lg shadow-xl w-full max-w-3xl flex relative">
        <!-- Sección Izquierda (Imagen) -->
        <div class="rounded-l-lg w-1/2 hidden sm:flex bg-white bg-opacity-80 items-center justify-center">
          <img 
            src="/public/iconos/hara.png" 
            alt="Imagen de modal"
            class="w-full h-auto object-contain rounded-2xl shadow-lg"
          />  
        </div>
        
        <!-- Sección Derecha (Contenido dinámico) -->
        <div class="w-full sm:w-1/2 p-6 relative bg-white rounded-r-lg">
          <button 
            @click="$emit('close')" 
            class="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
          >
          ✖
          </button>
          <slot></slot>
        </div>
      </div>
    </div>
  </template>