<template>
  <div class="w-screen h-screen flex flex-wrap content-start">
    <div class="mt-5 ml-10" v-for="route in routes" :key="route.path">
      <router-link :to="route.path">{{ route.name }}</router-link>
    </div>
    <!-- <button @click="close">close</button> -->
  </div>
</template>

<script setup lang="ts">
import { routes } from "@/router";

const close = () => {
  setTimeout(function () {
    //这个可以关闭安卓系统的手机
    document.addEventListener(
      "WeixinJSBridgeReady",
      function () {
        WeixinJSBridge.call("closeWindow");
      },
      false
    );
    //这个可以关闭ios系统的手机
    WeixinJSBridge.call("closeWindow");

    if (!WeixinJSBridge) {
      window.close();
    }
  }, 300);
};
</script>