<template>
  <v-app>
    <v-main>
      <section class="main-section">
        <MainOptionsButtons />
        <router-view />
      </section>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainOptionsButtons from "./components/MainOptionsButtons.vue";
export default defineComponent({
  name: "App",
  components: {
    MainOptionsButtons,
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
</style>
