<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Update appointment</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Account</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-item class="ion-margin-top">
        <ion-label position="floating">Name</ion-label>
        <ion-input v-model="appointment.name"></ion-input>
      </ion-item>
      <ion-item class="ion-margin-top">
        <ion-label position="floating">Description</ion-label>
        <ion-textarea v-model="appointment.description"></ion-textarea>
      </ion-item>
      <ion-button
        @click="updateAppointment"
        :disabled="clicked"
        class="ion-margin-top"
        color="success"
        expand="block"
      >Update appointment</ion-button>
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
import { useMainStore, Appointment } from '@/stores'
import { useRouter, useRoute } from 'vue-router'
import { Plugins } from '@capacitor/core'

export default {
  name: 'Appointments',
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
    const name: Ref<string> = ref('')
    const description: Ref<string> = ref('')
    const clicked: Ref<boolean> = ref(false)
    const router = useRouter()
    const route = useRoute()

    const store = useMainStore()

    const appointmentId = Number(route.params.appointmentId);

    const appointment = ref(Object.assign({}, store.appointments.filter(appointment =>appointmentId === appointment.id!)[0]))

    const updateAppointment = () => {
        store.appointments = store.appointments.filter(appointment => appointmentId != appointment.id!)
        store.addAppointment(appointment.value)
        router.back()
    }

    return { appointment, updateAppointment, clicked }
  }
}
</script>