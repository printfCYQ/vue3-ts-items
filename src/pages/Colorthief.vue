<template>
  <div
    class="grid grid-cols-2 w-screen h-screen transition-all duration-100 ease-in-out"
    :style="{
      background: `linear-gradient(${colorObj.color1}, ${colorObj.color2}, ${colorObj.color3})`,
    }"
  >
    <div
      class="flex items-center justify-center"
      v-for="(url, i) in images"
      :key="i"
    >
      <img
        ref="imgRef"
        class="border-4 border-neutral border-solid"
        crossorigin="anonymous"
        @mouseenter="onMouseEnter($event.target, i)"
        @mouseleave="onMouseLeave"
        :src="url"
        :style="{
          opacity: hoverIndex === -1 ? 1 : i === hoverIndex ? 1 : 0.2,
        }"
        alt=""
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ColorThief from "colorthief";

const colorThief = new ColorThief();

const images: string[] = [];
const imgRef = ref();
const colorObj = reactive({
  color1: "#fff",
  color2: "#fff",
  color3: "#fff",
});

const hoverIndex = ref(-1);
for (let i = 1; i <= 4; i++) {
  images.push(`https://picsum.photos/400/400?r=${i}`);
}
onMounted(() => {
  console.log(imgRef.value);
  imgRef.value.forEach((img: any, index: number) => {
    img.addEventListener("error", function () {
      img.src = "/public/lol.png";
    });
  });
});

const onMouseEnter = async (img: any, i: number) => {
  console.log(img);
  hoverIndex.value = i;
  let colors = await colorThief.getPalette(img, 3);
  colors = colors.map((c: any) => `rgb(${c[0]}, ${c[1]}, ${c[2]})`);

  colorObj.color1 = colors[0];
  colorObj.color2 = colors[1];
  colorObj.color3 = colors[2];
};
const onMouseLeave = () => {
  hoverIndex.value = -1;
  colorObj.color1 = "#fff";
  colorObj.color2 = "#fff";
  colorObj.color3 = "#fff";
};
</script>

<style scoped>
</style>