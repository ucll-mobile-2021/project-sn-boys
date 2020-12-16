<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Update TODO</ion-title>
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
        <ion-input v-model="todo.name"></ion-input>
      </ion-item>
      <ion-item class="ion-margin-top">
        <ion-label position="floating">Description</ion-label>
        <ion-textarea v-model="todo.description"></ion-textarea>
      </ion-item>
      <ion-button
        @click="updateTodo"
        :disabled="clicked"
        class="ion-margin-top"
        color="success"
        expand="block"
      >Update TODO</ion-button>
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
import { useMainStore, Todo } from '@/stores'
import { useRouter, useRoute } from 'vue-router'
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
    const route = useRoute()

    const store = useMainStore()

    const todoId = Number(route.params.todoId);

    // main.todos.filter returned array, maar met id is er maar 1 object erin dus we pakken de eerste
    const todo = ref(Object.assign({}, store.todos.filter(todo =>todoId === todo.id!)[0]))

    const updateTodo = () => {
        store.todos = store.todos.filter(todo => todoId != todo.id!)
        store.addTodo(todo.value)
        router.back()
    }

    return { todo, updateTodo, clicked }
  }
}
</script>