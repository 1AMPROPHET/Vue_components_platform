<template>
  <div class="three w-0 h-0" id="three"></div>
</template>

<script setup lang="ts">
import * as THREE from "three";
import { onMounted } from "vue";

function GetFlatGeometry() {
  const AMOUNTX = 70;
  const AMOUNTY = 70;
  const SEPARATION = 100;
  const numParticles = AMOUNTX * AMOUNTY;
  const vertices = new Float32Array(numParticles * 3); //存储每个粒子的三维坐标 每三个下标一组[x,y,z]
  const scales = new Float32Array(numParticles); //存储每个粒子的缩放值

  const TextureLoader = new THREE.TextureLoader();
  const material = new THREE.PointsMaterial({
    size: 2,
    sizeAttenuation: false,
    transparent: true,
    opacity: 1,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  let i = 0;
  for (let ix = 0; ix < AMOUNTX; ix++) {
    for (let iy = 0; iy < AMOUNTY; iy++) {
      vertices[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2; // x
      vertices[i + 1] = 0; // y，初始值为 0，后续动态更新
      vertices[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2; // z
      i += 3;
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

  const points = new THREE.Points(geometry, material);
  return points;
}

const initDustGeometry = () => {
  const WIDTH = window.innerWidth;
  const HEIGHT = window.innerHeight;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(100, WIDTH / HEIGHT, 1, 1000);
  camera.position.z = 3;

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(WIDTH, HEIGHT);
  document.body.appendChild(renderer.domElement);

  const particleCount = 5000;
  const particlesGeometry = new THREE.BufferGeometry();
  const position = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i++) {
    position[i] = (Math.random() - 0.5) * 20;
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(position, 3)
  );
  const particleMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.005,
    transparent: true,
    opacity: 0.9,
  });

  const particleSystem = new THREE.Points(particlesGeometry, particleMaterial);
  scene.add(particleSystem);

  function animateParticles() {
    const positions = particlesGeometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += 0.02; // 逐渐下降
      if (positions[i] > 10) positions[i] = -10; // 重置位置
    }
    particlesGeometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
    requestAnimationFrame(animateParticles);
  }

  animateParticles();

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
};

function initThreeOcean() {
  // 创建场景
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.fog = new THREE.FogExp2(328972, 5e-4);

  // 创建相机
  const camera = new THREE.PerspectiveCamera(
    80,
    window.innerWidth / window.innerHeight,
    1,
    5e4
  );
  camera.position.set(0, 0, 1e3);
  camera.lookAt(new THREE.Vector3(0, 0, 0)); // 固定相机朝向

  // const axesHelper = new THREE.AxesHelper(500)
  // scene.add(axesHelper)
  // 创建渲染器
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  renderer.setClearColor(scene.fog.color);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.getElementById("three")!.appendChild(renderer.domElement);

  // 添加粒子系统
  const particles = GetFlatGeometry();
  scene.add(particles);

  // 添加环境光
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  // 添加点光源
  const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(500, 500, 500);
  scene.add(pointLight);

  // 动画循环
  let time = 0;
  const animate = () => {
    requestAnimationFrame(animate);

    // 更新波浪效果
    const positions = particles.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const z = positions[i + 2];
      positions[i + 1] =
        Math.sin((x + time) * 0.5) * 50 + Math.cos((z + time) * 0.5) * 50 - 350;
    }
    particles.geometry.attributes.position.needsUpdate = true;

    // 渲染场景
    renderer.render(scene, camera);
    time += 0.03; // 控制波浪的动态变化速度
  };
  animate();

  // 响应窗口大小调整
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
}

onMounted(() => {
  // initThreeOcean();
  initDustGeometry();
});
</script>

<style lang="scss" scoped>
.three {
  pointer-events: none;
}
</style>
