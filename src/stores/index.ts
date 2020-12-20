import { defineStore } from "pinia";
import { Plugins } from "@capacitor/core";


export type Appointment = {
  id?: number;
  date: string;
  description: string;
  adress: string;
};

const { Storage } = Plugins;


export const useMainStore = defineStore({
  id: "appointments",
  state: () => ({
    appointments: [] as Appointment[],
  }),
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