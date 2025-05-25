<template>
  <div>
    <!-- Componente Terminos -->
    <Terminos></Terminos>

    <!-- Cabecera con fondo degradado -->
    <div class="w-full bg-gradient-to-r from-blue-400 to-teal-300 py-12 px-4 text-center">
      <h2 class="text-2xl md:text-3xl font-bold text-gray-800">
        ¡Personaliza tu experiencia y obtén una cotización a medida para el servicio que necesitas!
      </h2>
    </div>

    <!-- Contenedor principal -->
    <div class="flex flex-col items-center justify-center gap-8 py-10 bg-gray-100">
      <!-- Tarjeta (card) -->
      <div v-if="role === 'client'" class="bg-white shadow-lg rounded-xl p-8 max-w-lg text-center">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">
          Cotiza tu servicio ahora mismo
        </h2>
        <div class="border-t-2 border-blue-400 w-24 mx-auto my-4"></div>
        <p class="text-sm text-gray-500 mb-6">
          Haz clic aquí para completar el formulario y recibir tu cotización personalizada
        </p>
        <button @click="openModal" 
        class="inline-flex items-center gap-2 border border-blue-400 text-blue-500 hover:bg-blue-50 transition duration-300 font-semibold px-4 py-2 rounded-full">
          Cotizar
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>

      <!-- Modal para cotizar -->
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="max-w-lg mx-auto p-6 bg-white rounded-lg relative">
          <button 
            @click="closeModal" 
            class="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl">
            ✖
          </button>
          <h2 class="text-2xl font-bold text-gray-800 mb-2 text-center">¡Cotiza tu servicio!</h2>
          <p class="text-gray-500 text-center mb-6">
            Llena este formulario y adjunta una imagen de referencia del estilo que quieres tomar.
          </p>

          <!-- Formulario de cotización -->
          <form class="space-y-4" @submit.prevent="submitForm">
            <!-- Tipo de servicio -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Tipo de servicio a cotizar
              </label>
              <select v-model="form.serviceType" class="w-full border rounded-md py-2 px-4 bg-gray-50">
                <option disabled value="">Selecciona un servicio</option>
                <option>Corte de cabello</option>
                <option>Tinte de cabello</option>
                <option>Alaciado permanente</option>
              </select>
              <span class="text-sm text-red-500" v-if="!form.serviceType && formSubmitted">
                Este campo es requerido
              </span>
            </div>

            <!-- Descripción -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                v-model="form.description"
                rows="4"
                maxlength="225"
                placeholder="Describe el trabajo que buscas realizarte"
                class="w-full border rounded-md py-2 px-4 bg-gray-50"
              ></textarea>
              <span class="block text-right text-xs text-gray-400 mt-1">
                {{ form.description.length }} / 225
              </span>
              <span class="text-sm text-red-500" v-if="!form.description && formSubmitted">
                Este campo es requerido
              </span>
            </div>

            <!-- Texto informativo -->
            <p class="text-sm text-gray-600">
              Procura adjuntar imágenes de tu cabello natural y de referencia del servicio que quieres solicitar.
            </p>

            <!-- Añadir Imagen -->
            <div>
              <button type="button" @click="triggerFileInput"
                class="text-blue-500 font-medium flex items-center gap-1">
                <span class="text-lg">+</span> Añadir Imagen
                <span class="ml-2 text-gray-600 text-sm">
                  {{ images.length }} / <span class="text-red-500">1*</span>
                </span>
              </button>
              <input
                type="file"
                ref="imageInput"
                style="display: none"
                accept="image/*"
                @change="handleFileChange"
              />
              <!-- Previsualización de las imágenes seleccionadas -->
              <div class="mt-2 flex flex-wrap gap-2" v-if="images.length">
                <div v-for="(img, index) in images" :key="index" class="relative">
                  <img :src="img.url" alt="Imagen previsualizada" class="w-24 h-24 object-cover rounded-md border"/>
                  <button type="button" @click="removeImage(index)"
                    class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    &times;
                  </button>
                </div>
              </div>
              <span class="text-sm text-red-500" v-if="images.length === 0 && formSubmitted">
                Debes adjuntar al menos una imagen
              </span>
            </div>

            <!-- Botón enviar -->
            <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
              Enviar solicitud de cotización
            </button>
          </form>
        </div>
      </div>

      
      <router-link 
      to="/services/TipoServicios"
      class="bg-blue-500 hover:bg-blue-600 transition duration-300 text-white font-semibold px-12 py-4 rounded-xl shadow-lg"
    >
      Administrar tipos de servicios
    </router-link>

    <router-link 
      to="/services/Disponibilidad"
      class="bg-blue-500 hover:bg-blue-600 transition duration-300 text-white font-semibold px-12 py-4 rounded-xl shadow-lg"
    >
      Administrar Horarios Disponibles
    </router-link>
    </div>
  </div>
</template>

<script>
import Terminos from '../views/components/Terminos.vue'
import TipoServicios from '../views/components/TipoServicios.vue'
import { TypeOfServiceService } from '../lib/application/tipoServicio/typeOfService'


export default {
  name: 'Services',
  components: { Terminos, TipoServicios },
  data() {
    return {
      typeService: new TypeOfServiceService(),
      typeOptions: [],          // se llenará con la API
      loadingTypes: false,
      isModalOpen: false,
      showQuotations: false,
      formSubmitted: false,
      form: {
        serviceType: '',
        typeId: '',
        description: ''
      },
      images: [],
      maxImages: 5,
      skip: 0,
      limit: 10,
    };
  },
  computed: {
    role() {
      return this.$store.getters.getUserRole
    }
  },
  mounted() {
    this.loadTypes();
  },
  methods: {
    async loadTypes() {
       try {
         this.loadingTypes = true;
         // como solo necesitamos el listado completo, ponemos skip=1, limit=1000
         const { items } = await this.typeService.getTypes(1, 1000, '');
         this.typeOptions = items;                 // [{id, name, price}, …]
       } catch (err) {
         console.error('Error cargando tipos:', err);
       } finally {
         this.loadingTypes = false;
       }
     },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.resetForm();
    },
    triggerFileInput() {
      if (this.images.length < this.maxImages) {
        this.$refs.imageInput.click();
      }
    },
    handleFileChange(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length && this.images.length < this.maxImages; i++) {
        const file = files[i];
        if (file && file.type.startsWith('image/')) {
          const url = URL.createObjectURL(file);
          this.images.push({ file, url });
        }
      }
      event.target.value = '';
    },
    removeImage(index) {
      URL.revokeObjectURL(this.images[index].url);
      this.images.splice(index, 1);
    },
    submitForm() {
      this.formSubmitted = true;
      
      if (!this.form.serviceType || !this.form.description || this.images.length === 0) {
        return;
      }
      
      // Here you would typically send the data to your backend
      console.log('Form data:', this.form);
      console.log('Images:', this.images);
      
      // Reset form and close modal
      this.closeModal();
      // Optionally show success message
    },
    resetForm() {
      this.form = {
        serviceType: '',
        description: ''
      };
      this.images.forEach(img => URL.revokeObjectURL(img.url));
      this.images = [];
      this.formSubmitted = false;
    },
    viewQuotations() {
      this.showQuotations = !this.showQuotations;
    }
  }
};
</script>
