<template>
  <div class="section">
    <div class="project-list">
      <a href="" class="project-item project-type-website" v-for="n in 10">
        <div class="project-item-main">
          <div class="project-item-image">{{ n }}</div>
        </div>
        <div class="project-item-footer">
          <div class="project-item-line-1"></div>
          <div class="project-item-line-2"></div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.section {
  --grid-gap: 2vw;
  --base-padding-y: clamp(30px, 4vw, 50px);
  --base-padding-x: max(5vw, 40px);
  --vh: 9.37px;
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  column-gap: var(--grid-gap);
  padding: var(--base-padding-y) var(--base-padding-x);
  overflow: auto;
  background: #000;

  .project-list {
    position: relative;
    grid-column: 1 / span 12;
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    column-gap: var(--grid-gap);
    margin-top: calc(var(--vh, vh) * 8);

    .project-item {
      position: relative;
      float: left;
      grid-column: span 6 / span 6;
      cursor: pointer;
      pointer-events: auto;

      &:nth-child(n + 3) {
        margin-top: 3em;
      }

      .project-item-main {
        position: relative;
        padding-top: 65%;
        background: var(--platform-color-black);

        .project-item-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 15px;
          font-size: 3vw;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--platform-color-white);
        }
      }

      .project-item-footer {
        position: relative;
        width: 100%;

        .project-item-line-1 {
          font-size: 0.9vw;
          margin: 1.5em 0 1em;
          text-transform: uppercase;
          will-change: transform;
        }

        .project-item-line-2 {
          position: relative;
          overflow: hidden;
          font-size: 3vw;
          height: 1em;
          left: -0.06em;
          will-change: transform;
        }
      }
    }
  }
}
</style>
