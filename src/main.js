import { createApp } from 'vue'
import './assets/style.css'
import App from './App.vue'
import router from './router'
import store from '../src/vuex'
import '../node_modules/flowbite-vue/dist/index.css'
import 'flowbite';
import 'typeface-poppins';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);
app.use(router);
app.use(store);
app.use(Toast);

store.dispatch("initializeStore").then(() => {
    app.mount("#app");
  });