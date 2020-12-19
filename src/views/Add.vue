<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Add Afspraak</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Account</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-item class="ion-margin-top">
        <ion-label position="floating">Description</ion-label>
        <ion-textarea v-model="description"></ion-textarea>
      </ion-item>
      <ion-item class="ion-margin-top">
        <ion-label position="floating">date</ion-label>
        <ion-input v-model="date"></ion-input>
      </ion-item>
      <ion-item class="ion-margin-top">
        <ion-label position="floating">adress</ion-label>
        <ion-input v-model="adress"></ion-input>
      </ion-item>
      <ion-button
        @click="addAfspraak"
        :disabled="clicked"
        class="ion-margin-top"
        color="success"
        expand="block"
      >Add Afspraak</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonButtons,
  IonLabel,
  IonButton,
  IonInput,
  IonTextarea,
  IonItem,
  toastController
} from '@ionic/vue'
import { Ref, ref } from 'vue'
import { useMainStore, } from '@/stores'
import { useRouter } from 'vue-router'
import { Plugins } from '@capacitor/core'

export default {
  name: 'Tab2',
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonBackButton,
    IonButtons,
    IonLabel,
    IonButton,
    IonInput,
    IonTextarea,
    IonItem
  },
  setup() {
    const adress: Ref<string> = ref('')
    const date: Ref<string> = ref('')
    const description: Ref<string> = ref('')
    const clicked: Ref<boolean> = ref(false)
    const router = useRouter()

    const main = useMainStore()

    const resetValues = () => {
      adress.value = ''
      date.value = ''
      description.value = ''
      
    }

    const addAfspraak = async () => {
      // TODO: Check for errors?

      clicked.value = true

      main.addAppointment({
        id: Date.now(),
        date: date.value,
        description: description.value,
        adress: adress.value
      })

      const toast = await toastController.create({
        message: 'Added new afspraak to the list',
        duration: 3000,
        color: 'success'
      })

      await toast.present()

      resetValues()

      clicked.value = false

      router.back()
    }

    return { adress, date, description, addAfspraak, clicked }
  }
}
</script>