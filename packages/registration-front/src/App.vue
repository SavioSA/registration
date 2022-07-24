<template>
  <v-app>
    <v-main>
      <section class="main-section">
        <MainOptionsButtons />
        <router-view />
      </section>
      <Feedback />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainOptionsButtons from "./components/MainOptionsButtons.vue";
import Feedback from "./components/Feedback.vue";
export default defineComponent({
  name: "App",
  components: {
    MainOptionsButtons,
    Feedback,
  },
  data() {
    return {
      //
    };
  },
});
</script>

<style scoped>
section.main-section {
  display: flex;
  align-items: center;
  flex-direction: column;
}

main {
  background: #d0e6ff;
}
</style>
