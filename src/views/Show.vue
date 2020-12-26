<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Show appointment</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
        <ion-card>
            <ion-card-header>
                <ion-card-title>{{ appointment.title }}</ion-card-title>
            </ion-card-header>
            <ion-card-content>{{ new Date(appointment.date).toLocaleString("nl-BE") }}</ion-card-content>
            <ion-card-content>{{ appointment.description }}</ion-card-content>
            <ion-card-content>{{ appointment.address }}</ion-card-content>
        </ion-card> 
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
  IonTextarea,
  IonItem,
} from '@ionic/vue'
import { Ref, ref } from 'vue'
import { useMainStore, Appointment } from '@/stores'
import { useRoute } from 'vue-router'

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

  },

  setup() {
    const clicked: Ref<boolean> = ref(false)
    const route = useRoute()

    const store = useMainStore()

    const appointmentId = Number(route.params.appointmentId);

    const appointment = ref(Object.assign({}, store.appointments.filter(appointment =>appointmentId === appointment.id!)[0]))

    return { appointment, clicked }
  }
}
</script>