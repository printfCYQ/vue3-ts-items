<template>
  <div class="w-screen h-screen p-4 bg-[#000] box-border">
    <div
      ref="canvasContainer"
      class="canvas-container w-full h-full bg-[#fff]"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import * as THREE from "three";
import { onMounted, ref } from "vue";

const canvasContainer = ref<HTMLDivElement | null>(null);

const initThree = () => {
  // 创建场景
  const blackScene = new THREE.Scene();
  const whiteScene = new THREE.Scene();

  const clientWidth = canvasContainer.value!.clientWidth;
  const clientHeight = canvasContainer.value!.clientHeight;

  // 创建相机
  const camera = new THREE.PerspectiveCamera(
    75,
    clientWidth / clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 5);

  // 创建渲染器
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(clientWidth, clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  if (canvasContainer.value) {
    canvasContainer.value.appendChild(renderer.domElement);
  }

  // 添加基本网格到场景中
  const geometry = new THREE.PlaneGeometry(2, 2);
  const blackMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

  const whitePlane = new THREE.Mesh(geometry, whiteMaterial);

  whiteScene.add(whitePlane);

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.clear();

    const width = clientWidth;
    const height = clientHeight;
    const padding = 10;

    // 渲染白色场景，有10像素间距
    renderer.setScissor(
      padding,
      padding,
      width - 2 * padding,
      height - 2 * padding
    );
    renderer.setViewport(
      padding,
      padding,
      width - 2 * padding,
      height - 2 * padding
    );
    renderer.render(whiteScene, camera);

    renderer.setScissorTest(false);
  };

  animate();

  // 处理窗口大小变化
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
};

onMounted(() => {
  console.log(new Date());
  initThree();
});
</script>

<style scoped>
.canvas-container {
  background-color: #fff;
}
</style>
