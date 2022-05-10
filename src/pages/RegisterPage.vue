<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleRegister">
      <p class="text-h4 text-center col-12 ">Registo</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-lg">
        <q-input 
          label="Name" 
          v-model="form.name"
          outlined
        /> 
        <q-input 
          label="Email" 
          v-model="form.email"
          outlined
        />
        <q-input 
          label="Password" 
          v-model="form.password"
          type="password"
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
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'RegisterPage',
  setup(){

    const router = useRouter()
    const {register} = useAuthUser()

    const form = ref(
      {
        name:"",
        email:"",
        password:""
      } 
    )

    const handleRegister = async()=>{
      try{
          await register(form.value)
          router.push({
            name:'email-confirmation',
            query: { email:form.value.email }
          }) 
      }catch(error){
          alert(error+"Agostinho")
      }
    }

    
      return {
        form,
        handleRegister
      }

  }
})
</script>
