<template>
  <section class="main-section">
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
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useUsersStore } from "../stores/users";
export default defineComponent({
  name: "UserList",
  setup() {
    const usersStore = useUsersStore();
    usersStore.fetchUsers();
    const users = computed(() => {
      return usersStore.getUsers;
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
</style>
