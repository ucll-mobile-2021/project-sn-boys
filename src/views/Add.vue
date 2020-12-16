<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Add TODO</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Account</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-item class="ion-margin-top">
        <ion-label position="floating">Name</ion-label>
        <ion-input v-model="name"></ion-input>
      </ion-item>
      <ion-item class="ion-margin-top">
        <ion-label position="floating">Description</ion-label>
        <ion-textarea v-model="description"></ion-textarea>
      </ion-item>
      <ion-button
        @click="addTodo"
        :disabled="clicked"
        class="ion-margin-top"
        color="success"
        expand="block"
      >Add TODO</ion-button>
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
  name: 'Tab2',
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
    const name: Ref<string> = ref('')
    const description: Ref<string> = ref('')
    const clicked: Ref<boolean> = ref(false)
    const router = useRouter()

    const main = useMainStore()

    const resetValues = () => {
      name.value = ''
      description.value = ''
    }

    const addTodo = async () => {
      // TODO: Check for errors?

      clicked.value = true

      main.addTodo({
        id: Date.now(),
        name: name.value,
        description: description.value
      })

      const toast = await toastController.create({
        message: 'Added new todo to the list',
        duration: 3000,
        color: 'success'
      })

      await toast.present()

      resetValues()

      clicked.value = false

      router.back()
    }

    return { name, description, addTodo, clicked }
  }
}
</script>