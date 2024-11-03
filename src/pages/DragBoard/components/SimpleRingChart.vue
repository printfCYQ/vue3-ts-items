<template>
  <div ref="containerRef"></div>
</template>
  
<script setup lang="ts">
import { Chart } from "@antv/g2";
import { useThrottleFn } from "@vueuse/core";
const containerRef = ref();
const data = [
  { item: "事例一", count: 40, percent: 0.4 },
  { item: "事例二", count: 21, percent: 0.21 },
  { item: "事例三", count: 17, percent: 0.17 },
  { item: "事例四", count: 13, percent: 0.13 },
  { item: "事例五", count: 9, percent: 0.09 },
];

const chart = ref<any>();

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const { target, contentRect } = entry;
    if (target === containerRef.value) {
      reload();
    }
  }
});

onMounted(async () => {
  resizeObserver.observe(containerRef.value);
  renderChart();
});

onUnmounted(() => {
  resizeObserver.disconnect();
});

const renderChart = () => {
  const chartInstance = new Chart({
    container: containerRef.value,
    autoFit: true,
  });

  chartInstance.coordinate({
    type: "theta",
    outerRadius: 0.8,
    innerRadius: 0.5,
  });

  chartInstance
    .interval()
    .data(data)
    .transform({ type: "stackY" })
    .encode("y", "percent")
    .encode("color", "item")
    .legend("color", {
      position: "bottom",
      layout: { justifyContent: "center" },
    })
    .label({
      position: "outside",
      text: (data: any) => `${data.item}: ${data.percent * 100}%`,
    })
    .tooltip((data: any) => ({
      name: data.item,
      value: `${data.percent * 100}%`,
    }));

  chartInstance
    .text()
    .style("text", "主机")
    // Relative position
    .style("x", "50%")
    .style("y", "50%")
    .style("dy", -25)
    .style("fontSize", 34)
    .style("fill", "#8c8c8c")
    .style("textAlign", "center");

  chartInstance
    .text()
    .style("text", "200")
    // Relative position
    .style("x", "50%")
    .style("y", "50%")
    .style("dx", -25)
    .style("dy", 25)
    .style("fontSize", 44)
    .style("fill", "#8c8c8c")
    .style("textAlign", "center");

  chartInstance
    .text()
    .style("text", "台")
    // Relative position
    .style("x", "50%")
    .style("y", "50%")
    .style("dx", 35)
    .style("dy", 25)
    .style("fontSize", 34)
    .style("fill", "#8c8c8c")
    .style("textAlign", "center");

  chartInstance.render();
  chartInstance.forceFit();
  chart.value = chartInstance;
};

const reload = useThrottleFn(() => {
  if (chart.value) {
    chart.value.destroy();
    chart.value = null;
    renderChart();
  }
}, 200);
</script>