<template>
  <button class="theme-switcher">
    <div class="theme-switcher__init">
      <div class="theme-switcher__opts" :style="style" @click="switchTheme">
        <div>B</div>
        <div>W</div>
      </div>
    </div>
    <div class="theme-switcher__point"></div>
  </button>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const currentTheme = ref<string>("dark");

const style = computed(() => {
  return currentTheme.value === "dark"
    ? {
        transform: "translateY(0%)",
        transition: ".5s ease-in-out",
      }
    : {
        transform: "translateY(-50%)",
        transition: ".5s ease-in-out",
      };
});

const switchTheme = () => {
  const html = document.querySelector("html");
  const theme = html?.getAttribute("data-theme");
  if (theme === "dark") {
    html?.setAttribute("data-theme", "light");
    currentTheme.value = "light";
  } else {
    html?.setAttribute("data-theme", "dark");
    currentTheme.value = "dark";
  }
};
</script>

<style lang="scss" scoped>
.theme-switcher {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  cursor: pointer;

  &__init {
    font-size: 1.34rem;
    text-align: center;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: var(--platform-color-black);
    height: 1.34rem;
    overflow: hidden;
  }

  &__point {
    width: 0.8rem;
    height: 0.8rem;
    background: var(--color-theme);
    border: 1px solid var(--platform-color-black);
    border-radius: 100%;
    transition: border, background,
      opacity 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
  }
}
</style>
