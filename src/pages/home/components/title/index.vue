<template>
  <div class="Menu" id="menu">
    <ul class="Menu-list" data-offset="10" id="menu-list">
      <li class="Menu-list-item" data-offset="20" onclick>
        Home
        <span class="Mask"><span>Home</span></span>
        <span class="Mask"><span>Home</span></span>
      </li>
      <li class="Menu-list-item" data-offset="16" onclick>
        About
        <span class="Mask"><span>About</span></span>
        <span class="Mask"><span>About</span></span>
      </li>
      <li class="Menu-list-item" data-offset="12" onclick>
        Work
        <span class="Mask"><span>Work</span></span>
        <span class="Mask"><span>Work</span></span>
      </li>
      <li class="Menu-list-item" data-offset="8" onclick>
        Contact
        <span class="Mask"><span>Contact</span></span>
        <span class="Mask"><span>Contact</span></span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
// === Variables =====
$perspective: 60rem;
$font-size: 4.25rem;
$split-position: 49%;
$split-thickness: 4px;
$split-color: #ff2c75;

// === Settings =====
%font-settings {
  font-family: "Gilroy ExtraBold", system-ui, sans-serif;
  font-style: normal;
  font-weight: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-font-kerning: normal;
  -webkit-text-size-adjust: 100%;
}

// === Codepen Setup =====
html,
body {
  width: 100vw;
  height: 100vh;
}
body {
  @extend %font-settings;
  background: linear-gradient(45deg, #02001f, #1f1b4e);
  transform-style: preserve-3d;
  transform: perspective($perspective);
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
}

// === Menu <ul> =====
.Menu-list {
  font-size: $font-size;
  line-height: 1.2;
  text-transform: uppercase;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  // transform: rotateX(-10deg) rotateY(20deg); // overwritten by JS
}

// === Menu item =====
.Menu-list-item {
  position: relative;
  color: transparent;
  cursor: pointer;

  // === Split Line =====
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: $split-position;
    left: -10%;
    right: -10%;
    height: $split-thickness;
    border-radius: $split-thickness;
    margin-top: -($split-thickness / 2);
    background: $split-color;
    transform: scale(0);
    transition: transform 0.8s cubic-bezier(0.16, 1.08, 0.38, 0.98);
    z-index: 1;
  }
}

// === Top/bottom mask =====
.Mask {
  display: block;
  position: absolute;
  overflow: hidden;
  color: $split-color;
  top: 0;
  height: $split-position;
  transition: all 0.8s cubic-bezier(0.16, 1.08, 0.38, 0.98);

  span {
    display: block;
  }
}

// === Bottom mask specific =====
.Mask + .Mask {
  top: $split-position - 0.1;
  height: 100 - $split-position + 0.1;

  span {
    transform: translateY(-$split-position);
  }
}

// === Where the fun stuff happens =====
.Menu-list-item:hover,
.Menu-list-item:active {
  .Mask {
    color: #fff;
    transform: skewX(12deg) translateX(5px);
  }
  .Mask + .Mask {
    transform: skewX(12deg) translateX(-5px);
  }
  &::before {
    transform: scale(1);
  }
}
</style>
