<template>
  <div ref="containerRef"></div>
</template>

<script setup lang="ts">
import { Chart } from "@antv/g2";
import { useThrottleFn } from "@vueuse/core";
const data = [
  { year: "1991", value: 3 },
  { year: "1992", value: 4 },
  { year: "1993", value: 3.5 },
  { year: "1994", value: 5 },
  { year: "1995", value: 4.9 },
  { year: "1996", value: 6 },
  { year: "1997", value: 7 },
  { year: "1998", value: 9 },
  { year: "1999", value: 13 },
];

const containerRef = ref();
const chartRef = ref(null);

onMounted(async () => {
  renderChart();
});

const renderChart = () => {
  const chart = new Chart({
    container: containerRef.value,
    autoFit: true,
  });
  chart
    .data(data)
    .encode("x", "year")
    .encode("y", "value")
    .axis("x", {
      tickLineDash: [1, 1], // 把 tick 线设置为虚线
      tickFilter: (_, i) => i % 2 === 0, // 隐藏奇数索引 tick 线
      tickLength: 20, // 设置 tick 线长度
      tickLineWidth: 10, // 设置 tick 线宽度
      tickStroke: "red", // 设置 tick 线颜色
      tickStrokeOpacity: 0.5, // 设置 tick 线透明度

      labelAutoHide: true, // 设置是否自动隐藏刻度标签
      labelFontSize: 18, // 设置 x 轴刻度标签字体大小
    })
    .scale("x", {
      range: [0, 1],
    })
    .scale("y", {
      domainMin: 0,
      nice: true,
    })
    .line()
    .label({
      text: "value",
      style: {
        dx: -10,
        dy: -12,
      },
    });
  chart.point().style("fill", "white").tooltip(false);
  chart.render();
  chartRef.value = chart;
};
</script>
