<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Appointments</ion-title>
        <ion-button @click="openAddRoute" color="success" class="ion-padding-end" slot="end">
          <ion-icon slot="start" :icon="addCircleOutline"></ion-icon>Add appointment
        </ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Appointment</ion-title>
        </ion-toolbar>
      </ion-header>
      <div v-if="appointments.length > 0">
        <ion-list v-for="appointment in appointments" :key="appointment.id">
          <ion-grid>
            <ion-row class="ion-align-items-center">
              <ion-col size="8">
                <ion-card>
                  <ion-card-header>
                    <ion-card-title>{{ appointment.title }}</ion-card-title>
                  </ion-card-header>
                  <ion-card-content>{{ new Date(appointment.date).toLocaleString("nl-BE") }}</ion-card-content>
                </ion-card>
              </ion-col>
              <ion-col size="4">
                <ion-button @click="openShowRoute(appointment)" class="ion-margin-start" color="tertiary">Show</ion-button>
                <ion-button @click="openUpdateRoute(appointment)" class="ion-margin-start" color="warning">Update</ion-button>
                <ion-button @click="deleteAppointment(appointment)" class="ion-margin-start" color="danger">Delete</ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-list>
      </div>
      <div class="ion-padding ion-text-center" v-else>
        <ion-label>No appointments Found</ion-label>
      </div>
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
  IonButton,
  toastController
} from '@ionic/vue'
import { addCircleOutline } from 'ionicons/icons'
import { useRouter } from 'vue-router'
import { useMainStore, Appointment } from '@/stores'
import { computed } from 'vue'
import { LocalNotificationRequest, LocalNotificationPendingList, Plugins } from '@capacitor/core'

export default {
  name: 'Appointments',
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButton
  },
  setup() {
    const router = useRouter()
    const store = useMainStore()
    const { Modals } = Plugins
    const { LocalNotifications } = Plugins


    const openAddRoute = () => {
      router.push('/tabs/appointments/add')
    }

    const openShowRoute = (appointment: Appointment) => {
      router.push({name: 'show', params: { appointmentId: appointment.id!}})
    }

    const openUpdateRoute = (appointment: Appointment) => {
        router.push({name: 'update', params: { appointmentId: appointment.id!}})
    }

    const deleteAppointment = async (appointment: Appointment) => {
      const confirm = await Modals.confirm({
        title: 'Delete appointment',
        message: `Are you sure you want to delete appointment with description: ${appointment.description}`
      })

      if (confirm.value) {
        const appointmentId = appointment.id!

        //Cancels the notification if there is one (but not really)
        const cancelNotification: LocalNotificationRequest = {id: ''+appointment.id!}
        const pendingList: LocalNotificationPendingList = {notifications: [cancelNotification]}
        await LocalNotifications.cancel(pendingList)

        store.deleteAppointment(appointment)
        const toast = await toastController.create({
          message: 'Deleted appointment',
          duration: 3000,
          color: 'danger'
        })
        await toast.present()
      }
    }

    return {
      addCircleOutline,
      openAddRoute,
      appointments: computed(() => store.appointments.reverse()),
      deleteAppointment,
      openUpdateRoute,
      openShowRoute
    }
  }
}
</script>