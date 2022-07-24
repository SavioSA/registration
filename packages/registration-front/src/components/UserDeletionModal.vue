<template>
  <v-col cols="auto">
    <v-dialog transition="dialog-bottom-transition">
      <template v-slot:activator="{ props }">
        <v-btn
          v-if="callerMode === 'button'"
          class="mr-4"
          color="error"
          v-bind="props"
        >
          Excluir
        </v-btn>
        <v-icon
          v-if="callerMode === 'icon'"
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
            <v-btn @click="deleteUser(isActive, user.id)" color="error">
              Sim
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-col>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useUsersStore } from "../stores/users";
export default defineComponent({
  name: "UserDeletionModal",
  props: {
    user: {
      type: Object,
      required: true,
    },
    callerMode: {
      type: String,
      required: true,
    },
  },
  setup() {
    const usersStore = useUsersStore();
    const deleteUser = async (isActive: { value: boolean }, userId: number) => {
      await usersStore.deleteUser(userId);
      usersStore.fetchUsers();
      isActive.value = false;
    };
    return {
      deleteUser,
    };
  },
});
</script>

<style lang="scss" scoped></style>
