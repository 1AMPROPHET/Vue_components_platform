<script setup lang="ts">
withDefaults(defineProps<{ msg?: string }>(), {
  msg: "Vite + Vue",
});
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center">
    <div class="flex items-center justify-center">
      <a href="https://vite.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="../assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>
    <h1>{{ msg }}</h1>

    <div class="flex flex-col items-center justify-center">
      <p>
        Check out
        <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
          >create-vue</a
        >, the official Vue + Vite starter
      </p>
      <p>
        Learn more about IDE Support for Vue in the
        <a
          href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
          target="_blank"
          >Vue Docs Scaling up Guide</a
        >.
      </p>
      <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.logo {
  height: 12em;
  padding: 2.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.read-the-docs {
  color: #888;
}
</style>
