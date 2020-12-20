<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon :icon="cog" />
          <ion-label>Settings</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="Appointments" href="/tabs/appointments">
          <ion-icon :icon="logoStackoverflow" />
          <ion-label>Appointments</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/tab3">
          <ion-icon :icon="square" />
          <ion-label>Tab 3</ion-label>
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
import { logoStackoverflow, square, cog } from 'ionicons/icons'

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      logoStackoverflow,
      square,
      cog
    }
  }
}
</script>