<template>
  <q-page padding>
    <P class="text-body1">
      Thasks for registering
    </P>

  <p>
    Please confirm your email to finishing registering: <strong>{{$route.query.email}}</strong>
  </p>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'EmailConfirmationPage',
})
</script>
