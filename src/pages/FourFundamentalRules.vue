<template>
    <div class="p-4">
        <div class="flex items-center flex-wrap">
            <div class="w-24 h-10 flex justify-center  items-center mr-4 cursor-pointer transition-all rounded-2 select-none"
                :class="activeType === item.value ? 'bg-blue-400' : 'bg-gray-200'" @click="chooseType(item.value)"
                v-for="item in typeList" :key="item.value">{{ item.label }}</div>
            <div>
                位数：
                <input type="number" min="1" max="5" v-model="digit">
            </div>
            <div class="ml-4">
                题数：
                <input type="number" min="10" max="50" v-model="total">
            </div>
            <div class="w-24 h-10 flex justify-center bg-emerald-400  items-center mr-4 cursor-pointer transition-all rounded-2 select-none ml-4"
                @click="getTopic()"> {{ set.size === total ? '重新生成' : '生成题目' }} </div>
        </div>
        <div v-for="item in set" :key="item">{{
            item
        }}</div>
    </div>
</template>

<script setup lang="ts">

const typeList = reactive([
    { value: 0, label: '加法' },
    { value: 1, label: '减法' },
    { value: 2, label: '乘法' },
    { value: 3, label: '除法' },
])
const total = ref(20)
const digit = ref(2)
const activeType = ref(0)
const set = reactive(new Set())
const getTopic = () => {
    const typeList = ['+', '-', '×', '÷']
    set.clear()
    while (set.size < total.value) {
        set.add(getRandow() + typeList[activeType.value] + getRandow());
    }
}

const getRandow = () => {
    const start = 10 ** (digit.value - 1)
    const end = 10 ** digit.value - 1
    return Math.floor(Math.random() * (end - start + 1)) + start;
}


const chooseType = (value: number) => {
    if (activeType.value !== value) {
        activeType.value = value
        set.clear()
    }
}
</script>