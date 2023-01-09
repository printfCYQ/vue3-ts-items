<template>
    <div>
        <h2>Unocss presetUno :(Tailwind CSS) :</h2>
        <div class="w-screen flex justify-center text-indigo-900">Home</div>
        <hr>

        <h2>UnoCss icon :</h2>
        <div class="i-ic-baseline-backspace text-3xl bg-green-500" />
        <div class="i-ic:baseline-bolt text-3xl bg-green-500" />
        <hr>

        <h2>UnoCss presetAttributify:</h2>
        <div m-3>Home</div>
        <hr>

        <h2>pinia:</h2>
        {{ appStore.count }}
        <button @click="addCount">addCount</button>
        <hr>

        <h2>vue-router:</h2>
        <button @click="navTo">navTo About</button>
        <hr>

        <h2>vueUse</h2>
        <div v-if="isSupported">
            <p>
                Current copied: <code>{{ text || 'none' }}</code>
            </p>
            <input v-model="input" type="text">
            <button @click="copy(input)">
                Copy
            </button>
        </div>
        <hr>

        <h2></h2>
        <h2>axios</h2>
        <button @click="fetch">fetch</button>
    </div>
</template>

<script setup lang="ts">
import userApi from '@/api/user';
import { useAppStore } from '@/store/index';
import { useRouter } from 'vue-router';
import { useClipboard } from '@vueuse/core'

const { text, isSupported, copy } = useClipboard()
const appStore = useAppStore()
const router = useRouter()

const input = ref<string>('')

const addCount = () => {
    appStore.addCount()
}
const navTo = () => {
    router.push('/about')
}

const fetch = async () => {
    const res = await userApi.me()
    console.log(res)
}
</script>