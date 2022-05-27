<template>
  <q-page padding>
    <q-form class=" row justify-center q-gutter-y-md q-pt-lg"
        @submit="onSubmit"
        @reset="onReset"
      >

        <q-input
          class="col-md-8 col-xs-12"
          label="Nome do produto"
          v-model="form.name"
          outlined
          hint=""
          :rules="[
              val => !!val && val !== '' || 'Este campo nao pode ser vasio *'
            ]"
        />

        <q-input
          class="col-md-8 col-xs-12"
            outlined
            type="text"
            v-model="form.discricao"
            label="Disção de produto"
            hint=""
        />
        <div class="col-md-8 col-xs-12 row">
          <q-input
            class="col q-pr-sm"
            outlined
            type="number"
            v-model="form.quant"
            label="Quantidade"
            hint=""
            lazy-rules
            :rules="[ val => val > 0 || 'Campo obrigatorio *']"
          />

          <q-input
            class="col"
            input-class="text-right"
            outlined
            v-model="form.preco"
            label="Preço de aquisição"
            mask="#.##"
            fill-mask="0"
            reverse-fill-mask
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || 'Campo obrigatorio *',
            ]"
          />
        </div>

        <div class="col-md-8 col-xs-12">
            <div class="q-gutter-md">

              <q-select
              outlined
              v-model="form.categoria_id"
              :options="options"
              label="Categoria"
              option-value="id"
              option-label="name"
              map-options
              emit-value
              />
              <q-select standout option-value="id" v-model="model" :options="options" label="Standout" />

            </div>
          </div>


        <div class="col-md-8 col-xs-12">
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
    </q-form>
  </q-page>
</template>

<script>

import { defineComponent, onMounted, ref } from "vue";
import useApi from "src/composables/useApi";
import { useRoute } from "vue-router";

export default defineComponent({
  name:'registarProdutoPage',
  setup(){
    const {list} = useApi()
    let options = ref([])
    // const categoria_id = ref(null)
    const tabela ='produto'
    const route = useRoute
    const form = ref(
      {
        name:'',
        discricao:'',
        quant:0,
        preco:0
      }
    )
    onMounted(async()=>{
      try{
        options.value = await list('category')
      } catch (error) {

      }
    })

    return{
      form,
      route,
      model: ref(null),
      options
    }
  }

})
</script>
