<template>
  <section class="list-section">
    <UserEditorForm pageTitle="Criar Usuário" />
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import UserEditorForm from "../components/UserEditorForm.vue";
export default defineComponent({
  name: "UserRegistrationView",
  components: {
    UserEditorForm,
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
