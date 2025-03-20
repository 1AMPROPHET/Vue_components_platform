<script setup lang="ts">
import zhCN from "@arco-design/web-vue/es/locale/lang/zh-CN";
</script>

<template>
  <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>

<style scoped lang="scss">
html,
body {
  height: 100%;

  #app {
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
