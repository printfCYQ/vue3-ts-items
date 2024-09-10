<template>
  <div class="board-container">
    <div class="nav">TEST 看板</div>
    <div class="board">
      <Drawer
        :visible="leftVisible"
        placement="left"
        :width="212"
        @toggle="handleToggleLeft"
      >
        leftVisible
      </Drawer>
      <div
        :style="{
          width: getWidth,
        }"
      >
        <Board ref="boardRef" />
      </div>

      <Drawer
        :visible="rightVisible"
        placement="right"
        :width="250"
        @toggle="handleToggleRight"
      >
        rightVisible
      </Drawer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Drawer from "./Drawer.vue";
import Board from "./Board.vue";
const leftVisible = ref(false);
const rightVisible = ref(false);

const boardRef = ref();

const getWidth = computed(() => {
  const w = (leftVisible.value ? 0 : -212) + (rightVisible.value ? 0 : -250);
  return `calc(100% + ${w}px)`;
});

const handleToggleLeft = () => {
  leftVisible.value = !leftVisible.value;
  setTimeout(() => {
    // boardRef.value.handleReset();
    console.log(boardRef.value.container);
    console.log(boardRef.value.container.width);
    boardRef.value.resize(
      boardRef.value.container.width,
      boardRef.value.container.height
    );
  }, 100);
};

const handleToggleRight = () => {
  rightVisible.value = !rightVisible.value;
  setTimeout(() => {
    // boardRef.value.handleReset();
    console.log(boardRef.value.container);
    console.log(boardRef.value.container.width);
    boardRef.value.resize(
      boardRef.value.container.width,
      boardRef.value.container.height
    );
  }, 100);
  // boardRef.value.board.setAttr("width", 500);
};
</script>
<style lang="scss" scoped>
.board-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  .nav {
    height: 40px;
    background: pink;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    border-bottom: 1px solid #eee;
  }

  .board {
    flex: 1;
    display: flex;
    background-color: #eee;
    position: relative;
  }
}
</style>
