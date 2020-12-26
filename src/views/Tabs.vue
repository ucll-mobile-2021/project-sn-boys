<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">

        <ion-tab-button tab="Appointments" href="/tabs/appointments">
          <ion-icon :icon="logoStackoverflow" />
          <ion-label>Appointments</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="Calendar" href="/tabs/calendar">
          <ion-icon :icon="calendar" />
          <ion-label>Calendar</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage
} from '@ionic/vue'
import { Appointment } from '../stores/index'
import { logoStackoverflow, calendar, cog } from 'ionicons/icons'

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
   
    return {
      logoStackoverflow,
      calendar,
      cog
    }
  }
}
</script>