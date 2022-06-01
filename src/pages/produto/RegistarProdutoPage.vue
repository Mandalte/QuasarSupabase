<template>
  <q-page padding>
    <q-form class=" row justify-center q-gutter-y-md q-pt-sm"
        @submit.prevent="onSubmit"
        @reset="onReset"
    >
      <div>
        <div class="q-mb-sm">
          <q-input
          label="Imagem"
          stack-label
          v-model="img"
          type="file"
          />
        </div>


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
        v-model="form.quantidade"
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

        <div class="col-md-8 col-xs-12 q-mb-sm">
          <div class="q-gutter-md">
            <q-select
            outlined
            v-model="form.category_id"
            :options="options"
            label="Categoria"
            option-value="id"
            option-label="name"
            map-options
            emit-value
            />
          </div>
        </div>
        <div class="col-md-8 col-xs-12 ">
          <q-btn label="Registar" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </div>

    </q-form>
  </q-page>
</template>

<script>

import { defineComponent, onMounted, ref } from "vue";
import useApi from "src/composables/useApi";
import { useRoute } from "vue-router";
import useNotify from "src/composables/useNotify";

export default defineComponent({
  name:'registarProdutoPage',
  setup(){

    const {sucesso,semSucesso}=useNotify()
    const {list,post,uploadingImg} = useApi()
    let options = ref([])
    // const category_id = ref(null)
    const tabela ='produto'
    const route = useRoute
    const form = ref(
      {
        name:'',
        discricao:'',
        quantidade:0,
        preco:0,
        category_id:null
      }
    )
    onMounted(async()=>{
      try{
        options.value = await list('category')
      } catch (error) {

      }
    })

    const img = ref([])

    const onSubmit = async()=>{
      try{

        if(img.value.length>0){
            form.value.img_url = await uploadingImg(img.value[0],'produtos')
        }

          await post(tabela,form.value)
          sucesso("Registado")
      }catch(error){
            semSucesso(error.message)
      }

    }

    return{
      form,
      onSubmit,
      route,
      model: ref(null),
      options,
      img
    }
  }

})
</script>
