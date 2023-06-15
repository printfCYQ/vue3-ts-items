<template>
    <div grid grid-cols-3 gap-1>
        <div v-for="item in 100" :key="item">
            <HeavyComp v-if="defer(item)"></HeavyComp>
        </div>
    </div>
</template>

<script setup lang="ts">
import HeavyComp from './components/HeavyComp.vue';
import { useDefer } from './composables/useDefer';
const defer = useDefer()
</script>

<style scoped></style>