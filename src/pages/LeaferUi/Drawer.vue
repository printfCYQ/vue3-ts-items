<template>
  <div
    class="drawer"
    :class="[placement, { visible: innerVisible }]"
    :style="{
      width: `${width}px`,
    }"
  >
    <div class="toggle" @click="toggleVisible"></div>
    <slot v-if="!innerVisible"></slot>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    visible: boolean;
    placement: string;
    width: number;
  }>(),
  {
    visible: false,
    placement: "right",
    width: 300,
  }
);
const innerVisible = ref(false);

watch(
  () => props.visible,
  () => {
    innerVisible.value = props.visible;
  },
  {
    immediate: true,
  }
);

const emit = defineEmits(["toggle"]);

const toggleVisible = () => {
  innerVisible.value = !innerVisible.value;
  emit("toggle", innerVisible.value);
};
</script>
<style lang="scss" scoped>
.drawer {
  position: relative;
  top: 0;
  height: 100%;
  // width: 300px;
  background-color: aquamarine;
  // transition: all 0.3s;
  z-index: 500;
  &.right {
    right: 0;

    .toggle {
      width: 15px;
      height: 100px;
      position: absolute;
      top: 50%;
      left: -15px;
      transform: translateY(-50px);
      background: rgba(0, 0, 0, 0.5);
      cursor: pointer;
    }
  }

  &.left {
    left: 0;

    .toggle {
      width: 15px;
      height: 100px;
      position: absolute;
      top: 50%;
      right: -15px;
      transform: translateY(-50px);
      background: rgba(0, 0, 0, 0.5);
      cursor: pointer;
    }
  }

  &.visible {
    width: 0px !important;
  }

  // &.right.visible {
  //   transform: translateX(100%);
  // }

  // &.left.visible {
  //   transform: translateX(-100%);
  // }
}
</style>
