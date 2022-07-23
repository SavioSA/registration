import type {
  UserInterface,
  UsersPaginationInterface
} from "@lib/utilInterfaces";
import axios from "axios";
import { defineStore } from "pinia";

export const useUsersStore = defineStore({
  id: "user",
  state: (): {
    usersInformations: UsersPaginationInterface | undefined;
    currentUser: UserInterface | undefined;
  } => ({
    usersInformations: undefined,
    currentUser: undefined,
  }),
  getters: {
    getUsersInformations: (state) => state.usersInformations,
    getCurrentUser: (state) => state.currentUser,
  },
  actions: {
    async fetchUsers(offset = 8, page = 0) {
      try {
        const query = await axios.get(
          `http://localhost:3333/users?offset=${offset}&page=${page}`
        );
        this.usersInformations = query.data;
      } catch (error) {
        console.error(error);
      }
    },
    async createUser(user: UserInterface) {
      try {
        console.log("asdadasd");

        const query = await axios.post(`http://localhost:3333/users`, {
          ...user,
        });
        this.currentUser = query.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
