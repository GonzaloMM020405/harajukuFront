<template>
  <div>
    <Terminos></Terminos>
   <div class="w-full bg-gradient-to-r from-blue-400 to-teal-300 py-12 px-4 text-center">
      <h2 class="text-2xl md:text-3xl font-bold text-gray-800">
        Separa tu fecha para asistir al salón y realizar tu servicio de corte o color!
      </h2>
    </div>

    <div class="flex flex-col items-center justify-center gap-8 py-10 bg-gray-100">

  <!-- Tarjeta (card) -->
  <div class="bg-white shadow-lg rounded-xl p-8 max-w-lg text-center">
    <h2 class="text-2xl font-bold text-gray-800 mb-2">
      Agenda tu cita ahora mismo
    </h2>
    <div class="border-t-2 border-blue-400 w-24 mx-auto my-4"></div>
    <p class="text-sm text-gray-500 mb-6">
      Haz clic aquí para ver el calendario con las fechas y horas disponibles
    </p>
    <button class="inline-flex items-center gap-2 border border-blue-400 text-blue-500 hover:bg-blue-50 transition duration-300 font-semibold px-4 py-2 rounded-full">
      Agendar
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
      </svg>
    </button>
  </div>

  <!-- Botón grande azul inferior -->
  <button class="bg-blue-500 hover:bg-blue-600 transition duration-300 text-white font-semibold px-12 py-4 rounded-xl shadow-lg">
    Ver mis citas
  </button>

</div>


  
  </div>
</template>

<script>
import Terminos from '../views/components/Terminos.vue'
export default {
  name: 'Appointment',
  components: {
    Terminos
  }
}
</script>