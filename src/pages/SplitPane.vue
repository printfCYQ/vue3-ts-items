<template>
  <Splitpane
    class="page"
    v-on:resize="resize"
    :min-percent="23"
    :max-percent="45"
    :default-percent="appStore.sideMenuWidth"
    split="vertical"
  >
    <template v-slot:paneL> 1 </template>
    <template v-slot:paneR> 2 </template>
  </Splitpane>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store";
const appStore = useAppStore();
const resize = () => {
  console.log("resize");
};
</script>

<style scoped lang="scss">
.page {
  background-color: #292929;
  height: 100vh;
}
</style>
