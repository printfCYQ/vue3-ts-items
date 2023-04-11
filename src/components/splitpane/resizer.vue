<template>
  <div :class="classes"></div>
</template>
<script lang="ts">
export default {
  name: "ReSize",
};
</script>
<script setup lang="ts">
import { useAppStore } from "@/store";
import { computed } from "vue";
const appStore = useAppStore();
const props = defineProps({
  split: {
    validator(value: string) {
      return ["vertical", "horizontal"].indexOf(value) >= 0;
    },
    required: true,
  },
  active: Boolean,
  className: String,
});
const classes = computed(() => {
  const classes = [
    "splitter-pane-resizer",
    props.split,
    props.className,
    props.active ? "active" : "",
    appStore.sideMenuShow ? "" : "disable",
  ];
  return classes.join(" ");
});
</script>

<style scoped lang="scss">
.splitter-pane-resizer {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  // background: #000;
  background: #474747;
  position: absolute;
  z-index: 1;
  -moz-background-clip: padding;
  -webkit-background-clip: padding;
  background-clip: padding-box;

  &.horizontal {
    height: 11px;
    margin: -5px 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    cursor: row-resize;
    width: 100%;
  }

  &.vertical {
    width: 11px;
    height: 100%;
    margin-left: -5px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    cursor: col-resize;
  }

  &.disable {
    cursor: not-allowed;
    &:hover,
    &.active {
      &::after,
      &::before {
        display: none;
      }
    }
  }

  &:hover,
  &.active {
    &::before,
    &::after {
      display: block;
    }
  }

  &::before {
    width: 1px;
    height: 100%;
    content: " ";
    display: none;
    position: absolute;
    background: #8b7af0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
  }

  &::after {
    content: " ";
    display: none;
    position: absolute;
    background: #8b7af0;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 5px;
    height: 48px;
    border-radius: 4px;
    z-index: 5;
  }
}
</style>
