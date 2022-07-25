import type {
  UserInterface,
  UsersPaginationInterface
} from "@shared/interfaces";
import axios from "axios";
import { defineStore } from "pinia";
import { useFeedbackStore } from "./feedback";
const feedbackStore = useFeedbackStore();

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
        feedbackStore.showErrorFeedback("Houve um erro ao buscar usuários.");
        console.error(error);
      }
    },
    async createUser(user: UserInterface) {
      try {
        const query = await axios.post(`http://localhost:3333/users`, {
          ...user,
        });
        this.currentUser = query.data;
        if (query.status === 200) {
          feedbackStore.showSucessFeedback("Usuário criado com sucesso.");
        }
      } catch (error) {
        feedbackStore.showErrorFeedback("Houve um erro ao criar usuário.");
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
        feedbackStore.showErrorFeedback("Houve um erro ao buscar usuários.");
      }
    },
    async editCurrentUser(user: UserInterface) {
      try {
        const query = await axios.put(`http://localhost:3333/users`, {
          ...user,
        });
        if (query.status === 200) {
          feedbackStore.showSucessFeedback("Usuário editado com sucesso.");
        }
      } catch (error) {
        feedbackStore.showErrorFeedback("Houve um erro ao editar usuário.");
        console.error(error);
      }
    },
    async deleteUser(id: number) {
      try {
        const query = await axios.delete(`http://localhost:3333/users/${id}`);
        if (query.status === 200) {
          feedbackStore.showSucessFeedback("Usuário excluído com sucesso.");
        }
      } catch (error) {
        feedbackStore.showErrorFeedback("Houve um erro ao excluir usuário.");
        console.error(error);
      }
    },
  },
});
