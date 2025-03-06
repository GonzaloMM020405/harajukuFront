import { createApp } from 'vue'
import './assets/style.css'
import App from './App.vue'
import router from './router'
import '../node_modules/flowbite-vue/dist/index.css'
import 'flowbite';
import 'typeface-poppins';


createApp(App).use(router).mount('#app')
