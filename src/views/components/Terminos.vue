<template>
    <div>
    <div v-if="mostrarTerminos" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg text-center">
        
        <h2 class="text-lg font-bold mb-4">Términos y Condiciones</h2>
        <p class="text-gray-700 mb-4">
          Acepta los términos y condiciones para continuar utilizando la página.
        </p>
        <ul class="lista-terminos text-left text-gray-400">
                  <li> + Para confirmar una cita de decoloración, tintes o alisados permanentes, es necesario realizar un pago de anticipo del 50% sobre la cotización dada. Este pago asegura la reservación de la fecha y horario elegidos.</li>
                  <li> + Para el servicio de corte de cabello, se requiere un anticipo de $100 MXN para confirmar la cita. Este anticipo no varía según el estilo de corte solicitado.</li>
                  <li> + Los anticipos pueden pagarse en efectivo o por transferencia bancaria. Una vez completado el servicio, el cliente deberá pagar el monto restante mediante el mismo método donde se realizó el anticipo inicial.</li>
                  <li> + Para realizar un servicio de decoloración, el salón requerirá una prueba en un mechón del cabello del cliente. Esta prueba permitirá evaluar la porosidad, resistencia y fondo de aclaración del cabello. Si el cabello no pasa la prueba, se propondrá una alternativa de color acorde con el fondo de aclaración del cliente.</li>
                  <li> + En caso de que el cliente desee cambiar la fecha de la cita, deberá notificarlo al salón con al menos una semana de anticipación para reagendar sin perder el anticipo. La nueva fecha estará sujeta a disponibilidad.</li>
                  <li> + El anticipo deberá utilizarse en el mismo mes de la reserva original y no podrá acumularse para el siguiente mes.</li>
                  <li> + Si el cliente desea cancelar o posponer la cita, podrá hacerlo con al menos 48 horas de antelación para conservar el anticipo.</li>
                  <li> +El día de la cita se ofrece un tiempo de tolerancia de 15 minutos. Si el cliente no se presenta en ese tiempo, el anticipo no será reembolsable, y deberá realizar un nuevo proceso de reservación para agendar otra fecha.</li>
                 
        </ul><br>
        <button @click="aceptarTerminos"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          Aceptar
        </button>
      </div>
    </div>
    </div>
</template>


<script setup>
import { ref } from 'vue'
//aqui estan los datos del modal terminos y condiciones
const mostrarTerminos = ref(true) 
const emit = defineEmits(['cerrar']) // Declara que el componente puede emitir "cerrar"


const aceptarTerminos = () => {
  mostrarTerminos.value = false
  emit('cerrar');
}



</script>

<style>

ul{
  font-size: 11px;
}

</style>