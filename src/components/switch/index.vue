<template>
  <div class="view-switch">
    <div
      class="view-switch__options"
      @click="handleClick"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <div class="view-switch__option-background" :style="style"></div>
      <button class="view-switch__option" :class="onClassName">
        {{ onText }}
      </button>
      <button class="view-switch__option" :class="offClassName">
        {{ offText }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import emitter from "@/utils/mitt";
import { computed } from "vue";

interface SwitchProps {
  onValue?: any;
  offValue?: any;
  modelValue: any;
  onText?: string;
  offText?: string;
}

const props = withDefaults(defineProps<SwitchProps>(), {
  onValue: true,
  offValue: false,
  onText: "",
  offText: "",
  modelValue: true,
});

const currentValue = defineModel();

const onClassName = computed(() => {
  return currentValue.value === props.onValue
    ? "view-switch__option--isActive"
    : "";
});

const offClassName = computed(() => {
  return currentValue.value === props.offValue
    ? "view-switch__option--isActive"
    : "";
});

const style = computed(() => {
  return currentValue.value === props.onValue
    ? {
        width: "50%",
        height: "100%",
        transform: "translateX(0px)",
        transition: ".25s ease-in-out .25s",
      }
    : {
        width: "50%",
        height: "100%",
        transform: "translateX(100%)",
        transition: ".25s ease-in-out .25s",
      };
});

const handleClick = () => {
  if (currentValue.value === props.onValue) {
    currentValue.value = props.offValue;
  } else if (currentValue.value === props.offValue) {
    currentValue.value = props.onValue;
  }
};

const handleMouseEnter = () => {
  emitter.emit("cursorEnter");
};

const handleMouseLeave = () => {
  emitter.emit("cursorLeave");
};
</script>

<style lang="scss" scoped>
.view-switch {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  transition: opacity 0.4s cubic-bezier(0.33, 1, 0.68, 1);
  grid-column: span 2;

  .view-switch__options {
    position: relative;
    display: flex;
    border: 1px solid var(--platform-color-black-translucent);
    border-radius: 999px;

    .view-switch__option-background {
      position: absolute;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px 14px 6px;
      border-radius: 70px;
      background-color: var(--platform-color-black);
      z-index: -1;
    }
    .view-switch__option--isActive {
      color: var(--platform-color-white) !important;
    }

    .view-switch__option {
      padding: 5px 14px;
      color: var(--platform-color-black-translucent);
      font-size: 1rem;
      line-height: 100%;
      letter-spacing: 0.02em;
      text-transform: uppercase;
      cursor: pointer;
      outline: none;
      transition: color 0.25s ease-in-out 0.25s;
      background: none;
      border: none;
    }
  }
}
</style>
