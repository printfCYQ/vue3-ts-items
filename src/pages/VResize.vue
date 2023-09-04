<template>
    <div v-resize="handleResize" class="w-screen h-screen bg-amber"></div>
</template>
<script setup lang="ts">
const handleResize = (e) => {
    console.log(e);
};
</script>