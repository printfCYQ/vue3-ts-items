<template>
    <div>
        <Street :level="1" @change="change"></Street>
        <hr>
        <Street :level="2" @change="change"></Street>
        <hr>
        <Street :level="3" @change="change"></Street>
        <hr>
        <Street :level="4" @change="change"></Street>
    </div>
</template>

<script setup lang="ts">
import Street from '@/components/street/index.vue';

const change = (e: []) => {
    console.log(e);
}
</script>

<style scoped></style>