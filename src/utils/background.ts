import * as THREE from "three";

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const COUNT = 5000;

const AMOUNTX = 70;
const AMOUNTY = 70;
const SEPARATION = 100;
let scene: any = null;
let camera: any = null;
let renderer: any = null;
let particlesGeometry: any = null;
let particleMaterial: any = null;
let particleSystem: any = null;
let animateNum: any = null;

const dustAnimateParticles = () => {
  const positions = particlesGeometry.attributes.position.array;
  for (let i = 0; i < positions.length; i += 3) {
    positions[i] += 0.02;
    if (positions[i] > 10) positions[i] = -10;
  }
  particlesGeometry.attributes.position.needsUpdate = true;

  renderer.render(scene, camera);
  animateNum = requestAnimationFrame(dustAnimateParticles);
};

export const initDustGeometry = () => {
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(328972, 5e-4);
  camera = new THREE.PerspectiveCamera(100, WIDTH / HEIGHT, 1, 1000);
  camera.position.z = 3;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(WIDTH, HEIGHT);
  renderer.setClearAlpha(0);

  particlesGeometry = new THREE.BufferGeometry();
  const position = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT * 3; i++) {
    position[i] = (Math.random() - 0.5) * 20;
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(position, 3)
  );

  particleMaterial = new THREE.PointsMaterial({
    color: 0x888888,
    size: 0.005,
    transparent: false,
  });

  particleSystem = new THREE.Points(particlesGeometry, particleMaterial);
  scene.add(particleSystem);

  renderer.domElement.id = "canvas";
  document.body.appendChild(renderer.domElement);

  dustAnimateParticles();

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
};

export const initOceanGeometry = () => {
  const numParticles = AMOUNTX * AMOUNTY;
  const vertices = new Float32Array(numParticles * 3);
  const scales = new Float32Array(numParticles);

  particleMaterial = new THREE.PointsMaterial({
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
      vertices[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
      vertices[i + 1] = 0;
      vertices[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
      i += 3;
    }
  }

  particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  particlesGeometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

  particleSystem = new THREE.Points(particlesGeometry, particleMaterial);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.fog = new THREE.FogExp2(328972, 5e-4);

  camera = new THREE.PerspectiveCamera(80, WIDTH / HEIGHT, 1, 5e4);
  camera.position.set(0, 0, 1e3);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(WIDTH, HEIGHT);
  renderer.autoClear = false;
  renderer.setClearColor(scene.fog.color);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.id = "canvas";
  document.body.appendChild(renderer.domElement);

  scene.add(particleSystem);

  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  // 添加点光源
  const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(500, 500, 500);
  scene.add(pointLight);

  let time = 0;
  const animate = () => {
    animateNum = requestAnimationFrame(animate);

    // 更新波浪效果
    const positions = particleSystem.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const z = positions[i + 2];
      positions[i + 1] =
        Math.sin((x + time) * 0.5) * 50 + Math.cos((z + time) * 0.5) * 50 - 350;
    }
    particleSystem.geometry.attributes.position.needsUpdate = true;

    // 渲染场景
    renderer.render(scene, camera);
    time += 0.03; // 控制波浪的动态变化速度
  };
  animate();

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
};

export const destroyGeometry = () => {
  document.getElementById("canvas") &&
    document.body.removeChild(document.getElementById("canvas")!);
  scene = null;
  camera = null;
  renderer = null;
  particlesGeometry = null;
  particleMaterial = null;
  particleSystem = null;
  cancelAnimationFrame(animateNum);
  animateNum = null;
  window.removeEventListener("resize", () => {});
};
