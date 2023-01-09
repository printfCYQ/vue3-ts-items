<template>
    <div class="mt-5 ml-10" v-for="route in routes" :key="route.path">
        <router-link :to="route.path">{{ route.name }}</router-link>
    </div>
</template>

<script setup lang="ts">
import { routes } from '@/router';
</script>