<template>
  <div class="cursor cursor--visible" :style="cursorStyle"></div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from "vue";
import emitter from "@/utils/mitt";
import { throttle } from "@/utils";

const mousePosition = reactive({
  x: 0,
  y: 0,
});

const cursorScale = ref<number>(1);

const mouseMoveMent = throttle(() => {
  window.addEventListener("mousemove", (e) => {
    mousePosition.x = e.pageX;
    mousePosition.y = e.pageY;
  });
}, 10);

const cursorStyle = computed(() => {
  return {
    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(${cursorScale.value})`,
  };
});

onMounted(() => {
  mouseMoveMent();
  emitter.on("cursorEnter", () => {
    cursorScale.value = 0.5;
  });

  emitter.on("cursorLeave", () => {
    cursorScale.value = 1;
  });
});

onUnmounted(() => {
  window.removeEventListener("mousemove", () => {});
  emitter.off("cursorEnter");
  emitter.off("cursorLeave");
});
</script>

<style lang="scss" scoped>
.cursor--visible {
  display: block;
}
.cursor {
  transition: transform 0.4s cubic-bezier(0.05, 0.3, 0.43, 1.75);
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
