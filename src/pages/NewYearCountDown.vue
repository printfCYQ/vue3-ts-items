
<template>
    <div class="new-year-count-down">
      <div class="title" :data-content="title">{{ title }}</div>
      <div class="tip">距离{{ tips }}还有</div>
      <div class="count">
        <span class="count-time">{{ days }}</span>
        <span class="count-text">天</span>
        <span class="count-time">{{ addZero(hours) }}</span>
        <span class="count-text">时</span>
        <span class="count-time">{{ addZero(minutes) }}</span>
        <span class="count-text">分</span>
        <span class="count-time">{{ addZero(senconds) }}</span>
        <span class="count-text">秒</span>
      </div>
      <div class="dialog" :style="{ visibility: (visibility ? 'hidden' : 'visible') }">
        <div class="close" @click="closeDialog">X</div>
        <div>
          <input v-model="title" type="text" />
        </div>
        <div>
          <input v-model="tips" type="text">
        </div>
        <div>
          <input v-model="countDate" type="date">
        </div>
      </div>
      <div class="edit-tip">shift + d 唤起编辑</div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from "vue";
  const countDate = ref('2023-01-22')
  
  const title = ref<string>('喜迎新春')
  const tips = ref<string>('新年')
  const days = ref<number>(0)
  const hours = ref<number>(0)
  const minutes = ref<number>(0)
  const senconds = ref<number>(0)
  const visibility = ref(true)
  const addZero = (num: number) => {
    return num < 9 ? '0' + num : num
  }
  
  onMounted(() => {
    const timer = setInterval(() => {
      const des = (new Date(countDate.value)).getTime() - new Date().getTime();
      days.value = Math.floor(des / (1000 * 60 * 60 * 24));
      hours.value = Math.floor((des % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes.value = Math.floor((des % (1000 * 60 * 60)) / (1000 * 60));
      senconds.value = Math.floor((des % (1000 * 60)) / 1000);
  
      if (des <= 0) {
        days.value = 0
        hours.value = 0
        minutes.value = 0
        senconds.value = 0
        clearInterval(timer)
      };
    }, 1000);
  
    document.onkeydown = function (e) {
      if ('KeyD' == e.code && e.shiftKey) {
        visibility.value = false
      }
    }
  })
  
  const closeDialog = () => {
    visibility.value = true
  }
  
  </script>
  

  <style scoped lang="scss">
  .new-year-count-down {
    width: 100vw;
    height: 100vh;
    background: rgb(183, 10, 10);
    background: radial-gradient(circle,
        rgba(183, 10, 10, 0.9) 64%,
        rgba(0, 0, 0, 0.6) 100%);
  
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  
    .title {
      margin-bottom: 30px;
      font-weight: 700;
      position: relative;
      font-size: 50px;
      color: #c9c06480;
      letter-spacing: 50px;
  
      &::after {
        content: attr(data-content);
        position: absolute;
        inset: 0;
        background: rgb(255, 242, 1);
        background-clip: text;
        -webkit-background-clip: text;
        -moz-background-clip: text;
        -ms-background-clip: text;
        -o-background-clip: text;
        color: transparent;
        clip-path: ellipse(30px 30px at 0% 50%);
        animation: move 5s ease-in infinite;
      }
  
      @keyframes move {
        50% {
          clip-path: ellipse(30px 30px at 100% 50%);
        }
  
        to {
          clip-path: ellipse(30px 30px at 0% 50%);
        }
      }
    }
  
    .tip {
      font-size: 20px;
      margin-bottom: 30px;
      color: #c9c164d3;
      letter-spacing: 10px;
    }
  
    .count {
  
  
      &-time {
        font-size: 50px;
        color: rgb(243 226 20);
        padding: 0 20px;
        letter-spacing: 5px;
      }
  
      &-text {
        font-size: 15px;
        color: rgb(222 205 10 / 58%);
      }
    }
  
    .dialog {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 0;
      padding: 20px;
      background: #000;
  
      .close {
        cursor: pointer;
        position: absolute;
        top: 10px;
        right: 10px;
        color: #fff;
      }
    }
  
    .edit-tip {
      position: absolute;
      bottom: 10px;
      right: 10px;
      color: #fff;
      font-size: 10px;
    }
  }
  
  @media screen and (max-width: 600px) {
    .title {
      letter-spacing: 10px !important;
    }
  
    .count-time {
      padding: 0 5px !important;
    }
  }
  </style>