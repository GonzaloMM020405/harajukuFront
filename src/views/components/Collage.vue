<template>
    <div class="container p-10">
      <grid-layout v-model:layout="layout"
                   :col-num="12"
                   :row-height="70"
                   :is-draggable="true"
                   :is-resizable="true"
                   :vertical-compact="true"
                   :use-css-transforms="true"
      >
        <grid-item v-for="item in layout"
                   :key="item.i"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :i="item.i"
        >
          <div class="grid-item-content" :class="{'logo-center': item.isLogo}">
            <img :src="item.image" class="grid-image" @click="openModal(item.image)">
          </div>
        </grid-item>
      </grid-layout>
  
      <!-- Modal para mostrar imagen en grande -->
      <div v-if="modalOpen" class="modal" @click="modalOpen = false">
        <img :src="modalImage" class="modal-content">
      </div>
    </div>
  </template>
  
  <script>
  import { GridLayout, GridItem } from "vue3-grid-layout";
  
  export default {
    components: {
      GridLayout,
      GridItem
    },
    data() {
      return {
        layout: [
          // Parte superior (3 imágenes)
          { x: 4, y: 0, w: 4, h: 3, i: "0", image: "https://harajuku.s3.us-east-2.amazonaws.com/472279275_566389099547060_4583636140813584978_n.jpg" },
          { x: 2, y: 1, w: 2, h: 3, i: "1", image: "https://harajuku.s3.us-east-2.amazonaws.com/472077173_17975056145798023_2550095492721598616_n.jpg" },
          { x: 8, y: 1, w: 2, h: 3, i: "2", image: "https://harajuku.s3.us-east-2.amazonaws.com/465738027_17968261241798023_1299735505795630312_n.jpg" },
  
          // Lados (2 imágenes)
          { x: 1, y: 5, w: 3, h: 3, i: "3", image: "https://harajuku.s3.us-east-2.amazonaws.com/471541834_17975047016798023_1626342225746756714_n.jpg" },
          { x: 8, y: 5, w: 3, h: 3, i: "4", image: "https://harajuku.s3.us-east-2.amazonaws.com/471582406_17975062211798023_1937599950597850559_n.jpg" },

          // Centro (LOGO)
          { x: 5, y: 4, w: 2, h: 3, i: "5", image: "https://harajuku.s3.us-east-2.amazonaws.com/logo.png", isLogo: true },
  
          // Parte inferior (3 imágenes)
          { x: 2, y: 9, w: 2, h: 3, i: "6", image: "https://harajuku.s3.us-east-2.amazonaws.com/472058775_17975057285798023_2427446499235118816_n.jpg" },
          { x: 4, y: 8, w: 4, h: 3, i: "7", image: "https://harajuku.s3.us-east-2.amazonaws.com/474572926_579428614903216_8695084136435219566_n.jpg" },
          { x: 8, y: 9, w: 2, h: 3, i: "8", image: "https://harajuku.s3.us-east-2.amazonaws.com/471504989_17975055266798023_6249589124564477866_n.jpg" },
        ],
        modalOpen: false,
        modalImage: ""
      };
    },
    methods: {
      openModal(image) {
        this.modalImage = image;
        this.modalOpen = true;
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    width: 80%;
    margin: auto;
  }
  
  .grid-item-content {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 10px;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .logo-center {
    border: 2px;
  }
  
  .grid-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    max-width: 90%;
    max-height: 90%;
  }
  </style>
  