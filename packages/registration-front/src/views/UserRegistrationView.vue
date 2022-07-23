<template>
  <section class="list-section">
    <UserRegistrationForm />
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import UserRegistrationForm from "../components/UserRegistrationForm.vue";
export default defineComponent({
  name: "UserRegistrationView",
  components: {
    UserRegistrationForm,
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
