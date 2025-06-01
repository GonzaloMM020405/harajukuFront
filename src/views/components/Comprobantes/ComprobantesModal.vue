<template>
          <!-- Modal para cotizar -->
      <div v-if="isFormVisible" class="max-w-xl mx-auto bg-white p-6 rounded shadow">
    <h2 class="text-xl font-bold mb-4">Crear Cotización</h2>

    <form @submit.prevent="handleSubmit">
      <!-- Servicio -->
      <label class="block mb-1 font-medium">Tipo de Servicio</label>
      <select v-model="form.typeOfServiceID" class="w-full mb-4 p-2 border rounded" required>
        <option value="" disabled>Selecciona un servicio</option>
        <option v-for="s in servicios" :key="s.id" :value="s.id">
          {{ s.name }}
        </option>
      </select> 

      <!-- Descripción -->
      <label class="block mb-1 font-medium">Descripción</label>
      <textarea v-model="form.description" class="w-full mb-4 p-2 border rounded" rows="4" required></textarea>

      <!-- Imágenes -->
      <label class="block mb-1 font-medium">Imagen referencia (obligatorio)</label>
      <input ref="fileInputRef" type="file" multiple accept="image/*" @change="handleFileChange" class="mb-4" />

      <!-- Vista previa -->
      <div class="grid grid-cols-3 gap-2 mb-4" v-if="form.files.length">
        <div
          v-for="(file, i) in form.files"
          :key="i"
          class="relative w-full h-24">
        <img
          :src="URL.createObjectURL(file)"
          class="w-full h-24 object-cover rounded border"
        />
        <button
      type="button"
      @click="removeFile(i)"
      class="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow hover:bg-red-700"
      title="Eliminar imagen"
    >✕
    </button>
      </div>
      </div>

      <!-- Enviar -->
      <button
        type="submit"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        :disabled="loading"
      >
        {{ loading ? 'Enviando...' : 'Enviar Cotización' }}
      </button>
    </form>
  </div>
</template>
<script setup>
import Terminos from '../views/components/Terminos.vue'
import { ref, onMounted, computed } from 'vue'
import { TypeOfServiceService } from '../lib/application/tipoServicio/typeOfService'
import { ServicioCotizaciones } from '../lib/application/cotizaciones/cotizaciones'
import { useStore } from 'vuex'

const store = useStore()
const role = computed(() => store.getters.getUserRole)

const servicios = ref([])
const loading = ref(false)

const form = ref({
  typeOfServiceID: '',
  description: '',
  files: [],
})

const serviceApi = new TypeOfServiceService()
const cotizacionApi = new ServicioCotizaciones()

onMounted(async () => {
  try {
    const { items } = await serviceApi.getTypes(1, 100)
    servicios.value = items
  } catch (err) {
    console.error('Error cargando servicios:', err)
  }
})

function handleFileChange(event) {
  form.value.files = Array.from(event.target.files)
}

async function handleSubmit() {
  const camposVacios = []

  if (!form.value.typeOfServiceID) camposVacios.push('tipo de servicio')
  if (!form.value.description) camposVacios.push('descripción')
  if (!form.value.files || form.value.files.length === 0) camposVacios.push('imagen de referencia')

  if (camposVacios.length) {
    alert(`Por favor, completa los siguientes campos: ${camposVacios.join(', ')}`)
    return
  }
  // Validar que el archivo sea una imagen
  if (fileInputRef.value) {
  fileInputRef.value.value = ''
  }

  loading.value = true
  const formData = new FormData()

  formData.append('typeOfServiceID', form.value.typeOfServiceID)
  formData.append('description', form.value.description)

  form.value.files.forEach((file) => {
    formData.append('file', file)
  })

  try {
    await cotizacionApi.agregarCotizacion({
      typeOfServiceID: form.value.typeOfServiceID,
      description: form.value.description,
      files: form.value.files,
    })

    alert('Cotización enviada con éxito ✅')

    // Reiniciar formulario
    form.value = {
      typeOfServiceID: '',
      description: '',
      files: [],
    }

    // También puedes ocultar el formulario aquí si quieres:
    // isFormVisible.value = false

  } catch (err) {
    console.error('Error al enviar cotización:', err)
    alert('Error al enviar la cotización ❌')
  } finally {
    loading.value = false
  }
}


const isFormVisible = ref(false)
function openModal() {
  isFormVisible.value = true
}
// se debe de exponer la URL cuandp es srcip  t setup
const URL = window.URL

//esta es la funcion para eliminar la imagen
function removeFile(index) {
  form.value.files.splice(index, 1)
}

// esta es la referencia al input de file
const fileInputRef = ref(null)
// esta funcion se encarga de limpiar el input de file
function clearFileInput() {
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

</script>