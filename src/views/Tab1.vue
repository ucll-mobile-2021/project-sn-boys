<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Settings</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-list>
        <ion-item button @click="openAccount">
          <ion-label>Account Settings</ion-label>
          <ion-icon :icon="cog"></ion-icon>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from '@ionic/vue'
import { useRouter } from 'vue-router'
import { cog } from 'ionicons/icons'
export default {
  name: 'Tab1',
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage
  },

  setup() {
    const router = useRouter()

    const openAccount = () => {
      router.push('/tabs/tab1/account')
    }

    return { openAccount, cog }
  }
}
</script>