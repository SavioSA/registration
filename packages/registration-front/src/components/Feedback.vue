<template>
  <v-alert
    v-if="feedback.isActive"
    class="feedback-alert"
    :type="feedback.type"
    >{{ feedback.message }}</v-alert
  >
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useFeedbackStore } from "../stores/feedback";
export default defineComponent({
  name: "FeedBack",
  components: {},
  setup() {
    const feedbackStore = useFeedbackStore();
    const feedback = computed(() => {
      return feedbackStore.getFeedback;
    });
    return {
      feedback,
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
