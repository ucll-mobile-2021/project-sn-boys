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
                      <ion-button @click="prevWeekRoute()" class="ion-margin-start" color="warning">Previous</ion-button>
                      <ion-button @click="nextWeekRoute()" class="ion-margin-start" color="tertiary">Next</ion-button>
                    </ion-col>
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

      <ExploreContainer name="Calendar page" />
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
import ExploreContainer from '@/components/ExploreContainer.vue'
import { Appointment, useMainStore } from '@/stores'
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'Calendar',
  components: {
    ExploreContainer,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage
  },

setup(){
  const route = useRoute()
  const router = useRouter()

  const currentWeekParam = route.params.week
  let currentWeek = new Date()
  const store = useMainStore();
  console.log(currentWeekParam)
  const checkWeek = (appointments: Appointment[]) => {
    if(currentWeekParam !== undefined){
      currentWeek = new Date(String(currentWeekParam))
      console.log(currentWeek)
    }
    const first = currentWeek.getDate() - currentWeek.getDay() +1; // First day is the day of the month - the day of the week
    const last = first + 6; // last day is the first day + 6
    const thisWeeks: Appointment[] = []
    appointments.forEach(appointment =>
    {
      const cDay = new Date(appointment.date).getDate()
      if(cDay <= last && cDay >= first){
        thisWeeks.push(appointment)
      }
      } 

    )
    
    return thisWeeks
  }

  const prevWeekRoute = () => {
     currentWeek.setDate(currentWeek.getDate()-7)
  router.push({name: 'Calendar', params: { week: "haha" }})
}

 


return {
  appointments: computed(() => checkWeek(store.appointments.reverse())),
  prevWeekRoute
}
}
}


</script>