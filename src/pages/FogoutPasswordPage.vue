<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleFogoutPass">
      <p class="text-h5 text-center col-12 ">Recuperar Senha</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-lg"> 
        <q-input 
          label="Email" 
          v-model="email"
          outlined
        />

        <div class="q-pt-md q-gutter-y-sm">
          <q-btn
              label="enviar"
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
              to='/login'
          />          
        </div>     
               
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'fogoutpassword',
  setup(){

    const router = useRoute()
    const {sendPasswordRestEmail} = useAuthUser()

    const email = ref('')

    const handleFogoutPass = async()=>{
      
      await sendPasswordRestEmail(email.value)
      alert('confime teu email para resert do password') 
    }
      return {
        email,
        handleFogoutPass
      }
  }
})
</script>
