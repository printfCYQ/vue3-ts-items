<template>
  <div class="flex flex-col items-center justify-center w-screen h-screen">
    <div class="flex items-center">
      <div class="text-2xl m-r-4">双色球:</div>
      <div
        v-for="(item, index) in shuangSeQiu"
        :key="item"
        class="text-xl p-2 w-5 h-5 rounded-full flex justify-center items-center m-l-1"
        :class="index === 6 ? 'bg-blue-500' : 'bg-red-500'"
      >
        {{ item }}
      </div>
    </div>
    <div class="m-t-10 p-x-20 p-y-5 bg-yellow rounded-10 select-none cursor-pointer" @click="copyNum(1)">
      copy
    </div>
    <div class="flex m-t-10">
      <div class="text-2xl m-r-4">大乐透:</div>
      <div
        v-for="(item, index) in daLeTou"
        :key="item"
        class="text-xl p-2 w-5 h-5 rounded-full flex justify-center items-center m-l-1"
        :class="index === 5 || index === 6 ? 'bg-blue-500' : 'bg-red-500'"
      >
        {{ item }}
      </div>
    </div>
    <div class="m-t-10 p-x-20 p-y-5 bg-lime rounded-10 select-none cursor-pointer" @click="copyNum(2)">
      copy
    </div>
    <div class="m-t-10 p-x-20 p-y-5 bg-fuchsia rounded-10 select-none cursor-pointer" @click="reload">
      reload
    </div>
  </div>
</template>

<script setup lang="ts">
const shuangSeQiu = ref<Array<number>>([]);
const daLeTou = ref<Array<number>>([]);

const shuangSeQiuRed: number[] = Array.from({ length: 33 }, (_, i) => i + 1);
const shuangSeQiuBlue: number[] = Array.from({ length: 16 }, (_, i) => i + 1);

const daLeTouRed: number[] = Array.from({ length: 35 }, (_, i) => i + 1);
const daLeTouBlue: number[] = Array.from({ length: 12 }, (_, i) => i + 1);

const randomNum = (arr: number[], numToSelect: number) => {
  const shuffledArr = [...arr];
  for (let i = shuffledArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
  }
  return shuffledArr.slice(0, numToSelect);
};

const createNum = () => {
  shuangSeQiu.value = [
    ...randomNum(shuangSeQiuRed, 6).sort((a, b) => a - b),
    ...randomNum(shuangSeQiuBlue, 1).sort((a, b) => a - b),
  ];
  daLeTou.value = [
    ...randomNum(daLeTouRed, 5).sort((a, b) => a - b),
    ...randomNum(daLeTouBlue, 2).sort((a, b) => a - b),
  ];
};

const copyNum = (type: number) => {
  if (type === 1) {
    navigator.clipboard.writeText(shuangSeQiu.value.join("-"));
  }
  if (type === 2) {
    navigator.clipboard.writeText(daLeTou.value.join("-"));
  }
};

const reload = () => {
  window.location.reload();
};

onMounted(() => {
  nextTick(() => {
    createNum();
  });
});
</script>
