<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <p class="text-h4 text-center col-12 ">Login</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-lg">
        <q-input 
          label="Email" 
          v-model="form.email"
          outlined
          placeholder="Escreva teu email"
          :rules="[val => !!val && validarEmail(val) || 'Escreva um email valido']"
          lazy-rules
        />  

        <q-input 
        label="Senha" 
        placeholder="Escreva a tua senha" 
        v-model="form.password" 
        outlined 
        :type="isPwd ? 'password' : 'text'"
        :rules="[val => val.length >= 6 || 'A senha deve conter no minimo 6 caracteres']"
        lazy-rules
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"              
            />
          </template>
        </q-input>

        <div class="q-pt-md">
          <q-btn
              label="Entrar"
              class="full-width"
              outline
              color = "primary"
              rounded
              type="submit"
          />
        </div>
        <div>
            <q-btn
                label="Regista-se"
                class="full-width"
                flat
                size="sm"
                color = "secondary" 
                to="/register" 
            />
            
            <q-btn
                label="recuperar senha"
                class="full-width"
                flat
                size="sm"
                color = "secondary" 
                to="fogoutpassword" 
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
import useNotify from 'src/composables/useNotify'

export default defineComponent({
  name: 'LoginPage',

  setup(){
    const router = useRouter()
    const {login} = useAuthUser()
    const {sucesso,semSucesso} = useNotify()

    const form = ref(
      {
        email:"",
        password:""
      }
    )

    const handleLogin = async () =>{
      try{
          await login(form.value)
          sucesso("login confirmado")
          router.push({name:'me'})
      } catch(error){

        if(error.message == 'Failed to fetch')
          semSucesso("Verifica a conexao a net")
      }
    }

      const validarEmail = (email) =>{
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
      }

      return {
        form,
        handleLogin,
        isPwd: ref(true),
        validarEmail
      }

  }
})
</script>
