<template>
  <a-layout-content
    class="app-wrapper"
    style="margin-top: 17.5rem; opacity: 1"
    ref="contentRef"
    @scroll="handleScroll"
  >
    <div class="page-wrapper">
      <div
        class="cards-wrapper grid-view grid-view--24 grid-view--no-padding"
      ></div>
    </div>
  </a-layout-content>
</template>

<script setup lang="ts">
import { throttle } from "@/utils";
import emitter from "@/utils/mitt";
import { onMounted, onUnmounted, ref } from "vue";

const contentRef = ref<any>(null);

const handler = throttle((e: any) => {
  // if (!contentRef.value) return;
  // const scrollTop = contentRef.value.scrollTop;

  // if (scrollTop >= 200) {
  //   emitter.emit("contentScroll");
  //   contentRef.value.removeEventListener("scroll", handler);
  // }
  console.log(e);
});

const handleScroll = (e: any) => {
  console.log(e);
};

onMounted(() => {
  if (contentRef.value) {
    console.log(contentRef.value);
    // contentRef.value.addEventListener("scroll", handler);
  }
});

onUnmounted(() => {
  if (contentRef.value) {
    contentRef.value.removeEventListener("scroll");
  }
});
</script>

<style lang="scss" scoped>
.app-wrapper {
  width: 100vw;
  min-height: 100vh;
  margin: 12rem 0 0;

  .page-wrapper {
    .cards-wrapper {
      max-width: 1800px;
      margin: 0 5rem;
    }
  }
}

@media only screen and (min-width: 1450px) {
  .cards-wrapper {
    margin: 0 auto;
  }
}
</style>
