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
          <ion-title size="large">Update Appoint</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-item class="ion-margin-top">
        <ion-label position="floating">Title</ion-label>
        <ion-textarea v-model="appointment.title"></ion-textarea>
      </ion-item>
      <ion-item class="ion-margin-top">
        <ion-label position="floating">Description</ion-label>
        <ion-textarea v-model="appointment.description"></ion-textarea>
      </ion-item>
      <ion-item class="ion-margin-top">
        <ion-label>Date</ion-label>
        <ion-datetime display-format="D MMM YYYY H:mm" min="2020-12-20" max="2030" :value="appointment.date" @ionChange="appointment.date = $event.target.value"></ion-datetime>

      </ion-item>
      <ion-item class="ion-margin-top">
        <ion-label position="floating">Address</ion-label>
        <ion-textarea v-model="appointment.address"></ion-textarea>
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
  IonTextarea,
  IonItem,
} from '@ionic/vue'
import { Ref, ref } from 'vue'
import { useMainStore, Appointment } from '@/stores'
import { useRouter, useRoute } from 'vue-router'
import { LocalNotificationPendingList, LocalNotificationRequest, Plugins } from '@capacitor/core'

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
    IonTextarea,
    IonItem
  },

  setup() {
    const clicked: Ref<boolean> = ref(false)
    const router = useRouter()
    const route = useRoute()

    const { Modals } = Plugins
    const { LocalNotifications } = Plugins

    const store = useMainStore()

    const appointmentId = Number(route.params.appointmentId);

    const appointment = ref(Object.assign({}, store.appointments.filter(appointment =>appointmentId === appointment.id!)[0]))

    const updateAppointment = async () => {
      if (new Date(appointment.value.date) < new Date() ) {
        const confirm = await Modals.alert({
          title: 'Invalid date',
          message: `Date can't be earlier than current date!`
      })
        return
      }

      if(appointment.value.title.trim() === "" ||appointment.value.title.length > 50){
        const confirm = await Modals.alert({
          title: 'Invalid title',
          message: `Title can't be empty/too long!`
        })
        return
      }

      if(appointment.value.description.trim() === "" || appointment.value.description.length > 1000){
        const confirm = await Modals.alert({
          title: 'Invalid description',
          message: `Description can't be empty/too long!`
        })
      return
      }

      if(appointment.value.address.trim() === "" || appointment.value.address.length > 150){
        const confirm = await Modals.alert({
          title: 'Invalid address',
          message: `Address can't be empty/too long!`
        })
      }

      //Cancels the notification if there is one (but not really)
      const cancelNotification: LocalNotificationRequest = {id: ''+appointmentId}
      const pendingList: LocalNotificationPendingList = {notifications: [cancelNotification]}
      await LocalNotifications.cancel(pendingList)

      const scheduleDate = new Date(appointment.value.date)
      scheduleDate.setSeconds(scheduleDate.getSeconds()-20)

      LocalNotifications.schedule({
          notifications: [{
            title: appointment.value.description,
            body: appointment.value.address,
            id: appointmentId,
            schedule: { at: scheduleDate}
          }]
      })



      store.appointments = store.appointments.filter(appointment => appointmentId != appointment.id!)
      store.addAppointment(appointment.value)
      router.back()
    }

    return { appointment, updateAppointment, clicked }
  }
}
</script>