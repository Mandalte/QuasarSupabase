<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleResetPass">
      <p class="text-h5 text-center col-12 ">Recuperar Senha</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-lg"> 
        <q-input 
          label="Novo Senha" 
          v-model="password"
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
        </div>     
               
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'ResetPasswordPage',
  setup(){

    const router = useRouter()
    const {resetPassword} = useAuthUser() 
    const route = useRoute()
    const token = route.query.token

    const password = ref('') 

    const handleResetPass = async()=>{
       try{ 
          await resetPassword(token,password.value)
       }catch(error){
          alert(token+" "+password.value+" "+error)
       }
      
      router.push({name:'login'})
    }
      return {
        password,
        handleResetPass
      }
  }
})
</script>
