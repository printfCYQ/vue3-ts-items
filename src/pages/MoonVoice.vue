
<template>
  <div class="page" :style="{
    background: pageBackground,
  }">
    <div class="wrapper">
      <!-- <audio ref="audioRef" src="http://120.48.74.178:3010/song_1.mp3" preload="auto"></audio> -->
      <audio ref="audioRef" src="/huaxin.mp3" preload="auto"></audio>
      <div class="title">拖动地球远近来控制音乐播放~调节声音大小~</div>
      <div class="per">Volume: {{ volume }}%</div>
      <div ref="sunRef" class="circle sun"></div>
      <div ref="moonRef" :style="{
        background: moonBackground,
      }" @mousemove="mouseMove" @mousedown="mouseDown" @mouseup="mouseUp" class="circle moon"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";

const moonRef: Ref = ref(null);
const sunRef: Ref = ref(null);
const audioRef: Ref = ref(null);

const volume = ref(0);
const pageBackground = ref("");
const moonBackground = ref("");
const isMove = ref(false);
const dis = ref(0);

const mouseMove = (e: MouseEvent) => {
  if (!isMove.value) {
    return;
  }
  moonRef.value.style.left = e.clientX - dis.value + "px";
  getVoice();
};
const mouseDown = (e: MouseEvent) => {
  isMove.value = true;
  dis.value = e.clientX - moonRef.value.offsetLeft;
};
const mouseUp = () => {
  isMove.value = false;
};
// 根据位置计算百分比  确定声音
const getVoice = () => {
  var per = 0,
    d = moonRef.value.clientWidth,
    moonL = moonRef.value.offsetLeft,
    moonR = moonL + d,
    sunL = sunRef.value.offsetLeft,
    sunR = sunL + d;
  console.log(d, moonL, moonR, sunL, sunR);
  // 两个圆相离状态  没有重合的部分
  if (sunL > moonR || moonL > sunR) {
    per = 0;
    // moon在sun的右侧
  } else {
    if (sunL < moonL) {
      // 从右向左运动 sunR - moonL 计算出覆盖的水平距离  moonl 越来越小计算值越来越大
      per = (sunR - moonL) / d;
      // 从左向右运动  越来越大的moonR - 不动的sunL  覆盖水平距离越来越大 最后结果越来越大
    } else if (moonR >= sunL) {
      per = (moonR - sunL) / d;
    }
  }
  change(per);
};
const change = (vol: number) => {
  // 根据两个圆得距离计算得百分比确定音频是否播放
  vol > 0 ? audioRef.value.play() : audioRef.value.pause();
  console.log(vol);
  // 根据百分比设置音量
  audioRef.value.volume = vol;
  // 填充html内容
  volume.value = Number((vol * 100).toPrecision(4));
  // 设置背景颜色值
  moonBackground.value = "hsl(194, 56%, " + (1 - vol) * 60 + "%)";
  pageBackground.value =
    "hsl(" + (194 + Math.floor(166 * vol)) + ", 66%, " + (1 - vol) * 50 + "%)";
};
</script>

<style lang="scss" scoped>
.page {
  width: 100vw;
  height: 100vh;
  background: hsl(194, 66%, 49%);

  .wrapper {
    position: relative;
    width: 70%;
    height: 100%;
    margin: 0 auto;

    .title {
      position: absolute;
      top: 100px;
      color: #fff;
      font-size: 20px;
      font-weight: bolder;
      width: 100%;
      text-align: center;
    }

    .circle {
      position: absolute;
      width: 20%;
      padding-top: 20%;
      border-radius: 50%;
      left: 30%;
      top: 30%;
    }

    .sun {
      background-color: #ffff77;
      box-shadow: 0 0 50px #ffff77;
    }

    .moon {
      left: 52%;
      cursor: pointer;
      box-shadow: inset 5px 5px 50px rgba(255, 255, 119, 0.3);
    }

    .per {
      position: absolute;
      top: 20%;
      width: 100%;
      height: 40px;
      text-align: center;
      color: #fff;
      font-weight: bold;
    }
  }
}
</style>
