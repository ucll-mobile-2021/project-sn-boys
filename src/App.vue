<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { defineComponent, onBeforeUnmount } from 'vue'
import { useMainStore } from '@/stores'

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  setup() {
    const main = useMainStore()

    onBeforeUnmount(() => {
      main.saveAppointment()
    })

    main.loadAppointment()
  }
})
</script>