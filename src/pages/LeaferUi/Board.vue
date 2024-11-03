<template>
  <div class="w-full h-full" ref="containerRef"></div>
  <div
    class="fixed top-0 left-0 z-100 cursor-pointer"
    @click="handleReset"
    ref="resizeRef"
  >
    resize
  </div>
</template>

<script lang="ts" setup>
import {
  Leafer,
  Group,
  Box,
  Ellipse,
  ZoomEvent,
  LeafHelper,
  Rect,
  Polygon,
  PointerEvent,
  RenderEvent,
  DragEvent,
  Text,
} from "leafer-ui";
import "@leafer-in/view";
import axios from "axios";
const SCREEN_SAFE_WIDTH = 10;

const resizeRef = ref();
const containerRef = ref();
const containerRefClientWidth = ref(0);
const containerRefClientHeight = ref(0);

const container = ref();
const board = ref();

// 库区的标记
const KQ_KEY = "KQ-";
// 库位的标记
const KW_KEY = "YL-";
// 库区有库位的标记
const KQ_HAS_KW_KEY = "KQ-Y-";
// 库区没有库位的标记
const KQ_HAS_NO_KW_KEY = "KQ-N-";

const labelList = [
  { id: 2, color: "#00B85C", label: "已收原料库位" },
  { id: 1, color: "#F5C800", label: "未收原料库位" },
  { id: 3, color: "#FF1F1F", label: "查询库位" },
  { id: 4, color: "#B7BABD", label: "空库位" },
  { id: 0, color: "#CFD1D3", label: "删除库位" },
];

const entities = ref([]);
const stockUseInfoList = ref([]);

const randomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const boardHeight = computed(() => board.value.height);

const handleReset = () => {
  container.value!.zoom("fit", 0);
  // container.value!.zoomLayer.scale = 1;
  // container.value!.zoomLayer.x = 0;
  // container.value!.zoomLayer.y = 0;
};

const initContainer = () => {
  container.value = new Leafer({
    view: containerRef.value,
    fill: "gray",
    wheel: { zoomMode: true },
    zoom: { min: 0.4, max: 3 },
    move: { dragOut: true },
  });
  containerRefClientHeight.value = containerRef.value.clientHeight;
  containerRefClientWidth.value = containerRef.value.clientWidth;
};

const boardPadding = 50;
const initBoard = () => {
  board.value = new Box({
    x: boardPadding,
    y: boardPadding,
    width: containerRefClientWidth.value - boardPadding * 2,
    height: containerRefClientHeight.value - boardPadding * 2,
    fill: "#808080",
    draggable: true,
  });

  board.value.on(DragEvent.DRAG, async function (e: DragEvent) {});

  board.value.on(DragEvent.END, (e: any) => {
    const boardX = e.current.__nowWorld.x; // board 左上点的x坐标
    const boardY = e.current.__nowWorld.y; // board 左上点的y坐标
    const boardWidth = e.current.__nowWorld.width; // board 的宽度
    const boardHeight = e.current.__nowWorld.height; // board 的高度
    const containerWidth = container.value.width;
    const containerHeight = container.value.height;

    let overLeft, overRight, overTop, overBottom;

    if (boardX < 0) {
      overLeft = Math.abs(boardX) + SCREEN_SAFE_WIDTH > boardWidth;
    } else {
      overRight = boardX + SCREEN_SAFE_WIDTH > containerWidth;
    }

    if (boardY < 0) {
      overTop = Math.abs(boardY) + SCREEN_SAFE_WIDTH > boardHeight;
    } else {
      overBottom = boardY + SCREEN_SAFE_WIDTH > containerHeight;
    }

    if (overLeft || overRight || overTop || overBottom) {
      console.log("Board is out of the container!");
      board.value.x = 0;
      board.value.y = 0;
    }
  });

  container.value.add(board.value);
};

const createArea = (
  groupX: number,
  groupY: number,
  rectW: number,
  rectH: number,
  rectFill: string
) => {
  const rect = new Rect({
    width: rectW,
    height: rectH,
    fill: rectFill,
    cornerRadius: 10,
  });
  const group = new Group({
    x: groupX,
    y: groupY,
    zIndex: 10,
  });
  group.add(rect);
  return group;
};

const createItem = (
  x: number,
  y: number,
  w: number,
  h: number,
  fill: string,
  onlyBorder?: boolean
) => {
  const rect = new Rect({
    width: w,
    height: h,
    x: x,
    y: y,
    fill: onlyBorder ? "" : fill,
    stroke: onlyBorder ? fill : "",
    cornerRadius: w / 4,
    data: {
      name: "test",
    },
    zIndex: 100,
  });
  rect.on(PointerEvent.TAP, (e: any) => {
    console.log(e.current.data);
    resizeRef.value!.style.top = `${e.y}px`;
    resizeRef.value!.style.left = `${e.x}px`;
  });
  return rect;
};

const createText = (x: number, y: number, text: string = "text") => {
  const textBox = new Box({
    x,
    y,
    children: [
      {
        tag: "Text",
        text,
        fill: "black",
        textWrap: "break",
        textAlign: "center",
        verticalAlign: "middle",
      },
    ],
    zIndex: 300,
  });
  return textBox;
};

const createTooltip = (areaWidth: number, text: string) => {
  const textBox = new Box({
    x: 0,
    y: 0,
    children: [
      {
        tag: "Text",
        text,
        fill: "black",
        textWrap: "break",
        textAlign: "center",
        verticalAlign: "middle",
        padding: [10, 20],
      },
    ],
    zIndex: 300,
    fill: "#FFF",
    cornerRadius: 20,
  });

  const sidesThreeWidth = 8;
  const sidesThreeHeight = 5;
  const sidesThree = new Polygon({
    x: 0,
    y: 0,
    width: sidesThreeWidth,
    height: sidesThreeHeight,
    sides: 3,
    fill: "rgb(50,205,121)",
    cornerRadius: 5,
    rotation: 180,
    zIndex: 500,
  });

  const tooltip = new Group({
    x: 0,
    y: 0,
    zIndex: 400,
  });
  // tooltip.add(sidesThree);
  tooltip.add(textBox);
  return { tooltip, sidesThree };
};

const createTooltip1 = (areaWidth: number, text: string) => {
  const textBox = createText(0, 0, text);

  const t = new Text({
    fill: "rgb(50,205,121)",
    text: "Welcome to LeaferJS",
  });

  console.log("text", t.getComputedAttr("width"));
  console.log("textBox", textBox.getComputedAttr("width"));
  const groupTooltip = new Group({
    x: -1000,
    y: -1000,
    zIndex: -10,
  });
  groupTooltip.add(textBox);
  console.log("groupTooltip", groupTooltip);
  console.log("groupTooltip", groupTooltip.getComputedAttr("width"));

  // board.value.add(groupTooltip);

  // container.value.on(RenderEvent.AFTER, function () {
  //   const { width, height } = textBox;
  //   console.log(width, height);
  // });

  const paddding = 0;
  const tipHeight = 5;
  const tipWidth = 8;

  // const groupTooltip = new Group({
  //   x: areaWidth / 2 - tooltipWidth / 2,
  //   y: -tooltipHeight - tipHeight,
  //   zIndex: 200,
  // });
  // groupTooltip.add(tooltip);
  // return groupTooltip;
};

const getData = async () => {
  try {
    const data = await axios.get("/parse/dxf/2");
    entities.value = data.data.entities.filter(
      (entity: any) => entity.type === "INSERT" || entity.type === "LWPOLYLINE"
    );
    stockUseInfoList.value = data.data.stockUseInfoList;
    // console.log("entities", entities.value);
  } catch (error) {}
};

const plottingScale = ref(0);
const allMinX = ref(0);
const allMinY = ref(0);

const getMaxMin = (list: any) => {
  const xValues = list.flatMap((item: any) => item.vertices.map((i: any) => i.x));
  const yValues = list.flatMap((item: any) => item.vertices.map((i: any) => i.y));

  const maxX = Math.max(...xValues);
  const maxY = Math.max(...yValues);
  const minX = Math.min(...xValues);
  const minY = Math.min(...yValues);

  // console.log(maxX, maxY, minX, minY);
  const xDiff = maxX - minX;
  const yDiff = maxY - minY;
  const boardWidth = board.value.width; // board 的宽度
  const boardHeight = board.value.height; // board 的高度
  // console.log("boardWidth", boardWidth, boardHeight);

  const scaleX = boardWidth / (maxX - minX);
  const scaleY = boardHeight / (maxY - minY);
  // console.log("scaleX", scaleX, scaleY);
  allMinX.value = minX;
  allMinY.value = minY;
  plottingScale.value = Math.min(scaleX, scaleY);
};
const drawArea = () => {
  const list = entities.value.filter(
    (entity: any) =>
      entity.type === "LWPOLYLINE" && entity.layer.startsWith(KQ_KEY)
  );
  // console.log("drawArea", list);
  getMaxMin(list);
  list.forEach(({ layer, vertices }: any) => {
    const xValues = vertices.map((i: any) => i.x);
    const yValues = vertices.map((i: any) => i.y);

    const minX = Math.min(...xValues);
    const minY = Math.min(...yValues);
    const maxX = Math.max(...xValues);
    const maxY = Math.max(...yValues);
    // console.log("boardHeight", boardHeight.value);
    let group;
    if (layer === "KQ-Y-BC-9") {
      console.log("vertices", vertices);
      const points = vertices
        .flatMap((item: any) => [
          item.x - vertices[0].x,
          -item.y + vertices[0].y,
        ])
        .map((i: any) => i * plottingScale.value);
      console.log(points);
      const rect = new Polygon({
        points: points,
        fill: "rgb(50,205,121)",
      });
      group = new Group({
        x: (minX - allMinX.value) * plottingScale.value,
        y: boardHeight.value - (maxY - allMinY.value) * plottingScale.value,
        zIndex: 10,
      });
      group.add(rect);
    } else {
      group = createArea(
        (minX - allMinX.value) * plottingScale.value,
        boardHeight.value - (maxY - allMinY.value) * plottingScale.value,
        (maxX - minX) * plottingScale.value,
        (maxY - minY) * plottingScale.value,
        "#FFF"
      );
    }

    const hasShelfCode = layer.startsWith(KQ_HAS_KW_KEY); // KQ-N
    if (hasShelfCode) {
      const text = layer.slice(KQ_HAS_KW_KEY.length);
      const { tooltip, sidesThree } = createTooltip(
        (maxX - minX) * plottingScale.value,
        text
      );
      // console.log("tooltip", tooltip);
      // group.add(tooltip);

      container.value.on(RenderEvent.AFTER, function () {
        const { width, height } = tooltip.__world;
        console.log(width, height);
        console.log(-height * plottingScale.value);
        tooltip.x = ((maxX - minX) * plottingScale.value) / 2;
        tooltip.y = -height;
        // sidesThree.x = width / 2;
        // sidesThree.y = height / 2 + 5;
        // console.log(width, height);
        // console.log(tooltip.__world.width)
      });
      // container.value.on(RenderEvent.AFTER, function () {
      //   const { width, height } = textBox;
      //   textBox.x = ((maxX - minX) * plottingScale.value) / 2;
      //   textBox.y = -height / 2 - 5;
      //   console.log(width, height);
      //   const tooltip = createTooltip1(
      //     (maxX - minX) * plottingScale.value,
      //     width,
      //     height,
      //     "#166FF7"
      //   );
      //   group.add(tooltip);

      //   tooltip.x = ((maxX - minX) * plottingScale.value) / 2 - width / 2;
      // tooltip.y = -height / 2 - 5;
      // });
    } else {
      const text = createText(
        ((maxX - minX) * plottingScale.value) / 2,
        ((maxY - minY) * plottingScale.value) / 2
      );
      group.add(text);
    }
    board.value.add(group);
    // const points = vertices
    //   .map((item, index) => [
    //     (item.x - allMinX.value) * plottingScale.value,
    //     (item.y - allMinY.value) * plottingScale.value,
    //   ])
    //   .flat();
    // console.log(points);
    // console.log(minX, minY);
    // const polygon = new Polygon({
    //   x: (minX - allMinX.value) * plottingScale.value,
    //   y: (minY - allMinY.value) * plottingScale.value,
    //   points,
    //   // points: [0, 0, 100, 0, 100, 100, 200, 100, 200, 200, 0, 200], // [x,y, x,y ...]
    //   fill: "rgb(50,205,121)",
    //   stroke: "rgb(50,205,121)",
    //   strokeWidth: 2,
    //   cornerRadius: 4,
    // });
    // board.value.add(polygon);
  });
};

const drawItem = () => {
  const list = entities.value.filter(
    (entity: any) => entity.type === "INSERT" && entity.name.startsWith(KW_KEY)
  );

  const itemWidth = 1000 * plottingScale.value;
  console.log(list);
  list.forEach((item: any) => {
    const { position, name } = item;
    const shelfCode = name.slice(KW_KEY.length);

    const selectedItem: any = (stockUseInfoList.value || []).find(
      (i: any) => i.shelfCode === shelfCode
    );
    const id = selectedItem?.useStatus || 0;
    const color = labelList.find((item) => item.id === id)?.color || "#CFD1D3";
    const onlyBorder = id === 4;
    const { x, y } = position;
    const rect = createItem(
      (x - allMinX.value) * plottingScale.value - itemWidth / 2,
      boardHeight.value -
        (y - allMinY.value) * plottingScale.value -
        itemWidth / 2,
      itemWidth,
      itemWidth,
      color,
      onlyBorder
    );
    board.value.add(rect);
  });
  console.log("drawItem", list);
};
onMounted(async () => {
  await getData();
  initContainer();
  initBoard();
  drawArea();
  drawItem();
  // const g = createArea(100, 100, 100, 100, "#FFF");
  // const t = createText(50, 50);
  // g.add(t);
  // board.value.add(g);

  return;
  const group = createArea(0, 0, 100, 100, "#FFF");
  const rect = createItem(10, 10, 10, 10, "#32cd79");
  const rect2 = createItem(30, 30, 10, 10, "#32cd79");
  group.add(rect);
  group.add(rect2);
  board.value.add(group);

  const group2 = createArea(100, 100, 100, 100, "#FFF");
  const textBox = createText(50, 50);
  group2.add(textBox);
  board.value.add(group2);

  const polygon = new Polygon({
    x: 300,
    y: 300,
    points: [0, 0, 100, 0, 100, 100, 200, 100, 200, 200, 0, 200], // [x,y, x,y ...]
    fill: "rgb(50,205,121)",
    stroke: "rgb(50,205,121)",
    strokeWidth: 2,
    cornerRadius: 20,
  });

  board.value.add(polygon);
});

const resize = (w: number, h: number) => {
  // board.value.width = w;
  // board.value.height = h;
  board.value.destroy();
  console.log(board.value);
  containerRefClientHeight.value = h;
  containerRefClientWidth.value = w;
  initBoard();
  drawArea();
  drawItem();
};

defineExpose({
  container,
  board,
  handleReset,
  resize,
});
</script>
