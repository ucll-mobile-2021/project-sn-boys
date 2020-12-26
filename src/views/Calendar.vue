<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Calendar</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Calendar</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-title>{{mondayDate}} - {{sundayDate}}</ion-title>
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
                  <ion-card-content>{{ appointment.description }}</ion-card-content>
                  <ion-card-content>{{ appointment.address }}</ion-card-content>
                </ion-card>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-list>
      </div>
      <div class="ion-padding ion-text-center" v-else>
        <ion-label>No appointments Found</ion-label>
      </div>
        <ion-col size="4">
        <ion-button @click="prevWeek()" class="ion-margin-start" color="warning">Previous</ion-button>
        <ion-button @click="nextWeek()" class="ion-margin-start" color="tertiary">Next</ion-button>
        </ion-col>
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
import { Appointment, useMainStore } from '@/stores'
import { computed, onBeforeMount, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'Calendar',
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage
  },

setup(){
  const route = useRoute()
  const router = useRouter()
  const store = useMainStore();

  const appointments = ref(store.appointments)

  const currentWeek = new Date()

  const mondayDate = ref('')
  const sundayDate = ref('')



  const isThisWeek = (date: Date) => {
    const lastMonday = new Date(currentWeek); 
    lastMonday.setDate(lastMonday.getDate() - (lastMonday.getDay()-1)); 
    lastMonday.setHours(0,0,0,0); 

    const res = lastMonday.getTime() <= date.getTime() &&
                date.getTime() < ( lastMonday.getTime() + 604800000);
    return res;
  }

  const loadAppointments = () => {
    // lelijke fix voor inladen monday/sunday Date, nie kijken aub
    const lastMonday = new Date(currentWeek); 
    lastMonday.setDate(lastMonday.getDate() - (lastMonday.getDay()-1)); 
    lastMonday.setHours(0,0,0,0); 
    
    mondayDate.value = new Date(lastMonday).toLocaleDateString("nl-BE")
    sundayDate.value = new Date(lastMonday.getTime() + 604800000).toLocaleDateString("nl-BE")

    appointments.value = []
    const apps: Appointment[] = store.appointments
    apps.forEach(app => {
      if(isThisWeek(new Date(app.date))) appointments.value.push(app)
    })
  }

  onBeforeMount(() => {
    loadAppointments()
  })

  const prevWeek = () => {
     currentWeek.setDate(currentWeek.getDate()-7)
     loadAppointments()
  }

  const nextWeek = () => {
    currentWeek.setDate(currentWeek.getDate()+7)
    loadAppointments()
  }

return {
  appointments,
  prevWeek,
  nextWeek,
  mondayDate,
  sundayDate
}
}
}


</script>