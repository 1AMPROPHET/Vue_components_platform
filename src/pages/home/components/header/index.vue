<template>
  <a-layout-header class="navbar grid-view" :style="style">
    <div class="navbar__left">
      <div class="navbar__logo">
        <div class="logo__bg">
          <div class="logo__text">PROPHET</div>
        </div>
      </div>
    </div>
    <div class="navbar__wrapper navbar__buttons">
      <a
        v-for="item in links"
        :href="item.link"
        class="navbar__item link cursor-pointer"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        >{{ t(item.text) }}</a
      >
    </div>
    <custom-switch v-model="switchValue" on-text="grid" off-text="list" />
    <div class="navbar__wrapper navbar__theme">
      <theme-switch />
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { useLangStore } from "@/store/lang";
import emitter from "@/utils/mitt";
import { useI18n } from "vue-i18n";
import CustomSwitch from "@/components/switch/index.vue";
import ThemeSwitch from "@/components/themeSwitch/index.vue";
import { onMounted, onUnmounted, reactive, ref } from "vue";

const { t } = useI18n();

const langStore = useLangStore();

const switchValue = ref(true);

const links = reactive([
  {
    text: "home.homePage",
    link: "/home",
  },
  {
    text: "home.about",
    link: "/about",
  },
  {
    text: "home.test",
    link: "/test",
  },
]);

const style = ref({
  transform: "translateY(-100%)",
  transition: "",
});

const handleMouseEnter = () => {
  emitter.emit("cursorEnter");
};

const handleMouseLeave = () => {
  emitter.emit("cursorLeave");
};

onMounted(() => {
  emitter.on("contentScroll", () => {
    console.log("contentScroll");
  });
  emitter.on("loaderTransform", () => {
    style.value = {
      transform: "translateY(0%)",
      transition: ".5s ease-in-out 1s",
    };
  });
});

onUnmounted(() => {
  emitter.off("contentScroll");
  emitter.off("loaderTransform");
});
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding-top: 3.4rem;
  padding-bottom: 12rem;
  background: transparent;
  font-size: 1.34rem;
  line-height: 100%;
  text-align: right;
  letter-spacing: 0.02rem;
  text-transform: uppercase;
  z-index: 50;
  transition: background-color 0.5s ease-in-out;
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }

  &__wrapper {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }

  &__left {
    position: relative;
    grid-column: span 6;

    .navbar__logo {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);

      &:hover .logo__bg {
        width: 15rem;
        transition: width 0.8s cubic-bezier(0.075, 0.82, 0.165, 1);
      }

      .logo__bg {
        z-index: 1000;
        cursor: pointer;
        position: relative;
        width: 3rem;
        background: var(--platform-color-black);
        height: 3rem;
        --aspect-mul: 5.5;
        max-width: calc(3rem * var(--aspect-mul));
        transition: width 0.8s cubic-bezier(0.075, 0.82, 0.165, 1);
        border-radius: 5px;

        &:hover .logo__text {
          display: flex;
          width: 100%;
          justify-content: center;
          transition: width 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
          transition: transform cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s;
          transform: translateX(0);
        }

        .logo__text {
          align-items: center;
          justify-content: flex-start;
          font-size: 2.5rem;
          height: 100%;
          width: 1.5rem;
          line-height: 100%;
          color: var(--platform-color-white);
          display: flex;
          overflow: hidden;
          transform: translateX(1rem);
          transition: width 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
      }
    }
  }

  &__buttons {
    grid-column: span 3;
    gap: 2vw;

    .navbar__item {
      position: relative;
      font-size: 1.34rem;

      &:hover:after {
        transform: scaleX(1);
      }

      &:after {
        content: " ";
        position: absolute;
        left: 0;
        bottom: -0.8rem;
        width: 100%;
        height: 0.18rem;
        background-color: var(--platform-color-black);
        transform-origin: left center;
        transform: scaleX(0);
        transition: transform 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
      }
    }

    .link {
      color: var(--platform-color-black);
      transition: color 0.25s ease-in-out;
      cursor: pointer;
      text-transform: uppercase;
      text-decoration: none;
      line-height: 100%;

      &:hover {
        color: var(--platform-color-black-translucent);
      }
    }
  }

  .navbar__theme {
    grid-column: span 1;
    justify-content: flex-end;
  }
}
</style>
