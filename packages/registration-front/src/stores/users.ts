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
    currentUser: UserInterface;
  } => ({
    usersInformations: undefined,
    currentUser: {
      name: "",
      birthday: "",
    },
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
        const query = await axios.post(`http://localhost:3333/users`, {
          ...user,
        });
        this.currentUser = query.data;
      } catch (error) {
        console.error(error);
      }
    },
    async setCurrentUser(id: number) {
      try {
        const query = await axios.get(`http://localhost:3333/users/${id}`);
        const { name, birthday } = query.data;
        const formatedDate = birthday.split("T")[0];
        this.currentUser = {
          id,
          name,
          birthday: formatedDate,
        };
      } catch (error) {
        console.error(error);
      }
    },
    async editCurrentUser(user: UserInterface) {
      try {
        const query = await axios.put(`http://localhost:3333/users`, {
          ...user,
        });
      } catch (error) {
        console.error(error);
      }
    },
    async deleteUser(id: number) {
      try {
        const query = await axios.delete(`http://localhost:3333/users/${id}`);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
