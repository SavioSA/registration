<template>
  <section class="buttons-section">
    <v-btn color="success">
      <div class="icon-container">
        <v-icon icon="fas fa-plus" />
      </div>
      <p>Novo usuário</p>
    </v-btn>
    <v-btn color="primary">
      <div class="icon-container">
        <v-icon icon="fas fa-list" />
      </div>
      <p>Lista de usuários</p>
    </v-btn>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainOptionsButtons",
  data() {
    return {};
  },
});
</script>

<style scoped>
section.buttons-section {
  width: 70%;
  display: flex;
  justify-content: space-around;
  padding: 2rem;
}

div.icon-container {
  margin-right: 0.5rem;
}
</style>
