<template>
  <a-layout-content
    class="app-wrapper"
    style="margin-top: 17.5rem; opacity: 1"
    ref="contentRef"
    @scroll="handleScroll"
  >
    <div class="page-wrapper">
      <div class="grid-view header" :style="headerStyle">
        <div class="header__title">
          <h1>
            <div
              style="
                padding-bottom: 1.5rem;
                line-height: 0.7;
                white-space: pre;
                position: relative;
                overflow: visible;
              "
            >
              <div>{{ t("title.fragment1") }}</div>
            </div>
            <div
              style="
                padding-bottom: 1.5rem;
                line-height: 0.7;
                white-space: pre;
                position: relative;
                overflow: visible;
              "
            >
              <div>{{ t("title.fragment2") }}</div>
            </div>
            <div
              style="
                padding-bottom: 1.5rem;
                line-height: 0.7;
                white-space: pre;
                position: relative;
                overflow: visible;
              "
            >
              <div>{{ t("title.fragment3") }}</div>
            </div>
          </h1>
        </div>
        <div class="header__description">
          <div>
            <div layers="3" style="position: relative; overflow: visible">
              <div style="opacity: 1; transform: none">
                {{ t("subtitle.fragment1") }}
              </div>
            </div>
            <div layers="3" style="position: relative; overflow: visible">
              <div style="opacity: 1; transform: none">
                {{ t("subtitle.fragment2") }}
              </div>
            </div>
            <div layers="3" style="position: relative; overflow: visible">
              <div style="opacity: 1; transform: none">
                {{ t("subtitle.fragment3") }}
              </div>
            </div>
          </div>
        </div>
      </div>
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
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const contentRef = ref<any>(null);

const headerStyle = ref({
  opacity: 1,
  transform: "scale(1)",
});

const handler = throttle((e: any) => {
  if (!contentRef.value) return;
  const scrollTop = contentRef.value.scrollTop;

  if (scrollTop >= 200) {
    emitter.emit("contentScroll");
    contentRef.value.removeEventListener("scroll", handler);
  }
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
    .header {
      --padding-top: 9.5rem;
      padding-top: var(--padding-top);
      transition: color 0.3s ease-in-out;

      & > * {
        transition: opacity 0.3s ease-in-out 0.4s;
      }

      .header__title {
        transition: transform 1s cubic-bezier(0.785, 0.135, 0.15, 0.86);
        transform: translate(0);
        grid-column: span 6;
        display: flex;
        flex-flow: column;
        gap: max(30px, 4vh);
        text-transform: uppercase;

        h1 {
          transform: scale(1);
          transform-origin: left top;
          transition: transform 1s cubic-bezier(0.785, 0.135, 0.15, 0.86);
        }
      }

      .header__description {
        grid-column: span 4;
        display: flex;
        align-items: flex-end;
        font-size: 1.45rem;
      }
    }
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
