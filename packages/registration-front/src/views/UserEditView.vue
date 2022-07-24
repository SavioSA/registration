<template>
  <section class="list-section">
    <UserEditorForm pageTitle="Editar Usuário" :userFormData="userFormData" />
  </section>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import UserEditorForm from "../components/UserEditorForm.vue";
import { useUsersStore } from "../stores/users";
export default defineComponent({
  name: "UserRegistrationView",
  components: {
    UserEditorForm,
  },
  setup() {
    const route = useRoute();
    const id = parseInt(route.params.id as string);
    const userStore = useUsersStore();
    userStore.setCurrentUser(id);
    const userFormData = computed(() => {
      return userStore.getCurrentUser;
    });
    return {
      userFormData,
    };
  },
});
</script>

<style scoped>
section.list-section {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
