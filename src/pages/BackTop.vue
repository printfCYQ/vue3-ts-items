<script setup lang="ts">
import BackTop from '@/components/backtop/index.vue';
const target = ref()
const clickIt = (e: MouseEvent, index: number) => {
    console.log(e, index);
}
</script>

<template>
    <div class="flex">
        <div id="test" class="h-100 w-100 bg-red-400 overflow-auto">
            <div class="h-200 w-50 bg-green-400"></div>
        </div>
        <div ref="target" class="h-100 w-100 bg-red-400 overflow-auto">
            <div class="h-200 w-50 bg-green-400"></div>
        </div>
    </div>
    <div class="h-300"></div>
    <BackTop target="#test" to="#test" :bottom="200" :right="200" :visibilityHeight="50" animation="fade"
        @click="clickIt($event, 1)">
    </BackTop>
    <BackTop :target="target" :to="target" :bottom="100" :right="100" :visibilityHeight="100" animation="move"
        @click="clickIt($event, 2)">
    </BackTop>
    <BackTop @click="clickIt($event, 3)">
        <template v-slot>
            <div class="my-back">
                插槽
            </div>
        </template>
    </BackTop>
</template>

<style scoped lang="scss">
.my-back {
    width: 80px;
    height: 80px;
    background-color: rgb(0, 255, 26);
    text-align: center;
    line-height: 40px;
    font-weight: 800;
    font-size: 24px;
    color: #e64d01;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
}
</style>