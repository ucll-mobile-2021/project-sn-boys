<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Add appointment</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Account</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-item class="ion-margin-top">
        <ion-label position="floating">Description</ion-label>
        <ion-textarea v-model="description"></ion-textarea>
      </ion-item>
      <ion-item class="ion-margin-top">
    <ion-label>Date</ion-label>
    <ion-datetime display-format="D MMM YYYY H:mm" min="2020-12-20" max="2030" :value="date" @ionChange="date = $event.target.value"></ion-datetime>
      </ion-item>
      <ion-item class="ion-margin-top">
        <ion-label position="floating">Address</ion-label>
        <ion-input v-model="address"></ion-input>
      </ion-item>
      <ion-button
        @click="addAppointment"
        :disabled="clicked"
        class="ion-margin-top"
        color="success"
        expand="block"
      >Add appointment</ion-button>
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
import { useMainStore, } from '@/stores'
import { useRouter } from 'vue-router'
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
    const address: Ref<string> = ref('')
    const date: Ref<Date> = ref(new Date())
    const description: Ref<string> = ref('')
    const clicked: Ref<boolean> = ref(false)
    const router = useRouter()

    const { Modals } = Plugins;
    const { LocalNotifications } = Plugins;

    const main = useMainStore()

    const resetValues = () => {
      address.value = ''
      date.value = new Date()
      description.value = ''
      
    }

    const addAppointment = async () => {
      if (new Date(date.value) < new Date() ) {
              const confirm = await Modals.alert({
        title: 'Invalid date',
        message: `Date can't be earlier than current date!`
      })
        return
      }

      if(description.value.trim() === "" || description.value.length > 1000){
        const confirm = await Modals.alert({
          title: 'Invalid description',
          message: `Description can't be empty!`
        })
      return
      }

      if(address.value.trim() === "" || address.value.length > 150){
        const confirm = await Modals.alert({
          title: 'Invalid address',
          message: `Address can't be empty!`
        })
      }

      clicked.value = true

      const scheduleDate = new Date(date.value)
      scheduleDate.setSeconds(scheduleDate.getSeconds()-20)

      const appointmentId = Date.now()

      LocalNotifications.schedule({
          notifications: [{
            title: description.value,
            body: address.value,
            id: appointmentId,
            schedule: { at: scheduleDate}
          }]
      })

      main.addAppointment({
        id: appointmentId,
        date: date.value,
        description: description.value,
        address: address.value
      })

      const toast = await toastController.create({
        message: 'Added new appointment to the list',
        duration: 3000,
        color: 'success'
      })

      await toast.present()

      resetValues()

      clicked.value = false

      router.back()
    }
    
    const onChangeTime = (event: any) => {
      console.log(event);
    }

    return { onChangeTime, address, date, description, addAppointment, clicked }
  }
}
</script>