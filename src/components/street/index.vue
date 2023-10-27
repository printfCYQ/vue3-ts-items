
import { emit } from 'process';
<template>
    <div v-for="(item, index) in options" :key="item.value">
        {{ item.label }}：
        <select v-model="value[item.value]" placeholder="请选择" @change="change(index)">
            <option v-for="i in item.data" :key="i.id" :label="i.name" :value="i.id">
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
import dataList from '@/utils/shengshiqu'
console.log(dataList);

const emits = defineEmits(['change'])
const value = reactive<any>({
    v1: '',
    v2: '',
    v3: '',
    v4: ''
})
const props = defineProps({
    level: {
        type: Number,
        default: 4
    }
})

const options = computed(() => {
    return [
        {
            label: '省',
            value: 'v1',
            data: province.value
        },
        {
            label: '市',
            value: 'v2',
            data: city.value
        }, {
            label: '区',
            value: 'v3',
            data: area.value
        }, {
            label: '街',
            value: 'v4',
            data: street.value

        }
    ].slice(0, props.level)
})

const province = computed(() => dataList)
const city = computed(() => {
    const item = province.value.find((v: any) => v.id === value.v1)
    return province.value.length > 0 && value.v1 && item ? item.children : []
})
const area = computed(() => {
    const item = city.value.find((v: any) => v.id === value.v2)
    return city.value.length > 0 && value.v2 && item ? item.children : []
})
const street = computed(() => {
    const item = area.value.find((v: any) => v.id === value.v3)
    return area.value.length > 0 && value.v3 && item ? item.children : []
})

const chooseValue = computed(() => {
    return [value.v1, value.v2, value.v3, value.v4].slice(0, props.level).filter(v => v)
})

const change = (index: number) => {
    for (let i = index + 1; i < props.level; i++) {
        value[`v${i + 1}`] = ''
    }
    emits('change', chooseValue.value)
}
</script>

<style scoped></style>