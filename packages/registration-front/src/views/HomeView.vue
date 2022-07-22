<template>
  <UserRegistration />
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import UserRegistration from "../components/UserRegistration/UserRegistration.vue";

export default defineComponent({
  name: "HomeView",

  components: {
    UserRegistration,
  },
});
</script>
