<template>
  <div class="puzzle-page">
    <div class="options">
      <button class="bg-green-500 active:bg-green-700" @click="reStart">重新开始</button>
      <button @click="toggleDifficulty(3)">简单</button>
      <button @click="toggleDifficulty(4)">中等</button>
      <button @click="toggleDifficulty(5)">困难</button>
      <div>time:{{ time }}</div>
      <div>step:{{ step }}</div>
      <img src="/lol.png" alt="">
    </div>
    <div class="puzzle" ref="puzzle"></div>
  </div>
</template>
<script setup lang="ts">
interface Config {
  width: number
  height: number
  row: number
  col: number
  img: string
  gameDom: any
  blockWidth: number
  blockHeight: number
  total: number
}
const puzzle = ref<HTMLDivElement>()
const step = ref<number>(0)
const time = ref<number>(0)
const config = ref<Config>({
  width: 500,
  height: 500,
  row: 3, //行数
  col: 3, //列数
  img: "/lol.png", //图片路径
  gameDom: puzzle,
  blockWidth: 0,
  blockHeight: 0,
  total: 0,
})
var emptyBlock: any = null; //空白元素
let timer: any;
onMounted(() => {
  getItemBlock()
  setGameArea()
})

const getItemBlock = () => {
  config.value.gameDom = puzzle.value
  config.value.blockWidth = Number(config.value.width) / Number(config.value.col);
  config.value.blockHeight = Number(config.value.height) / Number(config.value.row); // 每一个小块的高度
  config.value.total = Number(config.value.row) * Number(config.value.col); //总数
}

/**
 * 生成游戏区域
 */
const setGameArea = () => {
  //1. 初始化游戏根元素
  config.value.gameDom.style.width = config.value.width + "px";
  config.value.gameDom.style.height = config.value.height + "px";
  config.value.gameDom.style.border = "2px solid #ccc";
  config.value.gameDom.style.position = "relative";
  //2. 生成所有小方块（gameDom的子元素）
  var points = getCorrectPoints(); //得到正确坐标的数组
  shuffle(points);
  var correctPoints = getCorrectPoints();
  for (let i = 0; i < config.value.total; i++) {
    if (i < Number(config.value.total) - 1) {
      //不是最后生成的方块
      createBlockDom(points[i].x, points[i].y, true, correctPoints[i].x, correctPoints[i].y);
    }
    else {
      createBlockDom(points[i].x, points[i].y, false, correctPoints[i].x, correctPoints[i].y);
    }
  }
  timer = setInterval(() => {
    time.value++
  }, 1000)
}

/**
 * 得到一个数组，数组中包含所有正确的坐标
 */
const getCorrectPoints = () => {
  var arr = [];
  //循环行和列
  for (var i = 0; i < config.value.row; i++) {
    for (var j = 0; j < config.value.col; j++) {
      arr.push({
        x: j * Number(config.value.blockWidth),
        y: i * Number(config.value.blockHeight)
      })
    }
  }
  return arr;
}

/**
 * 洗牌
 */
const shuffle = (arr: any) => {
  for (let i = 0; i < arr.length - 1; i++) {
    const ele = arr[i];
    //随机生成下标，交换
    var index = getRandom(0, arr.length - 1);
    arr[i] = arr[index];
    arr[index] = ele;
  }
}
const isWin = () => {
  for (let i = 0; i < config.value.gameDom.children.length; i++) {
    const dom = config.value.gameDom.children[i];
    if (parseInt(dom.dataset.correctX) !== parseInt(dom.style.left) ||
      parseInt(dom.dataset.correctY) !== parseInt(dom.style.top)) {
      return false;
    }
  }
  return true;
}
/**
 * 根据最小值和最大值（取不到）得到一个随机数
 * @param {*} min 
 * @param {*} max 
 */
const getRandom = (min: any, max: any) => {
  var dec = max - min;
  return Math.floor(Math.random() * dec + min);
}

/**
 * 生成一个小方块的函数，直接添加到gameDom中
 */
const createBlockDom = (x: Number, y: Number, apendToPage: Boolean, correctX: Number, correctY: Number) => {
  var dom: HTMLDivElement = document.createElement("div");
  dom.style.width = config.value.blockWidth + "px";
  dom.style.height = config.value.blockHeight + "px";
  dom.style.background = `url(${config.value.img})`;
  dom.style.border = "1px solid #fff";
  //设置该样式，是为了让宽高包含边框的尺寸
  dom.style.boxSizing = "border-box";
  dom.style.position = "absolute";
  //1. 元素位置？ 从一个有限的坐标中随机取一个
  dom.style.left = x + "px";
  dom.style.top = y + "px";
  dom.dataset.correctX = correctX + '';
  dom.dataset.correctY = correctY + '';
  //2. 背景图位置？根据正确位置来算
  dom.style.backgroundPosition = `-${correctX}px -${correctY}px`;
  dom.style.cursor = "pointer";
  dom.style.transition = "all .3s";

  dom.onclick = function () {
    // 将当前元素的坐标，与空白元素的坐标交换
    //判断是否相邻
    var xdis: Number = Math.abs(parseFloat(dom.style.left) - parseFloat(emptyBlock.style.left))
    xdis = parseInt(xdis + '');
    var ydis = Math.abs(parseFloat(dom.style.top) - parseFloat(emptyBlock.style.top))
    ydis = parseInt(ydis + '');

    if (Number(xdis) + Number(ydis) !== parseInt(config.value.blockHeight + '') &&
      Number(xdis) + Number(ydis) !== parseInt(config.value.blockWidth + '')) {
      return;
    }

    var x = dom.style.left;
    var y = dom.style.top;
    dom.style.left = emptyBlock.style.left;
    dom.style.top = emptyBlock.style.top;
    emptyBlock.style.left = x;
    emptyBlock.style.top = y;
    step.value++
    if (isWin()) {
      clearInterval(timer)
      setTimeout(function () {
        alert("德玛西亚！！！");
      }, 300);
    }
  }

  if (apendToPage) {
    config.value.gameDom.appendChild(dom);
  }
  else {
    emptyBlock = dom;
  }
}
const toggleDifficulty = (value: number) => {
  config.value.col = value
  config.value.row = value
  clearPuzzel()
  getItemBlock()
  setGameArea()
}
const reStart = () => {
  clearPuzzel()
  getItemBlock()
  setGameArea()
}
const clearPuzzel = () => {
  step.value = 0
  time.value = 0
  while (config.value.gameDom.firstChild) {
    config.value.gameDom.removeChild(config.value.gameDom.firstChild)
  }
  clearInterval(timer)
}
</script>
<style lang="scss" scoped>
.puzzle-page {
  width: 100vw;
  height: 100vh;
  display: flex;

  .options {
    display: flex;
    flex-direction: column;

    button {
      margin-top: 10px;
    }

    img {
      width: 100px;
      height: 100px;
      margin-top: 20px;
    }
  }

  .puzzle {
    margin-left: 20px;
  }

}
</style>
