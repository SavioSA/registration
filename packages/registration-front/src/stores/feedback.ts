import { defineStore } from "pinia";

export const useFeedbackStore = defineStore({
  id: "feedback",
  state: () => ({
    feedbackInformations: {
      message: "",
      type: "",
      isActive: false,
    },
  }),
  getters: {
    getFeedback: (state) => state.feedbackInformations,
  },
  actions: {
    async showSucessFeedback(message: string) {
      this.showFeedback(message, "success");
    },
    async showErrorFeedback(message: string) {
      this.showFeedback(message, "error");
    },
    showFeedback(message: string, type: string) {
      this.feedbackInformations = { message, type, isActive: true };
      setTimeout(() => {
        this.feedbackInformations.isActive = false;
      }, 3000);
    },
  },
});
