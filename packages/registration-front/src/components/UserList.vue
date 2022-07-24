<template>
  <section class="main-section">
    <section class="no-users-section" v-if="!users.length">
      <v-icon style="color: #000" class="sad-icon" icon="far fa-sad-tear" />
      <h1>Você ainda não registrou nenhum usuário.</h1>
    </section>
    <section class="table-section" v-if="users.length">
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Nome</th>
            <th class="text-left">Data de nascimento</th>
            <th class="text-left">Opções</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>
              <router-link class="link" :to="`users/${user.id}`" />
              {{ user.name }}
            </td>
            <td>
              {{ formatDate(user.birthday) }}
            </td>
            <td><UserDeletionModal :user="user" callerMode="icon" /></td>
          </tr>
        </tbody>
      </v-table>
    </section>
    <section class="pagination-section" v-if="users.length">
      <v-pagination
        v-model="currentPage"
        :length="pagesQuantity"
      ></v-pagination>
    </section>
  </section>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useUsersStore } from "../stores/users";
import UserDeletionModal from "./UserDeletionModal.vue";
export default defineComponent({
  name: "UserList",
  components: {
    UserDeletionModal,
  },
  setup() {
    const currentPage = ref(1);
    watch(currentPage, (val) => {
      usersStore.fetchUsers(8, val);
    });
    const usersStore = useUsersStore();
    usersStore.fetchUsers();
    const users = computed(() => {
      if (usersStore.getUsersInformations) {
        return usersStore.getUsersInformations.users;
      }
      return [];
    });
    const pagesQuantity = computed(() => {
      if (usersStore.getUsersInformations) {
        return usersStore.getUsersInformations.pagesQuantity;
      }
      return 0;
    });
    const formatDate = (value) => {
      if (value) {
        const dateInformation = value.split("T")[0].split("-");
        const day = dateInformation[2];
        const month = dateInformation[1];
        const year = dateInformation[0];
        return `${day}/${month}/${year}`;
      }
    };

    return {
      users,
      formatDate,
      currentPage,
      pagesQuantity,
    };
  },
});
</script>

<style lang="scss" scoped>
section.main-section {
  width: 90%;
}
@media (min-width: 64rem) {
  section.main-section {
    width: 70%;
  }
}

section.no-users-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .sad-icon {
    font-size: 10rem;
  }
  font-size: 2rem;
  text-align: center;
  border-radius: 0.2rem;
  min-height: 27.25rem;
  background: #fff;
}

section.table-section {
  border-radius: 0.2rem;
  min-height: 27.25rem;
}

tr {
  position: relative;
  a {
    position: absolute;
    top: 0;
    left: 0;
    width: 70%;
    height: 100%;
  }
}
</style>
