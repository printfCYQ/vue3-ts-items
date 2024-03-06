<template>
  <div class="content">
    <div class="img-container">
      <div class="img-item" ref="items" v-for="item in 9" :key="item"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const items = ref<Array<HTMLDivElement>>([]);

onMounted(() => {
  for (let i = 0; i < items.value.length; i++) {
    const r = Math.floor(i / 3);
    const c = i % 3;
    const bgX = -c * 100 + "%";
    const bgY = -r * 100 + "%";
    const disX = (c - 1) * 20 + "px";
    const disY = (r - 1) * 20 + "px";
    const item = items.value[i];
    item.style.setProperty("--bgX", bgX);
    item.style.setProperty("--bgY", bgY);
    item.style.setProperty("--disX", disX);
    item.style.setProperty("--disY", disY);
  }
});
</script>

<style scoped lang="scss">
.content {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.img-container {
  width: 300px;
  height: 300px;
  display: flex;
  flex-wrap: wrap;
  font-size: 0;
  .img-item {
    width: 100px;
    height: 100px;
    box-shadow: inset 0 0 0 1px #fff;
    transition: 0.5s;
    background-size: 300px 300px;
    background-position: var(--bgX, 0) var(--bgY, 0);
    background-image: url(/public/lol.png);
    transform: translate(var(--disX, 0), var(--disY, 0));
    position: relative;
    font-size: 0;
  }
  &:hover .img-item {
    transform: translate(0, 0);
    box-shadow: inset 0 0 0 0 #fff;
  }
}
</style>