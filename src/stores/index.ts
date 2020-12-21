import { defineStore } from "pinia";
import { Plugins } from "@capacitor/core";
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';


export type Appointment = {
  id?: number;
  date: Date;
  description: string;
  address: string;
};

declare const cordova: any;
const { Storage } = Plugins;
const inTenSec = new Date();
      inTenSec.setSeconds(inTenSec.getSeconds()+10);

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
      cordova.Plugins.notifications.local.schedule({
        title: 'titel test',
        text: 'test text',
        at: inTenSec

      })
      
      this.appointments.push(appointment);
      await Storage.set({
        key: "appointments",
        value: JSON.stringify(this.appointments),
      });
    },

    async deleteAppointment(appointment: Appointment) {
      this.appointments = this.appointments.filter((t) => appointment.id !== t.id).reverse();
      await Storage.set({
        key: "appointments",
        value: JSON.stringify(this.appointments),
      });
    },
  },
});