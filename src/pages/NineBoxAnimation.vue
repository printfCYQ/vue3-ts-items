<template>
    <div class="w-screen h-screen bg-[#000] flex items-center justify-center">
        <div class="box w-xl h-xl grid gap-2 ease-linear duration-300 transition-all">
            <div class="item" v-for="item in 9" :key="item"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.box {
    // grid-template: repeat(3, 1fr) / repeat(3, 1fr); 简写不好使
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
}

@for $i from 0 to 9 {
    .item:nth-child(#{$i + 1}) {
        $percent: calc($i * 40% / 1%);
        background: hsl($percent, 100%, 74%);
    }

    .box:has(.item:nth-child(#{$i + 1}):hover) {
        $index: calc($i / 3);
        $r: floor($index) + 1;
        $c: $i % 3 + 1;
        $arr: 1fr 1fr 1fr;
        $rows: set-nth($arr, $r, 2fr);
        $columns: set-nth($arr, $c, 2fr);
        grid-template-rows: $rows;
        grid-template-columns: $columns;
    }
}
</style>