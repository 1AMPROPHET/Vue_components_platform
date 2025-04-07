<template>
  <a-layout class="w-full h-full">
    <Header />
    <Content />
    <Footer />
    <loader v-if="loaderStore.isFirstTime" />
  </a-layout>
</template>

<script setup lang="ts">
import Header from "./components/header/index.vue";
import Content from "./components/content/index.vue";
import Footer from "./components/footer/index.vue";
import Loader from "./components/loader/index.vue";
import { destroyGeometry, initDustGeometry } from "@/utils/background";
import { onMounted, onUnmounted, watch } from "vue";
import { useLoaderStore } from "@/store/loader";

const loaderStore = useLoaderStore();

onMounted(() => {
  console.log("init");
  initDustGeometry();
});

onUnmounted(() => {
  destroyGeometry();
});

watch(
  () => loaderStore.isFirstTime,
  (val) => {
    console.log(val);
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped></style>
