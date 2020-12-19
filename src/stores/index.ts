import { defineStore } from "pinia";
import { Plugins } from "@capacitor/core";
/*
export type Todo = {
  id?: number;
  name: string;
  description: string;
};*/

export type Appointment = {
  id?: number;
  date: string;
  description: string;
  adress: string;
};

const { Storage } = Plugins;


export const useMainStore = defineStore({
  // name of the store
  // it is used in devtools and allows restoring state
  id: "todos",
  // a function that returns a fresh state
  state: () => ({
    appointments: [] as Appointment[],
  }),
  // optional actions
  actions: {
    async loadAppointment() {
      const { value } = await Storage.get({ key: "appointments" });
      if (value === null) return;
      const t = JSON.parse(value);
      this.appointments = t as Appointment[];
    },

    async saveAppointment() {
      const value = JSON.stringify(this.appointments);
      await Storage.set({
        key: "appointments",
        value,
      });
    },

    async addAppointment(appointment: Appointment) {
      this.appointments.push(appointment);
      await Storage.set({
        key: "appointments",
        value: JSON.stringify(this.appointments),
      });
    },

    async deleteAppointment(appointment: Appointment) {
      this.appointments = this.appointments.filter((t) => appointment.id !== t.id);
      await Storage.set({
        key: "appointments",
        value: JSON.stringify(this.appointments),
      });
    },
  },
});
/*
export const useMainStore = defineStore({
  // name of the store
  // it is used in devtools and allows restoring state
  id: "todos",
  // a function that returns a fresh state
  state: () => ({
    todos: [] as Todo[],
  }),
  // optional actions
  actions: {
    async loadTodos() {
      const { value } = await Storage.get({ key: "todos" });
      if (value === null) return;
      const t = JSON.parse(value);
      this.todos = t as Todo[];
    },

    async saveTodos() {
      const value = JSON.stringify(this.todos);
      await Storage.set({
        key: "todos",
        value,
      });
    },

    async addTodo(todo: Todo) {
      this.todos.push(todo);
      await Storage.set({
        key: "todos",
        value: JSON.stringify(this.todos),
      });
    },

    async deleteTodo(todo: Todo) {
      this.todos = this.todos.filter((t) => todo.id !== t.id);
      await Storage.set({
        key: "todos",
        value: JSON.stringify(this.todos),
      });
    },
  },
});*/
