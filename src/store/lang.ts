import { defineStore } from "pinia";
import { ref } from "vue";

export const useLangStore = defineStore("lang", () => {
  const language = ref<string>(sessionStorage.getItem("localeLang") || "en");

  const changeLang = (lang: string) => {
    language.value = lang;
  };

  return {
    language,
    changeLang,
  };
});
