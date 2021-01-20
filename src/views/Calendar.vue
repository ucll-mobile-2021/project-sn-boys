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
        <ion-col size="4">
          <ion-button @click="prevWeek()" class="ion-margin-start" color="warning">Previous</ion-button>
          <ion-button @click="nextWeek()" class="ion-margin-start" color="tertiary">Next</ion-button>
        </ion-col>
      <ion-title>{{mondayDate}} - {{sundayDate}}</ion-title>
      <div class="list" v-if="appointments.length > 0" v-bind="updater">
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
import { computed, onActivated, onBeforeMount, onRenderTriggered, onUpdated, ref } from 'vue'
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

  let updater = false

  const currentWeek = new Date()

  const isThisWeek = (appointment: Appointment) => {
    const date = new Date(appointment.date)
    const lastMonday = new Date(currentWeek); 
    lastMonday.setDate(lastMonday.getDate() - (lastMonday.getDay()-1)); 
    lastMonday.setHours(0,0,0,0); 

    const res = lastMonday.getTime() <= date.getTime() &&
                date.getTime() < ( lastMonday.getTime() + 604800000);

    return res;
  }

  const appointments = ref(store.appointments.filter(isThisWeek))

  const mondayDate = ref('')
  const sundayDate = ref('')



  const setDataLimits = (date: Date) => {
    // lelijke fix voor inladen monday/sunday Date, nie kijken aub
    date.setDate(date.getDate() - (date.getDay()-1)); 
    date.setHours(0,0,0,0); 
    
    mondayDate.value = new Date(date).toLocaleDateString("nl-BE")
    sundayDate.value = new Date(date.getTime() + 604800000).toLocaleDateString("nl-BE")

    appointments.value = store.appointments.filter(isThisWeek)

    //werkt met v-bind, zorgt ervoor dat het component re-rendered, weer een dirty fix maar vond niets anders...
    updater = !updater
  } 

  onBeforeMount(() => {
    appointments.value = store.appointments.filter(isThisWeek)
    setDataLimits(new Date(currentWeek))
  }) 

  onUpdated(() => {
    //reloads the appointments when we re-enter the component
    appointments.value = store.appointments.filter(isThisWeek)
  })

  const prevWeek = () => {
     currentWeek.setDate(currentWeek.getDate()-7)
     setDataLimits(currentWeek)
  }

  const nextWeek = () => {
    currentWeek.setDate(currentWeek.getDate()+7)
    setDataLimits(currentWeek)
    appointments.value = store.appointments.filter(isThisWeek)
  }

return {
  appointments,
  prevWeek,
  nextWeek,
  mondayDate,
  sundayDate,
  isThisWeek,
}
}
}


</script>

<style scoped>
    .list {
      margin-bottom: 5%;
    }
</style>