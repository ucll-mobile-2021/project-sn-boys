<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Afspraken</ion-title>
        <ion-button @click="openAddRoute" color="success" class="ion-padding-end" slot="end">
          <ion-icon slot="start" :icon="addCircleOutline"></ion-icon>Add Afspraak
        </ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Afspraak</ion-title>
        </ion-toolbar>
      </ion-header>
      <div v-if="todos.length > 0">
        <ion-list v-for="todo in todos" :key="todo.id">
          <ion-grid>
            <ion-row class="ion-align-items-center">
              <ion-col size="8">
                <ion-card>
                  <ion-card-header>
                    <ion-card-title>{{ todo.name }}</ion-card-title>
                  </ion-card-header>
                  <ion-card-content>{{ todo.description }}</ion-card-content>
                </ion-card>
              </ion-col>
              <ion-col size="4">
                <ion-button class="ion-margin-start" color="tertiary">Show</ion-button>
                <ion-button @click="openUpdateRoute(todo)" class="ion-margin-start" color="warning">Update</ion-button>
                <ion-button @click="deleteAppointment(todo)" class="ion-margin-start" color="danger">Delete</ion-button>
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
import { Plugins } from '@capacitor/core'

export default {
  name: 'Tab2',
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

    const openAddRoute = () => {
      router.push('/tabs/todos/add')
    }

    const openUpdateRoute = (appointment: Appointment) => {
        router.push({name: 'update', params: { todoId: appointment.id!}})
    }

    const deleteAppointment = async (appointment: Appointment) => {
      const confirm = await Modals.confirm({
        title: 'Delete appointment',
        message: `Are you sure you want to delete appointment with id ${appointment.id}`
      })

      if (confirm.value) {
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
      todos: computed(() => store.appointments.reverse()),
      deleteAppointment,
      openUpdateRoute
    }
  }
}
</script>