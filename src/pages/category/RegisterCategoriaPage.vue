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
              label="Register"
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
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/useNotify'
import useApi from 'src/composables/useApi'

export default defineComponent({
  name: 'RegisterCategoriaPage',
  setup(){

    const router = useRouter()
    const {sucesso,semSucesso} = useNotify()
    const {post} = useApi();

    const form = ref(
      {
        name:'',
      } 
    )

    const handleRegisterCategoria =async()=>{
      try{
        await post('category',form.value)
        sucesso('categoria registada')
        router.push({name:'list-category'})
      }catch(error){
        semSucesso(error.message)
      }
    }

    
      return {
        form,
        handleRegisterCategoria
      }

  }
})
</script>
