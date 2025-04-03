<template>
  <div :style="containerStyle" @wheel="handleWheel">
    <div class="w-full h-full bg-black flex items-center justify-center">
      <button-card
        :id="info.id"
        :date="info.date"
        :title="info.title"
        :tags="info.tags"
        :src="cardImage1"
      />
    </div>
    <Section />
  </div>
</template>

<script setup lang="ts">
import buttonCard from "@/components/buttonCard/index.vue";
import Section from "./section.vue";
import { computed, reactive, ref } from "vue";
import cardImage1 from "@/assets/image/cardImage1.jpg";

const info = reactive({
  id: "EXP 018",
  date: "2022",
  src: cardImage1,
  link: "",
  title: "Trappist-1D UE5",
  tags: ["MONTHLY", "UNREAL_ENGINE", "VIDEO"],
});

const y = ref(0);

const containerStyle = computed(() => {
  return {
    transform: `translate3d(0px, ${y.value}px, 0px)`,
    transition: "transform 0.5s cubic-bezier(.01,.26,.58,1)",
    opacity: "1",
  };
});

const handleWheel = (e: WheelEvent) => {
  console.log(e);
  const deltaY = e.deltaY;
  if (deltaY > 0) {
    y.value = Math.max(-2700 + 1040, y.value - 100);
  } else {
    y.value = Math.min(0, y.value + 100);
  }
};

// window.addEventListener("wheel", (e) => {
//   const deltaY = e.deltaY;
//   if (deltaY > 0) {
//     y.value = Math.max(-2700 + 1040, y.value - 100);
//   } else {
//     y.value = Math.min(0, y.value + 100);
//   }
//   // console.log(y.value, containerStyle.value);
// });
</script>

<style lang="scss" scoped></style>
