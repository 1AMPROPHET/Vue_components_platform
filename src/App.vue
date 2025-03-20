<script setup lang="ts">
import zhCN from "@arco-design/web-vue/es/locale/lang/zh-CN";
</script>

<template>
  <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>

<style scoped lang="scss"></style>
