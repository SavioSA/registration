<template>
  <v-alert
    v-if="feedbackInformations?.feedback?.isActive"
    class="feedback-alert"
    :type="feedbackInformations?.feedback?.type"
    >{{ feedbackInformations?.feedback?.message }}</v-alert
  >
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useFeedbackStore } from "../stores/feedback";
export default defineComponent({
  name: "FeedBack",
  setup() {
    const feedbackStore = useFeedbackStore();
    return {
      feedbackStore,
    };
  },
});
</script>

<style lang="scss" scoped>
@keyframes example {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.feedback-alert {
  position: absolute;
  bottom: 0;
  width: 100%;
  animation-name: example;
  animation-duration: 0.5s;
}
</style>
