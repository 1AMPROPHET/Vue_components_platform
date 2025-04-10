<template>
  <a-layout class="w-full h-full">
    <Header @show-footer="handleFooter" />
    <Content />
    <Footer :is-show-footer="flag" @hide-footer="handleFooter" />
    <loader />
  </a-layout>
</template>

<script setup lang="ts">
import Header from "./components/header/index.vue";
import Content from "./components/content/index.vue";
import Footer from "./components/footer/index.vue";
import Loader from "./components/loader/index.vue";
import { destroyGeometry, initDustGeometry } from "@/utils/background";
import { onMounted, onUnmounted, ref } from "vue";

const flag = ref(false);

const handleFooter = (val: boolean) => {
  flag.value = val;
};

onMounted(() => {
  console.log("init");
  initDustGeometry();
});

onUnmounted(() => {
  destroyGeometry();
});
</script>

<style lang="scss" scoped></style>
