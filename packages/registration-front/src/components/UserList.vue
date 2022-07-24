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
          <tr v-for="user in users" :key="user.id">
            <td>
              <router-link class="link" :to="`users/${user.id}`" />
              {{ user.name }}
            </td>
            <td>
              {{ formatDate(user.birthday) }}
            </td>
            <td>
              <v-col cols="auto">
                <v-dialog transition="dialog-bottom-transition">
                  <template v-slot:activator="{ props }">
                    <v-icon
                      style="color: red"
                      icon="fas fa-trash"
                      v-bind="props"
                    />
                  </template>
                  <template v-slot:default="{ isActive }">
                    <v-card>
                      <v-toolbar color="error">Excluir Usuário</v-toolbar>
                      <v-card-text>
                        <div class="text-h8 pa-12">
                          Você realmente deseja Excluir o usuário
                          {{ user.name }}?
                        </div>
                      </v-card-text>

                      <v-card-actions class="justify-end">
                        <v-btn @click="isActive.value = false"> Não </v-btn>
                        <v-btn
                          @click="deleteUser(isActive, user.id)"
                          color="error"
                        >
                          Sim
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </v-col>
            </td>
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
import { useRouter } from "vue-router";
import { useUsersStore } from "../stores/users";
export default defineComponent({
  name: "UserList",
  setup() {
    const router = useRouter();
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
    watch(users, (users) => {
      users.forEach((u) => {
        console.log(u);
      });
    });
    const deleteUser = async (isActive: { value: boolean }, userId: number) => {
      await usersStore.deleteUser(userId);
      usersStore.fetchUsers();
      isActive.value = false;
    };
    return {
      users,
      formatDate,
      currentPage,
      pagesQuantity,
      deleteUser,
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
