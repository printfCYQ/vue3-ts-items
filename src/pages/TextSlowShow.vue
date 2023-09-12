<template>
    <div class="w-screen h-screen flex items-center justify-center bg-[#000]">
        <div class="text-container">
            <p class="text">{{ text }}</p>
            <p class="eraser">
                <span class="eraser-text">
                    {{ text }}
                </span>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
const text = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, delectus dolorum consequuntur alias veniam quas doloremque excepturi temporibus nisi perferendis aspernatur omnis dignissimos rerum minima! Ut quia corrupti dolore praesentium!Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, delectus dolorum consequuntur alias veniam quas doloremque excepturi temporibus nisi perferendis aspernatur omnis dignissimos rerum minima! Ut quia corrupti dolore praesentium!Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, delectus dolorum consequuntur alias veniam quas doloremque excepturi temporibus nisi perferendis aspernatur omnis dignissimos rerum minima! Ut quia corrupti dolore praesentium!`
</script>

<style scoped>
.text-container {
    width: 80%;
    font-family: 'Courier New', Courier, monospace;
    line-height: 2;
    position: relative;
    color: #fff;
}

.text,
.eraser {
    position: absolute;
    top: 0;
    left: 0;
}

.eraser-text {
    --p: 1%;
    background: linear-gradient(to right, #0000 var(--p), #000 calc(var(--p) + 100px));
    color: transparent;
    animation: ease 10s forwards;
}

@property --p {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 0%;
}

@keyframes ease {
    to {
        --p: 100%;
    }
}
</style>