<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleRegisterCategoria">
      <p class="text-h4 text-center col-12 ">Registo</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-lg">
        <q-input
          label="Name"
          v-model="form.name"
          outlined
        />

        <div class="q-pt-md q-gutter-y-sm">
          <q-btn
              :label="route.params.id ? 'atualizar':'Registar' "
              class="full-width"
              outline
              color = "primary"
              rounded
              type="submit"
          />

           <q-btn
              label="voltar"
              class="full-width"
              flat
              size="sm"
              color = "secondary"
              to='/list-category'
          />
        </div>

      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent,onBeforeMount, ref } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import useNotify from 'src/composables/useNotify'
import useApi from 'src/composables/useApi'

export default defineComponent({
  name: 'RegisterCategoriaPage',
  setup(){

    const router = useRouter()
    const route  = useRoute()
    const {sucesso,semSucesso} = useNotify()
    const {post,getById,update} = useApi();
    const table = 'category'

    let categoria = {}

    const form = ref(
      {
        name:'',
      }
    )

    // const isUpdate = route.params.id

    onBeforeMount(async()=>{
      if(route.params.id){
        try{
          categoria = await getById(table,route.params.id)
          form.value = categoria
        }catch(error){
          semSucesso(error.message)
        }
      }
    })


    const handleRegisterCategoria =async()=>{
      if(route.params.id){
        await update(table,form.value)
        router.push({name:'list-category'})
        sucesso('Categoria actualizada')
      }
      else
      {
        try{
          await post(table,form.value)
          sucesso('Categoria registada')
          router.push({name:'list-category'})
        }catch(error){
          semSucesso(error.message)
        }
      }
    }


      return {
        form,
        handleRegisterCategoria,
        route
      }

  }
})
</script>
