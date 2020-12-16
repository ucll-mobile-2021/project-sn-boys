import { defineStore } from "pinia";
import { Plugins } from "@capacitor/core";

export type Todo = {
  id?: number;
  name: string;
  description: string;
};

const { Storage } = Plugins;

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
});
