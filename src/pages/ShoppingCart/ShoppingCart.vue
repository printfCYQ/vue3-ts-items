<template>
    <div ref="carPageRef" class="flex h-[calc(100vh-3rem)] text-[#333]">
        <div class="w-24 bg-[#f5f5f5] overflow-y-scroll menu-list">
            <div class="h-18 flex items-center justify-center px-3"
                :class="activeMenu === menu ? `bg-white font-bold before:content-[''] before:absolute before:left-0 before:h-full before:w-1 before:bg-[#3190e8]` : ''"
                v-for="menu in menus" :key="menu">
                <span class="text-base leading-5 overflow-hidden">{{ menu }}</span>
            </div>
        </div>
        <div class="flex-1 overflow-y-scroll good-list">
            <div class="px-2 flex border-b border-1 border-[#f8f8f8]" v-for="(good, index) in goods" :key="good.pic">
                <img class="w-25 h-25 object-contain border border-1 border-[#00000010]" :src="good.pic">
                <div class="flex-auto  overflow-hidden">
                    <h2 class="text-lg overflow-hidden text-ellipsis whitespace-nowrap mb-2">{{ good.title }}</h2>
                    <p class="text-sm overflow-hidden text-ellipsis whitespace-nowrap mb-2">{{ good.desc }}</p>
                    <p class="text-[#858687] text-sm flex overflow-hidden text-ellipsis whitespace-nowrap mb-2">
                        <span>月售 {{ good.sellNumber }}</span>
                        <span class="ml-2">好评率 {{ good.favorRate }}%</span>
                    </p>
                    <div class="flex justify-between">
                        <p class="flex text-base font-bold text-[#f60] items-baseline">
                            <span class="text-sm mb-1 font-normal">￥</span>
                            <span>{{ good.price }}</span>
                        </p>
                        <div class="flex justify-center items-center relative">
                            <div v-if="good.chooseNumber > 0" @click="reduceClick(good)"
                                class="w-3 h-3 bg-[#4a90e1] text-white rounded-full text-center p-1">
                                <div class="i-ic:sharp-minus w-3 h-3"></div>
                            </div>
                            <span class="ml-2">{{ good.chooseNumber }}</span>
                            <div ref="addIconRef" @click="addClick(good, index)"
                                class="w-3 h-3 bg-[#4a90e1] text-white rounded-full text-center p-1 ml-2">
                                <div class="i-ic:baseline-plus w-3 h-3 "></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="h-12 flex text-white fixed left-0 bottom-0 w-full z-10 ">
        <div class="flex-1 flex bg-[#3d3d3f]">
            <div ref="footerCarRef" class="w-8 h-8 rounded-full  border-3  border-[#444] p-3 absolute -top-5 left-5"
                :class="[showCarAnimation ? 'footer-car' : '', count ? 'bg-[#4a90e1]' : 'bg-[#3d3d3f]']">
                <div class="i-ic:sharp-shopping-cart w-8 h-8 text-white"></div>
                <div v-if="count" class="absolute top-1 right-1 bg-[#ec5533] w-4 h-4 rounded-full text-xs text-center">{{
                    count }}</div>
            </div>
            <div class="ml-25 leading-[1.5rem] ">
                <div class="text-base">
                    <span>￥</span>
                    <span>{{ total }}</span>
                </div>
                <div class="text-xs">配送费￥5</div>
            </div>
        </div>
        <div class="w-30 flex justify-center items-center  text-xs"
            :class="Number(total) > maxNum ? 'bg-[#76d572]' : 'bg-[#535356]'">
            <div>
                {{ Number(total) > maxNum ? '去结算' : `还差￥${(maxNum - Number(total)).toFixed(0)}元起送` }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const maxNum = ref(30)
const menus = [
    '推荐',
    '热销',
    '折扣',
    '夏日冰咖必喝榜',
    '进店必喝',
    '只喝美式',
    '酷爽特调水果冰萃',
    '经典奶咖',
    '创意奶咖',
    '瑞纳冰季',
    '不喝咖啡',
    '轻食甜品',
    '热卖套餐',
]

import g1 from './images/g1.png';
import g2 from './images/g2.png';
import g3 from './images/g3.png';
import g4 from './images/g4.png';
import g5 from './images/g5.png';

interface GoodI {
    pic: string;
    title: string;
    desc: string;
    sellNumber: number;
    favorRate: number;
    price: number;
    chooseNumber: number
}

var goods = reactive<GoodI[]>([
    {
        pic: g1,
        title: '椰云拿铁',
        desc: `1人份【年度重磅，一口吞云】
    √原创椰云topping，绵密轻盈到飞起！
    原创瑞幸椰云™工艺，使用椰浆代替常规奶盖
    打造丰盈、绵密，如云朵般细腻奶沫体验
    椰香清甜饱满，一口滑入口腔
    
    【饮用建议】请注意不要用吸管，不要搅拌哦~`,
        sellNumber: 200,
        favorRate: 95,
        price: 32,
        chooseNumber: 0
    },
    {
        pic: g2,
        title: '生椰拿铁',
        desc: `1人份【YYDS，无限回购】
    现萃香醇Espresso，遇见优质冷榨生椰浆，椰香浓郁，香甜清爽，带给你不一样的拿铁体验！
    
    主要原料：浓缩咖啡、冷冻椰浆、原味调味糖浆
    图片及包装仅供参考，请以实物为准。建议送达后尽快饮用。到店饮用口感更佳。`,
        sellNumber: 1000,
        favorRate: 100,
        price: 19.9,
        chooseNumber: 0
    },
    {
        pic: g3,
        title: '加浓 美式',
        desc: `1人份【清醒加倍，比标美多一份Espresso】
    口感更佳香醇浓郁，回味持久
    图片仅供参考，请以实物为准。建议送达后尽快饮用。`,
        sellNumber: 200,
        favorRate: 93,
        price: 20.3,
        chooseNumber: 0
    },
    {
        pic: g4,
        title: '瓦尔登蓝钻瑞纳冰',
        desc: `1人份【爆款回归！蓝色治愈力量】
    灵感来自下澄明、碧蓝之境---瓦尔登湖。含藻蓝蛋白，梦幻蓝色源自天然植物成分，非人工合成色素，融入人气冷榨生椰浆，椰香浓郁，清冽冰爽；底部添加Q弹小料，0脂原味晶球，光泽剔透，如钻石般blingbling。搭配奶油顶和彩虹色棉花糖，满足你的少女心～
    【去奶油小提示】由于去掉奶油后顶料口味会受影响，为保证口感，选择“去奶油”选项时将同时去掉奶油及顶料，请注意哦！【温馨提示】瑞纳冰系列产品形态为冰沙，无法进行少冰、去冰操作，请您谅解。【图片仅供参考，请以实物为准】`,
        sellNumber: 17,
        favorRate: 80,
        price: 38,
        chooseNumber: 0
    },
    {
        pic: g5,
        title: '椰云精萃美式',
        desc: `1人份【不用吸管 大口吞云！】

    1杯热量*≈0.6个苹果！
    原创瑞幸椰云™工艺，将「椰浆」变成绵密、丰盈的“云朵”，口感绵密顺滑！0乳糖植物基，清爽轻负担！
    
    *数据引自《中国食物成分表》第六版，苹果每100克可食部分中能量约为53千卡，以每个苹果250克/个计，1杯椰云精萃美式约80千卡，相当于约0.6个苹果。
    【图片仅供参考，请以实物为准】`,
        sellNumber: 50,
        favorRate: 90,
        price: 21.12,
        chooseNumber: 0
    },
])


const total = computed(() => {
    return goods.reduce((pre, cur) => {
        return pre + (cur.chooseNumber * cur.price)
    }, 0).toFixed(2)
})

const count = computed(() => {
    return goods.reduce((pre, cur) => {
        return pre + cur.chooseNumber
    }, 0)
})
const activeMenu = ref('推荐')
const showCarAnimation = ref(false)
const carPageRef = ref()
const footerCarRef = ref()
const addIconRef = ref()
const addClick = (good: GoodI, index: number) => {
    good.chooseNumber++
    jump(index)
}

const carAnimate = () => {
    showCarAnimation.value = true

    footerCarRef.value.addEventListener('animationend', () => {
        showCarAnimation.value = false
    })
}
const reduceClick = (good: GoodI) => {
    good.chooseNumber--
}

// 抛物线跳跃的元素
const jump = (index: number) => {

    var carRect = footerCarRef.value.getBoundingClientRect();

    var jumpTarget = {
        x: carRect.left + carRect.width / 2,
        y: carRect.top + carRect.height / 5,
    };

    // 找到对应商品的加号
    var btnAdd = addIconRef.value[index]

    var rect = btnAdd.getBoundingClientRect();
    var start = {
        x: rect.left,
        y: rect.top,
    };
    // 跳吧
    var div = document.createElement("div");
    div.className = "w-3 h-3 bg-[#4a90e1] text-white rounded-full text-center p-1 ml-2 fixed";
    var icon = document.createElement("div");
    icon.className = "i-ic:baseline-plus w-3 h-3 iconfont";

    div.style.top = `${start.y - 20}px`
    div.style.left = `${start.x - 20}px`
    div.appendChild(icon);
    document.body.appendChild(div);
    // 强行渲染
    div.clientWidth;

    const step = () => {
        // 设置结束位置 
        div.style.top = `${jumpTarget.y}px`
        div.style.left = `${jumpTarget.x}px`
        div.style.transition = `0.5s cubic-bezier(0.5, -0.5, 1, 1)`;
    };

    window.requestAnimationFrame(step);
    div.addEventListener(
        "transitionend",
        () => {
            div.remove();
            carAnimate();
        },
        {
            once: true, // 事件仅触发一次
        }
    );

}

</script>

<style scoped>
.menu-list::-webkit-scrollbar,
.good-list::-webkit-scrollbar {
    width: 0;
}


.footer-car {
    animation: footer-car-animate 500ms ease-in-out;
}

@keyframes footer-car-animate {
    0% {
        transform: scale(1);
    }

    25% {
        transform: scale(0.8);
    }

    50% {
        transform: scale(1.1);
    }

    75% {
        transform: scale(0.9);
    }

    100% {
        transform: scale(1);
    }
}
</style>