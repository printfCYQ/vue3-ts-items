<template>
    <div class="flex h-screen w-screen">
        <div :class="toggle ? 'w-50' : 'w-15'"
            class="flex flex-col items-center justify-center relative transition-all ease-in-out duration-300">
            <div class=" flex  items-center my-3  cursor-pointer" v-for="item in menuList" :key="item.title"
                @click="toggleMenu(item)">
                <div class="h-8 w-8 p-2 rounded-lg transition-all ease-in-out duration-300"
                    :class="activeMenu === item.title ? ['bg-[' + item.color + ']', 'translate-x-[30px]', 'text-white', 'shadow-2xl', 'shadow-[' + item.color + ']'] : ''">
                    <div :class="item.icon" class="h-8 w-8 "></div>
                </div>
                <div :class="[toggle ? '' : 'hidden', activeMenu === item.title ? 'translate-x-[30px] ml-3' : '']">
                    {{ item.title }}</div>
            </div>
            <div class="absolute bottom-5 cursor-pointer" @click="toggle = !toggle">
                <div :class="toggle ? 'i-ic:baseline-format-indent-decrease' : 'i-ic:baseline-format-indent-increase'"
                    class="w-5 h-5">
                </div>
            </div>
        </div>
        <div class="flex-1 bg-sky">

        </div>
    </div>
</template>

<script setup lang="ts">
const toggle = ref(false)
const activeMenu = ref('首页')
const menuList = [
    { icon: 'i-ic:round-home', title: '首页', color: '#f97316' },
    { icon: 'i-ic:round-article', title: '文章', color: '#ec4899' },
    { icon: 'i-ic:round-file-present', title: '归档', color: '#8b5cf6' },
    { icon: 'i-ic:round-link', title: '友链', color: '#10b981' },
    { icon: 'i-ic:round-person', title: '关于', color: '#0ea5e9' },
]

const toggleMenu = (item: any) => {
    activeMenu.value = item.title
}
</script>