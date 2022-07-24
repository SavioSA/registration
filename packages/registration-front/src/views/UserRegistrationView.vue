<template>
  <section class="list-section">
    <UserEditorForm pageTitle="Criar Usuário" :userFormData="userFormData" />
  </section>
</template>
<script lang="ts">
import { computed, defineComponent, reactive } from "vue";
import UserEditorForm from "../components/UserEditorForm.vue";
export default defineComponent({
  name: "UserRegistrationView",
  components: {
    UserEditorForm,
  },
  setup() {
    const userFormData = reactive({
      name: "",
      birthday: null,
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
