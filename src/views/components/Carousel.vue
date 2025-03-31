<script setup>
</script>

<template>
<div id="default-carousel" class="relative w-full" data-carousel="slide">
  <!-- Carousel wrapper -->
  <div class="relative h-96 overflow-hidden rounded-lg md:h-[500px] bg-gradient-to-r from-blue-200 to-blue-800 b-4">
    <!-- Items del carrusel -->
    <div class="hidden duration-800 ease-in-out" data-carousel-item>
      <img src="https://lh3.googleusercontent.com/p/AF1QipMfC6o3WhsSwf4OjsVzkDT4XilZNKip72VwtaMI=s1360-w1360-h1020" class="absolute block w-full h-full object-contain -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
    </div>
    <div class="hidden duration-800 ease-in-out" data-carousel-item>
      <img src="https://scontent.fslw1-1.fna.fbcdn.net/v/t51.75761-15/465738027_17968261241798023_1299735505795630312_n.jpg?_nc_cat=100&amp;ccb=1-7&amp;_nc_sid=127cfc&amp;_nc_eui2=AeG1f9paomuydomqRCA7A-2cEEOr3FNLyREQQ6vcU0vJEdjpe_1WOgUZ7L1yt5AuozgcShlUW7MSZFak-_DFgphG&amp;_nc_ohc=JQ-F3s3Yx70Q7kNvgHc9M8Z&amp;_nc_oc=Adl9s1QlIIDEZWaNFUX5hkiRz9jsphSe_kg26_kVTpJAOY-KIjPLQFZt5MYx2qgLs47QPk7XT9lQggALML95Xmjr&amp;_nc_zt=23&amp;_nc_ht=scontent.fslw1-1.fna&amp;_nc_gid=tnblbLOQ2r6QFo0_irddmw&amp;oh=00_AYG1svUdM-JlUv3ewlVxBypWLnWumKGOuga8LjH9Js8wqQ&amp;oe=67EFF3B1" class="absolute block w-full h-full object-contain -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
    </div>
    <div class="hidden duration-800 ease-in-out" data-carousel-item>
      <img src="https://lh3.googleusercontent.com/p/AF1QipNm0tBXDe-uj0W_POmzp-YXX5D_k8vgT-Bk4E0f=s1360-w1360-h1020" class="absolute block w-full h-full object-contain -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
    </div>
    <div class="hidden duration-800 ease-in-out" data-carousel-item>
      <img src="https://lh3.googleusercontent.com/p/AF1QipMwa-kxPwlE7HFWcQYDgiUVhWWiU1PGKL6F4NJ5=s1360-w1360-h1020" class="absolute block w-full h-full object-contain -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
    </div>
  </div>
    <!-- Slider indicators -->
    <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        <button type="button" class="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
    </div>
    <!-- Slider controls -->
    <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span class="sr-only">Previous</span>
        </span>
    </button>
    <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span class="sr-only">Next</span>
        </span>
    </button>
</div>
</template>