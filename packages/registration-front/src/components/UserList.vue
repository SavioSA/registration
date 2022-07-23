<template>
  <section class="main-section">
    <section class="table-section">
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Nome</th>
            <th class="text-left">Data de nascimento</th>
            <th class="text-left">Opções</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.name">
            <td>{{ user.name }}</td>
            <td>{{ formatDate(user.birthday) }}</td>
            <td><v-icon icon="fas fa-trash" /></td>
          </tr>
        </tbody>
      </v-table>
    </section>
    <section class="pagination-section">
      <v-pagination
        v-model="currentPage"
        :length="pagesQuantity"
      ></v-pagination>
    </section>
  </section>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useUsersStore } from "../stores/users";
export default defineComponent({
  name: "UserList",
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

section.table-section {
  min-height: 27.25rem;
}
</style>
