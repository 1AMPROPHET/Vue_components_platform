<template>
  <a-layout class="w-full h-full">
    <Header />
    <Content />
    <Footer />
  </a-layout>
</template>

<script setup lang="ts">
import Header from "./components/header/index.vue";
import Content from "./components/content/index.vue";
import Footer from "./components/footer/index.vue";
</script>

<style lang="scss" scoped></style>
