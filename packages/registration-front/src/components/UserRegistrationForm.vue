<template>
  <section class="main-section">
    <v-card class="registration-card" title="Cadastre um novo Usuário">
      <v-form>
        <v-container>
          <v-row>
            <v-col class="input-test">
              <v-text-field
                v-model="title"
                :rules="rules"
                hint="This field uses counter prop"
                label="Regular"
              ></v-text-field>
            </v-col>
            <v-col class="input-test">
              <v-text-field
                v-model="title"
                :rules="rules"
                type="date"
                counter="25"
                hint="This field uses counter prop"
                label="Regular"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-container class="buttons-container">
            <v-btn color="error" class="mr-4" @click="returnToMain">
              Cancelar
            </v-btn>
            <v-btn color="success" class="mr-4" @click="reset">
              Cadastrar
            </v-btn>
          </v-container>
        </v-container>
      </v-form>
    </v-card>
  </section>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useUsersStore } from "../stores/users";
export default defineComponent({
  name: "UserRegistrationForm",
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

    const returnToMain = () => {
      router.replace("/");
    };
    return {
      users,
      formatDate,
      currentPage,
      pagesQuantity,
      returnToMain,
    };
  },
});
</script>

<style lang="scss" scoped>
section.main-section {
  width: 100%;
  display: flex;
  justify-content: center;
  .registration-card {
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .v-card-title {
      font-size: 20pt;
    }
  }
  @media (min-width: 64rem) {
    .registration-card {
      width: 70%;
    }
  }

  .input-test {
    width: 50%;
  }

  .v-form {
    width: 100%;
  }

  .buttons-container {
    display: flex;
    justify-content: space-around;
    width: 80%;
  }
}
</style>
