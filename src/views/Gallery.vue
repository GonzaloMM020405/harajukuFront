<template>
  <div>
    <h1>Gallery</h1>
    <p>Esta es la galeria</p>
     <Carousel />
  </div>
</template>

<script>
import Carousel from '../views/components/Carousel.vue'

export default {
  name: 'Home',
  components: {
    Carousel
  }
}
</script>