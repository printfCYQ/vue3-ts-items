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
    <div class="m-t-10 p-x-20 p-y-5 bg-fuchsia rounded-10" @click="copyNum(1)">
      copy
    </div>
    <div class="m-t-10 p-x-20 p-y-5 bg-fuchsia rounded-10" @click="newNum(1)">
      new
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
    <div class="m-t-10 p-x-20 p-y-5 bg-fuchsia rounded-10" @click="copyNum(2)">
      copy
    </div>
    <div class="m-t-10 p-x-20 p-y-5 bg-fuchsia rounded-10" @click="newNum(2)">
      new
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
  const shuffledArr = arr.slice().sort(() => Math.random() - 0.5);
  const selectedNumbers = shuffledArr.slice(0, numToSelect);
  return selectedNumbers;
};

const newNum = (type: number) => {
  if (type === 1) {
    shuangSeQiu.value = randomNum(shuangSeQiuRed, 6)
      .sort((a: number, b: number) => a - b)
      .concat(
        randomNum(shuangSeQiuBlue, 1).sort((a: number, b: number) => a - b)
      );
  } else if (type === 2) {
    daLeTou.value = randomNum(daLeTouRed, 5)
      .sort((a: number, b: number) => a - b)
      .concat(randomNum(daLeTouBlue, 2).sort((a: number, b: number) => a - b));
  }
};

const copyNum = (type: number) => {
  if (type === 1) {
    navigator.clipboard.writeText(JSON.stringify(shuangSeQiu.value.join("-")));
  }
  if (type === 2) {
    navigator.clipboard.writeText(JSON.stringify(daLeTou.value.join("-")));
  }
};

onMounted(() => {
  newNum(1);
  newNum(2);
});
</script>
