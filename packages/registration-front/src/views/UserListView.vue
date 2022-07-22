<template>
  <section class="list-section">
    <UserList />
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import UserList from "../components/UserList.vue";
export default defineComponent({
  name: "UserListView",
  components: {
    UserList,
  },
  data() {
    return {};
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
