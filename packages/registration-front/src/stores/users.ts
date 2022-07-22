import axios from "axios";
import { defineStore } from "pinia";
export const useUsersStore = defineStore({
  id: "user",
  state: () => ({
    users: [],
  }),
  getters: {
    getUsers: (state) => state.users,
  },
  actions: {
    async fetchUsers() {
      try {
        const query = await axios.get("http://localhost:3333/users");
        this.users = query.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
