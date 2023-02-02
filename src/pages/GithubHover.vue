<template>
    <div class="w-screen h-screen bg-black flex justify-center items-center">
        <div ref="target"
            class="w-9/12 h-3/5 rounded-lg border-2 border-opacity-30 border-gray-100 content overflow-hidden flex justify-center items-center color-white relative">
            <div>
                <p> 题帕三绝句</p>
                <p> 其一</p>
                <p> 眼空蓄泪泪空垂，暗洒闲抛却为谁。</p>
                <p> 尺幅鲛绡劳解赠，叫人焉得不伤悲。</p>
                <p> 其二</p>
                <p> 抛珠滚玉只偷潸，镇日无心镇日闲。</p>
                <p> 枕上袖边难拂拭，任他点点与斑斑。</p>
                <p> 其三</p>
                <p> 彩线难收面上珠，湘江旧迹已模糊；</p>
                <p> 窗前亦有千竿竹，不识香痕渍也无？</p>
            </div>
            <div ref="bg" class="bg absolute opacity-0 rounded-full"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMouseInElement } from '@vueuse/core'
const target = ref()
const bg = ref()
const mouse = reactive(useMouseInElement(target))
watch(mouse, (newValue, oldValue) => {
    const { isOutside, elementHeight, elementWidth, elementX, elementY } = newValue
    let x = 0;
    let y = 0;
    if (!isOutside) {
        // 鼠标在上半部分
        if (elementY < elementHeight / 2) {
            x = elementY / elementHeight - 1
        } else {
            x = elementY / elementHeight
        }

        // 鼠标在左边半部分
        if (elementX < elementWidth / 2) {
            y = elementX * 1.5 / elementWidth - 1.5
        } else {
            y = elementX * 1.5 / elementWidth
        }
        target.value.style.transform = `perspective(700px) rotateX(${x}deg) rotateY(${y}deg)`
        bg.value.style.opacity = 1
        bg.value.style.bottom = -1 * elementY + 'px'
        bg.value.style.left = elementX + 'px'
    } else {
        target.value.style.transform = ''
        bg.value.style.opacity = 0
    }
})
</script>

<style scoped>
.content {
    transition: all .1s;
    will-change: transform;

}

.bg {
    width: 400px;
    height: 400px;
    transform: translate(-200px, -200px);
    background-color: #939aff;
    filter: blur(180px);
    transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: bottom, left;
}
</style>
