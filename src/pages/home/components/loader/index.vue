<template>
  <div class="loader" :style="loaderStyle">
    <div class="loader__content" :style="contentStyle">
      <div class="grid-view grid-view--full">
        <div class="loader__item loader__item--left">
          <div class="loader__animNum" :style="numStyle">
            <span>0</span>
            <span>1</span>
          </div>
        </div>
        <div class="loader__item loader__item--center"></div>
        <div class="loader__item loader__item--right">
          <div class="loader__animNum" :style="numStyle">
            <span>{{ num10 }}</span>
            <span>0</span>
          </div>
          <div class="loader__animNum" :style="numStyle">
            <span>{{ num1 }}</span>
            <span>0</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

const num1 = ref(0);
const num10 = ref(0);

const loaderStyle = computed(() => {
  return num1.value === 9 && num10.value === 9
    ? {
        clipPath: "polygon(0px 100%, 100% 100%, 100% 100%, 0% 100%)",
        transition: ".5s cubic-bezier(.36,.33,1,.58) 1s",
      }
    : {
        clipPath: "polygon(0px 0%, 100% 0%, 100% 100%, 0% 100%)",
        transition: ".5s cubic-bezier(.36,.33,1,.58) 1s",
      };
});

const contentStyle = computed(() => {
  return num1.value === 9 && num10.value === 9
    ? {
        transform: "translateY(50%)",
        opacity: "0",
        transition: "1s cubic-bezier(.68,0,.38,1) 1.5s",
      }
    : {
        transform: "translateY(0)",
        opacity: "1",
      };
});

const numStyle = computed(() => {
  return num1.value === 9 && num10.value === 9
    ? {
        transform: "translateY(-50%)",
        transition: "transform cubic-bezier(.68,0,.38,1) 1s",
      }
    : {
        transform: "translateY(0)",
      };
});

const startTimer = () => {
  const timer = setInterval(() => {
    num1.value++;
    if (num1.value > 9) {
      num1.value = 0;
      num10.value++;

      if (num10.value > 9) {
        clearInterval(timer);
        return;
      }
    }

    if (num10.value === 9 && num1.value === 9) {
      clearInterval(timer);
    }
  }, 10);
};

onMounted(() => {
  startTimer();
});
</script>

<style lang="scss" scoped>
.loader {
  z-index: 99999;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000;

  span {
    font-weight: 900;
    vertical-align: middle;
    display: inline-block;
    line-height: 100%;
    font-size: 15rem;
  }

  .loader__content {
    width: 100%;
    height: 100%;

    .grid-view--full {
      height: 100%;

      .loader__item {
        height: 1em;
        position: relative;
        display: flex;
        align-items: flex-start;
        align-self: center;
        overflow: hidden;
        font-size: 15rem;

        & > div {
          display: flex;
          flex-direction: column;
          text-align: center;
        }
      }

      .loader__item--left {
        grid-column: 1 / span 4;
      }

      .loader__item--center {
        grid-column: 5 / span 4;
        justify-self: center;
      }

      .loader__item--right {
        grid-column: 9 / span 4;
        justify-self: right;
      }
    }
  }
}
</style>
