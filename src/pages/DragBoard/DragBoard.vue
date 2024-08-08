<template>
  <div class="overflow-scroll w-screen h-screen">
    <button @click="toggle">toggle editable : {{ editable }}</button>
    <grid-layout v-model:layout="layout" :col-num="3" :row-height="1">
      <template #default="{ gridItemProps }">
        <grid-item
          v-for="item in layout"
          :key="item.i"
          v-bind="gridItemProps"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :isDraggable="editable"
          :isResizable="editable"
          @resized="resized"
          @move="move"
          @moved="moved"
        >
          <component :is="comps[item.i]" class="w-full h-full" />
        </grid-item>
      </template>
    </grid-layout>
  </div>
</template>

<script setup lang="ts">
import SimpleBarChart from "./components/SimpleBarChart.vue";
import SimpleRingChart from "./components/SimpleRingChart.vue";
import HeatMapChart from "./components/HeatMapChart.vue";

type Components = {
  [key: number]: typeof SimpleBarChart;
};
const comps = shallowRef<Components>({
  0: SimpleBarChart,
  1: SimpleRingChart,
  2: HeatMapChart,
});

// x，y: 网格左上角坐标
// w，h: 网格宽高
// i: 组件id 
const layout = [
  { x: 0, y: 0, w: 1, h: 40, i: 0 },
  { x: 1, y: 0, w: 1, h: 40, i: 1 },
  { x: 2, y: 0, w: 1, h: 40, i: 2 },
];

const editable = ref(false);
const toggle = () => {
  editable.value = !editable.value;
};

const resized = (e) => {
  console.log("resized", e);
};

const move = (e) => {
  console.log("move", e);
};

const moved = (e) => {
  console.log("moved", e);
};
</script>