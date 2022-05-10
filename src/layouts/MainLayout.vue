<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Tens Pay
        </q-toolbar-title>

        <div>

    <q-btn-dropdown flat color="with" icon="person">
      <q-list>
        <q-item clickable v-close-popup @click="sair">
          <q-item-section>
            <q-item-label>Sair</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>

        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    
  </q-layout>
</template>
  
<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import router from 'src/router'
import { useRouter } from 'vue-router'
import { useQuasar} from 'quasar'



export default defineComponent({
  name: 'MainLayout',

  setup () {
    const leftDrawerOpen = ref(false)
    const {logout} = useAuthUser()
    const router = useRouter()
    const $q = useQuasar()

    const sair = async () => {

        $q.dialog({
          title:'logout',
          message: 'Desejas mesmo sair da aplicacao',
          persistent:true,
          cancel:true
        }).onOk(
          async () => {
            await logout()
            router.replace({name:'login'})
          }
        )
           
      }

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      sair
    }
  }
})
</script>
