<template>
  <div class="min-h-full">  
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <img class="size-8 rounded-full" src="./assets/iconos/faviconMorade.ico" alt="Company">
            <div class="hidden md:block ml-10">
              <a v-for="item in navigation" :key="item.name" :href="item.href" 
                :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 
                'rounded-md px-3 py-2 text-sm font-medium']">
                {{ item.name }}
              </a>
            </div>
          </div>

          <div class="hidden md:block">
            <Menu as="div" class="relative ml-3">
              <MenuButton class="rounded-full bg-gray-800">
                <div class="flex items-center">
                  <!-- Imagen del usuario -->
                  <img class="size-8 rounded-full" src="https://harajuku.s3.us-east-2.amazonaws.com/user.jpg" alt="User" />
                  <!-- Nombre y correo del usuario -->
                  <div class="ml-2 text-white text-sm">
                    <span v-if="email" class="block">{{ email }}</span>
                  </div>
                </div>
              </MenuButton>

              <transition>
                <MenuItems class="absolute right-0 z-10 mt-2 w-48 bg-white shadow-lg rounded-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem v-for="item in userNavigation" :key="item.name " class="rounded-lg">
                    <button v-if="item.action" @click="item.action"
                      class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      {{ item.name }}
                    </button>
                    <a v-else :href="item.href"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      {{ item.name }}
                    </a>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>

          <div class="-mr-2 flex md:hidden">
            <DisclosureButton class="bg-gray-800 p-2 text-gray-400">
              <Bars3Icon v-if="!open" class="block size-6" />
              <XMarkIcon v-else class="block size-6" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <DisclosureButton v-for="item in navigation" :key="item.name"
          class="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
          {{ item.name }}
        </DisclosureButton>
      </DisclosurePanel>

      <Banner/>      
    </Disclosure>

    <header class="bg-white shadow">
      <div class="mx-auto max-w-7xl px-4 py-6">
        <h1 class="text-3xl font-bold">Saloncito Harajuku</h1>
      </div>
    </header>

    <!-- Manejo de los modals -->
    <IniciarSesion 
      v-if="modalActual === 'login'"
      @cerrar="cerrarModal"
      @switch-to-register="abrirModal('register')"
    />
    <Cuenta 
      v-if="modalActual === 'register'"
      @cerrar="cerrarModal"
      @switch-to-login="abrirModal('login')"
      @switch-to-verify-code="abrirModal('verify-code')"
    />
    <VerificarCodigo 
      v-if="modalActual === 'verify-code'"
      @cerrar="cerrarModal"
    />

    <main>
      <div class="mx-auto w-full">
        <router-view></router-view>      </div>
    </main>

    <Footer/>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Cuenta from './views/components/Cuenta.vue'
import IniciarSesion from './views/components/IniciarSesion.vue'
import VerificarCodigo from './views/components/VerificarCodigo.vue'
import Banner from './views/components/Banner.vue'
import Carousel from './views/components/Carousel.vue'
import Footer from './views/components/Footer.vue'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification'

const store = useStore();
const router = useRouter();
const modalActual = ref(null);
const email = computed(() => localStorage.getItem('email') || null);


const abrirModal = (nombreModal) => {
  modalActual.value = nombreModal
}

const cerrarModal = () => {
  modalActual.value = null
}


const navigation = [
  { name: 'Acerca de Nosotros', href: '/about', current: true },
  { name: 'Cotiza tu servicio', href: '/services', current: false },
  { name: 'Agenda tu cita', href: '/appointment', current: false },
  { name: 'Galería', href: '/gallery', current: false },
  { name: 'Ubicación', href: '/location', current: false },
]

const isAuthenticated = computed(() => !!localStorage.getItem('token') || !!store.state.token);

const userNavigation = computed(() => [
  isAuthenticated.value && { name: 'Tu Perfil', href: '#' },
  !isAuthenticated.value && { name: 'Iniciar Sesión', action: () => abrirModal('login') },
  !isAuthenticated.value && { name: 'Crear Cuenta', action: () => abrirModal('register') },
  isAuthenticated.value && { name: 'Cerrar Sesión', action: logout }
].filter(Boolean));

const toast = useToast();

const logout = () => {
  store.dispatch('logout');
  toast.success('Sesión cerrada exitosamente');
  
  setTimeout(() => {
    router.push('/about').then(() => {
      window.location.reload();
    });
  }, 1000);
};



onMounted(() => {
  store.dispatch('initializeStore');
});
</script>
