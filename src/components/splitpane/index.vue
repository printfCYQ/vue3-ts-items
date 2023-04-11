<template>
  <div
    :style="'cursor:' + cursor + '; user-select:' + userSelect"
    class="vue-splitter-container clearfix"
    @mouseup="onMouseUp"
    @mousemove="onMouseMove"
  >
    <div
      class="arrow-circle-right"
      v-show="!appStore.sideMenuShow"
      @click="appStore.toggleSideMenuShow"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10s10-4.48 10-10zm-10 1H8v-2h4V8l4 4l-4 4v-3z"
        />
      </svg>
    </div>
    <pane
      class="splitter-pane splitter-paneL"
      v-show="appStore.sideMenuShow"
      :split="split"
      :style="{ [type]: percent + '%' }"
    >
      <slot name="paneL"></slot>
      <div class="arrow-circle-left" @click="appStore.toggleSideMenuShow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2S2 6.48 2 12zm10-1h4v2h-4v3l-4-4l4-4v3z"
          />
        </svg>
      </div>
    </pane>

    <resizer
      :className="className"
      :style="{ [resizeType]: percent + '%' }"
      :split="split"
      :active="active"
      @mousedown="onMouseDown"
      @click="onClick"
    ></resizer>

    <pane
      class="splitter-pane splitter-paneR"
      :split="split"
      :style="{ [type]: 100 - percent + '%' }"
    >
      <slot name="paneR"></slot>
    </pane>
    <div class="vue-splitter-container-mask" v-if="active"></div>
  </div>
</template>
<script lang="ts">
export default {
  name: "Splitpane",
};
</script>
<script setup lang="ts">
import Resizer from "./resizer.vue";
import Pane from "./pane.vue";
import { computed, ref, watch } from "vue";
import { useAppStore } from "@/store";
const appStore = useAppStore();

const props = defineProps({
  minPercent: {
    type: Number,
    default: 10,
  },
  maxPercent: {
    type: Number,
    default: 10,
  },
  defaultPercent: {
    type: Number,
    default: 50,
  },
  split: {
    validator(value: string) {
      return ["vertical", "horizontal"].indexOf(value) >= 0;
    },
    required: true,
  },
  className: String,
});

const active = ref(false);
const hasMoved = ref(false);
const percent = ref<number>(props.defaultPercent);
const type = ref(props.split === "vertical" ? "width" : "height");
const resizeType = ref(props.split === "vertical" ? "left" : "top");

const userSelect = computed(() => {
  return active.value ? "none" : "";
});
const cursor = computed(() => {
  return active.value
    ? props.split === "vertical"
      ? "col-resize"
      : "row-resize"
    : "";
});

watch(
  () => props.defaultPercent,
  (newV, oldV) => {
    percent.value = newV;
  }
);
const emits = defineEmits(["resize"]);
const onClick = () => {
  if (!hasMoved.value) {
    percent.value = 50;
    emits("resize", percent.value);
  }
};
const onMouseDown = () => {
  active.value = true;
  hasMoved.value = false;
};
const onMouseUp = () => {
  active.value = false;
};
const onMouseMove = (e: MouseEvent) => {
  if (e.buttons === 0 || e.which === 0) {
    active.value = false;
  }

  if (active.value) {
    let offset = 0;
    let target: any = e.currentTarget;
    if (props.split === "vertical") {
      while (target) {
        offset += target.offsetLeft;
        target = target.offsetParent;
      }
    } else {
      while (target) {
        offset += target.offsetTop;
        target = target.offsetParent;
      }
    }

    const currentPage = props.split === "vertical" ? e.pageX : e.pageY;
    const targetOffset =
      props.split === "vertical"
        ? (e.currentTarget as any).offsetWidth
        : (e.currentTarget as any).offsetHeight;
    const newPercent =
      Math.floor(((currentPage - offset) / targetOffset) * 10000) / 100;

    if (newPercent > props.minPercent && newPercent < props.maxPercent) {
      appStore.setSideMenuWidth(newPercent);
    }

    emits("resize", percent.value);
    hasMoved.value = true;
  }
};
</script>

<style scoped lang="scss">
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}

.vue-splitter-container {
  height: 100%;
  position: relative;
  .arrow-circle-right {
    position: absolute;
    top: 10%;
    cursor: pointer;
    z-index: 20;
    color: hsla(0, 0%, 100%, 0.55);
    background: #474747;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0 50% 50% 0;
    &:hover {
      color: #8b7af0;
    }
  }
}

.splitter-paneL {
  position: relative;

  .arrow-circle-left {
    position: absolute;
    top: 10%;
    right: 0;
    transform: translateX(50%);
    z-index: 99;
    cursor: pointer;
    color: hsla(0, 0%, 100%, 0.55);
    background: #474747;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    &:hover {
      color: #8b7af0;
    }
  }
}

.vue-splitter-container-mask {
  z-index: 9999;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
