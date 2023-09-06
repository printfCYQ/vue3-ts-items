<template>
    <div class="w-screen h-screen bg-black flex justify-center items-center">
        <div ref="target"
            class="w-9/12 h-3/5 rounded-lg border-2 border-opacity-30 border-gray-100 content overflow-hidden flex justify-center items-center color-white card"
            @mousemove="mouseMove" @mouseleave="mouseLeave">
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
        </div>
    </div>
</template>

<script setup lang="ts">
const target = ref()

const yRange = [-1, 1]
const xRange = [-1, 1]

const getRotate = (range: number[], value: number, max: number) => {
    return (value / max) * (range[1] - range[0]) + range[0]
}
const mouseMove = (e: MouseEvent) => {
    console.log(e);
    const { offsetX, offsetY } = e
    const { offsetWidth, offsetHeight } = target.value
    const ry = -getRotate(xRange, offsetX, offsetWidth)
    const rx = getRotate(yRange, offsetY, offsetHeight)
    target.value.style.setProperty('--rx', rx + 'deg')
    target.value.style.setProperty('--ry', ry + 'deg')
}
const mouseLeave = (e: MouseEvent) => {
    target.value.style.setProperty('--rx', '0deg')
    target.value.style.setProperty('--ry', '0deg')
}
</script>

<style scoped>
.card {
    will-change: transform;
    transform: perspective(500px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
}

.card:hover {
    box-shadow: -3px -3px 10px #54a29e, 3px 3px 10px #a79d66;
}
</style>
