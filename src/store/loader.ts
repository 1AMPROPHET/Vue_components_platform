import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoaderStore = defineStore(
  "loader",
  () => {
    const isFirstTime = ref(true);

    const changeFlag = () => {
      isFirstTime.value = false;
    };

    return {
      isFirstTime,
      changeFlag,
    };
  },
  {
    persist: {
      storage: sessionStorage,
      pick: ["isFirstTime"],
    },
  }
);
