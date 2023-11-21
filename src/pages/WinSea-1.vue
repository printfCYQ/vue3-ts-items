<template>
    <div class="flex items-stretch p-y-[10px] bg-[#F7F7F9] m-b-10px" ref="supplierContainerRef">
        <div class="w-[62px] shrink-0 flex flex-col items-center justify-center text-[12px] font-600 color-[#2C2C2C] leading-[14px] "
            ref="supplierContainerLabelRef">
            <div>本次</div>
            <div>报价</div>
        </div>
        <div class="flex flex-wrap border-l-1 border-[rgba(217,217,217,0.8)]" ref="supplierContainerItemsRef">
            <div v-for="(item, index) in dataList" :key="index"
                class="p-x-[18px] text-[12px] font-500 color-[#2C2C2C] border-l-1 border-[rgba(217,217,217,0.8)] m-b-[12px] box-border">
                <div>{{ item.name }}</div>
                <!-- [&>:not(:first-child)]-m-l-[12px] -->
                <div class="flex items-center flex-wrap m-t-[5px] price-items">
                    <div v-for="(i, ind) in item.children" :key="ind">
                        <span class="text-[12px] font-500 color-[#2C2C2C] leading-[12px]">{{ i.type }}</span>
                        <span class="text-[12px] font-400 color-[#FF5C00] leading-[14px]">{{ i.price }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">

const supplierContainerRef = ref()
const supplierContainerLabelRef = ref()
const supplierContainerItemsRef = ref()

const dataList = ref<any>([])

onMounted(() => {
    const index = Math.floor(Math.random() * 6) + 10;

    const list = []
    for (let i = 1; i <= index; i++) {
        list.push({
            id: i,
            name: '公司' + i,
            children: new Array(i).fill({
                type: '进口',
                price: '18.00'
            })
        })
    }
    dataList.value = list

    window.addEventListener('resize', reDraw)

    nextTick(() => {
        reDraw()
    })
})

const reDraw = () => {
    const collection = supplierContainerItemsRef.value.children; // 公司-items
    const supplierContainerRefRect = supplierContainerRef.value.getBoundingClientRect() // 整个容器
    const supplierContainerLabelRefRect = supplierContainerLabelRef.value.getBoundingClientRect() // 容器左侧
    Array.from(collection).forEach((el: any) => {
        const rect = el.getBoundingClientRect()
        // 依次判断公司的每一项是否挨在容器左侧【padding 18px】
        if (rect.left - supplierContainerLabelRefRect.right < 20) {
            el.style.borderLeft = 'none'
        } else {
            el.style.borderLeft = '1px solid rgba(217,217,217,0.8)'
        }

        // 判断是否挨在整个容器的底部【padding-bottom 10px + margin-bottom 12px】
        if (supplierContainerRefRect.bottom - rect.bottom < 30) {
            el.style.marginBottom = '0'
        } else {
            el.style.marginBottom = '12px'
        }

        const priceItems = el.querySelector('.price-items'); // 公司-items -- price-items

        Array.from(priceItems.children).forEach((priceItem: any, index: number) => {
            const priceItemRect = priceItem.getBoundingClientRect()
            // 第一项 || 判断是否挨在容器的左侧（有换行情况）【padding 18px + margin-left 12px】
            if (index === 0 || priceItemRect.left - supplierContainerLabelRefRect.right < 35) {
                priceItem.style.marginLeft = '0'
            } else {
                priceItem.style.marginLeft = '12px'
            }
        });
    });
}
</script>