<template>
<div>
  <!-- <div>
   <Carousel />      
  </div -->
  <div class="bg-gradient-to-tr from-blue-400 via-cyan-200 to-teal-300">
    <Collage />
  </div>

  <header class="bg-white shadow">
      <div class="mx-auto max-w-7xl px-4 py-6">
        <h1 class="text-3xl font-bold">Opiniones de los clientes</h1>
      </div>
    </header>

  <!-- Sección de las opiniones -->
  <div v-for="(opinion, index) in opiniones" :key="index" class="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-8 text-center mb-14 mt-14">
    
    <!-- Imagen -->
    <img :src="opinion.imagen" alt="Foto de perfil" class="w-20 h-20 rounded-full object-cover mx-auto">

    <!-- Calificación -->
    <div class="flex items-center justify-center gap-1 text-sm text-gray-700 my-3">
      <i v-for="n in 5" :key="n" 
         :class="[
           n <= Math.floor(opinion.rating) ? 'fas' : 'far', 
           'fa-star text-black'
         ]">
      </i>
      <span class="ml-1 font-medium">{{ opinion.rating }}</span>
    </div>

    <!-- Texto -->
    <p class="text-gray-800 text-base">{{ opinion.texto }}</p>

  </div>  
</div>
</template>

<script>
import Carousel from '../views/components/Carousel.vue'
import Collage from '../views/components/Collage.vue'

export default {
  name: 'Home',
  components: {
    Carousel,
    Collage
  },
  data(){
    return {
        opiniones: [
        {
          imagen: 'https://cloudfront-eu-central-1.images.arcpublishing.com/prisa/XWB2UK4N5VEMJHEFJMFI5BQK6A.jpg',
          rating: 4.4,
          texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui vel morbi cursus sed sodales molestie proin dictum gravida. Porttitor maecenas tincidunt ipsum semper malesuada.'
        },
        {
          imagen: 'https://i1.sndcdn.com/artworks-000027094452-enfate-t500x500.jpg',
          rating: 5.0,
          texto: 'Excelente servicio y atención, ¡recomendado totalmente!'
        },
        {
          imagen: 'https://i.pinimg.com/originals/c5/0b/b6/c50bb6072facf3c7fecf7816bcb3f6c7.jpg',
          rating: 4.0,
          texto: 'Buen servicio, aunque podría mejorar en ciertos aspectos.'
        }
      ]
    }  
  }
}
</script>