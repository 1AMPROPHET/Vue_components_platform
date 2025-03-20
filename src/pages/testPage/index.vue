<template>
  <div class="w-full h-full bg-black flex items-center justify-center">
    <button-card
      :id="info.id"
      :date="info.date"
      :title="info.title"
      :tags="info.tags"
      :src="cardImage1"
    />
    <div class="cursor cursor--visible" :style="cursorStyle"></div>
  </div>
</template>

<script setup lang="ts">
import buttonCard from "@/components/buttonCard/index.vue";
import { computed, onMounted, onUnmounted, reactive } from "vue";
import cardImage1 from "@/assets/image/cardImage1.jpg";

const info = reactive({
  id: "EXP 018",
  date: "2022",
  src: cardImage1,
  link: "",
  title: "Trappist-1D UE5",
  tags: ["MONTHLY", "UNREAL_ENGINE", "VIDEO"],
});

const mousePosition = reactive({
  x: 0,
  y: 0,
});

const mouseMoveMent = () => {
  window.addEventListener("mousemove", (e) => {
    mousePosition.x = e.pageX;
    mousePosition.y = e.pageY;
  });
};

const cursorStyle = computed(() => {
  return {
    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
  };
});

onMounted(() => {
  mouseMoveMent();
});

onUnmounted(() => {
  window.removeEventListener("mousemove", () => {});
});
</script>

<style lang="scss" scoped>
.cursor--visible {
  display: block;
}
.cursor {
  transition: transform 0.1s cubic-bezier(0.08, 0.28, 1, 1.4);
  --size: 8rem;
  position: absolute;
  z-index: 99999;
  top: calc(-1 * var(--size) / 2);
  left: calc(-1 * var(--size) / 2);
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  pointer-events: none;
  backdrop-filter: invert(1) grayscale(1);
}
</style>
