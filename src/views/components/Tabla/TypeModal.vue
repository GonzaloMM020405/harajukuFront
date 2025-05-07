<template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg w-96 space-y-4">
      <h3 class="text-lg font-semibold">
        {{ typeToEdit ? 'Editar tipo de servicio' : 'Nuevo tipo de servicio' }}
      </h3>

      <form @submit.prevent="save">
        <div class="space-y-2">
          <label class="block">Nombre</label>
          <input v-model="name" required class="input w-full" />

          <label class="block">Precio</label>
          <input v-model.number="price" type="number" min="0" required class="input w-full" />
        </div>

        <div class="mt-6 flex justify-end gap-3">
          <button type="button" class="btn-secondary" @click="$emit('close')">Cancelar</button>
          <button class="btn-primary" :disabled="saving">
            {{ saving ? 'Guardando…' : 'Guardar' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';

import { TypeOfServiceService } from '../../../lib/application/tipoServicio/typeOfService';

//ola gonsal no lo queria dejar asi pero saliendo del trabajo t ayudopo
//posolado
export default {
  props: { typeToEdit: Object },
  
  data() {
    return {
      name: this.typeToEdit?.name || '',
      price: this.typeToEdit?.price || 0,
      saving: false,
      service: new TypeOfServiceService(),
    };
  },
  methods: {
    async save() {
      this.saving = true;
      try {
        if (this.typeToEdit) {
          // editar
          await this.service.updateType({
            id: this.typeToEdit.id,
            name: this.name.trim(),
            price: this.price,
          });
        } else {
          // crear
          //guardar en variable
          await this.service.addType({ name: this.name.trim(), price: this.price });
        }
        this.$emit('saved');
      } catch (err) {
        console.error('Error saving:', err);
      } finally {
        this.saving = false;
      }
    },
  },
};
</script>
