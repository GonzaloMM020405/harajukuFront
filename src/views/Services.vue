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
    <div v-if="isModalOpen" @cerrar="closeModal">
  <div class="max-w-lg mx-auto p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-2 text-center">¡Cotiza tu servicio!</h2>
    <p class="text-gray-500 text-center mb-6">
      Llena este formulario y adjunta una imagen de referencia del estilo que quieres tomar.
    </p>

    
      
      <!-- Tipo de servicio -->
      <div>
        <label class="block text-sm font-medium text-gray-700 m|b-1">Tipo de servicio a cotizar</label>
        <select class="w-full border rounded-md py-2 px-4 bg-gray-50">
          <option disabled selected>Selecciona un servicio</option>
          <option>Corte de cabello</option>
          <option>Tinte de cabello</option>
          <option>Alaciado permanente</option>
        </select>
      </div>

      <!-- Descripción -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
        <textarea rows="4" maxlength="225" placeholder="Describe el trabajo que buscas realizarte" 
          class="w-full border rounded-md py-2 px-4 bg-gray-50"></textarea>
        <span class="block text-right text-xs text-gray-400 mt-1">0 / 225</span>
        <span class="text-sm text-red-500">Este campo es requerido</span>
      </div>

      <!-- Texto informativo -->
      <p class="text-sm text-gray-600">
        Procura adjuntar imágenes de tu cabello y de referencia del servicio que quieres solicitar.
      </p>

      <!-- Añadir Imagen -->
      <div>
        <button type="button" class="text-blue-500 font-medium flex items-center gap-1">
          <span class="text-lg">+</span> Añadir Imagen
          <span class="ml-2 text-gray-600 text-sm">0 / <span class="text-red-500">5*</span></span>
        </button>
      </div>

      <div>
        <!-- Modal para cotizar (visible si isModalOpen es true) -->
        <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div class="max-w-lg mx-auto p-6 bg-white rounded">
            <button 
            @click="$emit('close')" 
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
                <!-- Mensaje de error para Tipo de servicio -->
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
                <!-- Mensaje de error para Descripción -->
                <span class="text-sm text-red-500" v-if="!form.description && formSubmitted">
                  Este campo es requerido
                </span>
              </div>

              <!-- Texto informativo (opcional) -->
              <p class="text-sm text-gray-600">
                Procura adjuntar imágenes de tu cabello natural y de referencia del servicio que quieres solicitar.
              </p>

              <!-- Añadir Imagen -->
              <div>
                <button type="button" @click="triggerFileInput"
                  class="text-blue-500 font-medium flex items-center gap-1">
                  <span class="text-lg">+</span> Añadir Imagen
                  <span class="ml-2 text-gray-600 text-sm">
                    {{ images.length }} / <span class="text-red-500">5*</span>
                  </span>
                </button>
                <!-- Input oculto para seleccionar imágenes -->
                <input
                  type="file"
                  ref="imageInput"
                  style="display: none"
                  multiple
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
                <!-- Mensaje de error para la imagen (si decides que es obligatoria) -->
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

        <!-- Botón grande azul inferior para volver a abrir el modal -->
        <div class="mt-8 text-center">
          <button @click="openModal"
            class="bg-blue-500 hover:bg-blue-600 transition duration-300 text-white font-semibold px-12 py-4 rounded-xl shadow-lg">
            Ver mis cotizaciones
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Botón grande azul inferior -->
  <button  v-if="role === 'client'" class="bg-blue-500 hover:bg-blue-600 transition duration-300 text-white font-semibold px-12 py-4 rounded-xl shadow-lg">
    Ver mis cotizaciones
  </button>
</div>
  

  </div>
<TablaCotizaciones/>
</template>

<script>
import Terminos from '../views/components/Terminos.vue'
import TablaCotizaciones from '../views/components/TablaCotizaciones.vue' 

export default {
  name: 'Services',
  components: { Terminos,TablaCotizaciones},
  emits: ['cerrar'],
  computed: {
    role() {
      return this.$store.getters.getUserRole
    }
  },
  components: {
    Terminos
  },
  data() {
    return {
      isModalOpen: false,       // Controla la visibilidad del modal
      formSubmitted: false,     // Indica si se intentó enviar el formulario, para activar validaciones
      form: {
        serviceType: '',        // Valor seleccionado en el select (Tipo de servicio)
        description: ''         // Texto ingresado en el textarea (Descripción)
      },
      images: [],               // Array para almacenar imágenes adjuntadas y su URL temporal
      maxImages: 5              // Máximo de imágenes permitidas
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    // Activa el input de archivos
    triggerFileInput() {
      if (this.images.length < this.maxImages) {
        this.$refs.imageInput.click();
      }
    },
    // Procesa los archivos seleccionados
    handleFileChange(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length && this.images.length < this.maxImages; i++) {
        const file = files[i];
        // Verifica que el archivo sea una imagen
        if (file && file.type.startsWith('image/')) {
          const url = URL.createObjectURL(file);
          this.images.push({ file, url });
        }
      }
      event.target.value = ''; // Reinicia el input para permitir seleccionar el mismo archivo en el futuro
    },
    // Elimina la imagen del array y revoca la URL temporal
    removeImage(index) {
      URL.revokeObjectURL(this.images[index].url);
      this.images.splice(index, 1);
    },
    // Valida y procesa el envío del formulario
    submitForm() {
      this.formSubmitted = true;
      // Validar que cada campo obligatorio esté llenado
      if (!this.form.serviceType || !this.form.description || this.images.length === 0) {
        // Si falta algún dato, no continúa y se mostrarán los mensajes de error en el template
        return;
      }
      // Aquí se podrían enviar los datos al backend; por ahora, se muestran en consola
      console.log('Datos del formulario:', this.form);
      console.log('Imágenes adjuntadas:', this.images);
      
      // Reinicia el formulario y cierra el modal al terminar
      this.resetForm();
      this.closeModal();
    },
    // Reinicia los campos del formulario y las imágenes adjuntadas
    resetForm() {
      this.form.serviceType = '';
      this.form.description = '';
      this.formSubmitted = false;
      this.images.forEach(img => {
        URL.revokeObjectURL(img.url);
      });
      this.images = [];
    }
  }
};
</script>
