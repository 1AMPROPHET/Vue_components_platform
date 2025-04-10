<template>
  <div class="contact" :style="contactStyle" @click="handleCancel"></div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = withDefaults(
  defineProps<{
    isShowFooter: boolean;
  }>(),
  {
    isShowFooter: false,
  }
);

const emit = defineEmits<{
  (e: "hideFooter", value: boolean): void;
}>();

const contactStyle = ref({
  transform: "translateY(200px)",
});

const handleCancel = () => {
  emit("hideFooter", false);
};

watch(
  () => props.isShowFooter,
  (val) => {
    if (val) {
      contactStyle.value = {
        transform: "translateY(0px)",
      };
    } else {
      contactStyle.value = {
        transform: "translateY(200px)",
      };
    }
  }
);
</script>

<style lang="scss" scoped>
.contact {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  transition: 0.5s ease-in-out;
  height: 200px;
  background: var(--platform-color-black);
}
</style>
