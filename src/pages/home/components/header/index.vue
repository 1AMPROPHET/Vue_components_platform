<template>
  <a-layout-header class="navbar grid-view">
    <div class="navbar__left">
      <div class="navbar__logo"></div>
    </div>
    <div class="navbar__wrapper navbar__buttons">
      <a
        href="/about"
        class="navbar__item link cursor-pointer"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        >{{ t("home.about") }}</a
      >
    </div>
    <div class="view-switch navbar__wrapper navbar__views"></div>
    <div class="navbar__wrapper navbar__theme"></div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { useLangStore } from "@/store/lang";
import emitter from "@/utils/mitt";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const langStore = useLangStore();

const handleMouseEnter = () => {
  emitter.emit("cursorEnter");
};

const handleMouseLeave = () => {
  emitter.emit("cursorLeave");
};
</script>

<style lang="scss" scoped>
.grid-view {
  display: grid;
  padding: 0 5rem;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 1rem;
}
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
        background-color: #fff;
        transform-origin: left center;
        transform: scaleX(0);
        transition: transform 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
      }
    }

    .link {
      color: #fff;
      transition: color 0.25s ease-in-out;
      cursor: pointer;
      text-transform: uppercase;
      text-decoration: none;
      line-height: 100%;

      &:hover {
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
}
</style>
