<template>
  <div class="w-full h-full bg-black flex items-center justify-center">
    <button-card
      :id="info.id"
      :date="info.date"
      :title="info.title"
      :tags="info.tags"
      :src="cardImage1"
    />
  </div>
</template>

<script setup lang="ts">
import buttonCard from "@/components/buttonCard/index.vue";
import { reactive } from "vue";
import cardImage1 from "@/assets/image/cardImage1.jpg";

const info = reactive({
  id: "EXP 018",
  date: "2022",
  src: cardImage1,
  link: "",
  title: "Trappist-1D UE5",
  tags: ["MONTHLY", "UNREAL_ENGINE", "VIDEO"],
});
</script>

<style lang="scss" scoped></style>
