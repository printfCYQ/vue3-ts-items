<template>
    <div class="w-screen h-screen flex items-center justify-center">
        <span ref="el" />
    </div>
</template>
<script setup lang="ts">
import Typed from 'typed.js';
const el = ref()

onMounted(() => {
    const typed = new Typed(el.value, {
      strings: ['<span class="text-4xl">Hello World!</span>'],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    });
})
</script>