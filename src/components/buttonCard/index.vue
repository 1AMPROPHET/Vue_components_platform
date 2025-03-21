<template>
  <button
    class="card card--abs flex"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="card__img">
      <img :src="src" />
    </div>
    <div class="card__text">
      <div class="card__top">
        <div>
          <div class="exp-info exp-info__id">{{ id }}</div>
          <div class="exp-info exp-info__date">{{ date }}</div>
        </div>
        <a :href="link" class="card__ext-link" style="pointer-events: all">
          <div class="card-button"></div>
        </a>
      </div>
      <div class="card__bottom">
        <div class="card__title" style="line-height: 120%">
          <span class="card__title--top" style="transform: translateY(0%)">{{
            title
          }}</span>
          <span class="card__title--bottom" style="transform: translateY(0%)">{{
            title
          }}</span>
        </div>
        <ul class="tags">
          <li class="tags__item" v-for="tag in tags">{{ tag }}</li>
        </ul>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import emitter from "@/utils/mitt";

defineProps<{
  id?: string;
  date?: string;
  src?: string;
  link?: string;
  title?: string;
  tags?: string[];
}>();

const handleMouseEnter = () => {
  emitter.emit("cursorEnter");
};

const handleMouseLeave = () => {
  emitter.emit("cursorLeave");
};
</script>

<style lang="scss" scoped>
.card--abs {
  position: absolute;
}
.card {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  overflow: hidden;
  pointer-events: all;
  cursor: pointer;
  color: #000;
  transition: color 0.25s ease-in-out;
  background-color: #000;
  width: 70vw;
  height: calc(70vw * 7 / 16);

  .card__img {
    &:hover {
      transform: scale(1.075);
      // transition: calc(1.075) 1s ease;
    }

    transform: scale(1);
    transition: all 0.3s ease;
    position: absolute;
    width: 100%;
    height: 100%;

    img {
      transition: all 0.3s ease;
      filter: saturate(0);
      transform: filter 0.15s;
      object-fit: cover;
      width: 110%;
      height: 110%;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      position: absolute;

      &:hover {
        filter: saturate(1);
      }
    }
  }

  .card__text {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 2rem;
    pointer-events: none;

    .card__top {
      display: flex;
      justify-content: space-between;

      &.card--dark {
        color: #fff;
      }

      .exp-info {
        line-height: 1;
        letter-spacing: 0.05em;
        font-weight: 500;
        display: flex;
        text-transform: uppercase;
        font-size: 1.17rem;
      }

      .card-button {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 999px;
        background-color: #fff;
        color: #000;
        transition: color 0.5s ease-in-out, background-color 0.15s ease-in-out;
      }
    }

    .card__bottom {
      display: flex;
      flex-flow: column nowrap;
      gap: 1rem;

      &.card--dark {
        color: #fff;
      }

      .card__title {
        position: relative;
        display: flex;
        flex-flow: column;
        align-items: flex-start;
        font-size: 2.5rem;
        overflow: hidden;
        color: #fff;

        &--bottom {
          position: absolute;
          top: 100%;
        }
      }

      .tags {
        display: flex;
        gap: 0.25rem;
        line-height: 1;
        letter-spacing: 0.05rem;
        font-weight: 500;
        text-transform: uppercase;
        font-size: 1.17rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        .tags__item {
          list-style: none;
          display: inline;
          color: #fff;
        }
      }
    }
  }
}
button {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  outline: none;
  font-size: 1rem;
  cursor: pointer;
}
</style>
