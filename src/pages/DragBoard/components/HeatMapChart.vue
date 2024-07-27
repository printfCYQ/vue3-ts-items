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

const chart = ref(null);

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

  chartInstance
    .cell()
    .data({
      type: "fetch",
      value: "https://assets.antv.antgroup.com/g2/seattle-weather.json",
    })
    .transform({ type: "group", color: "max" })
    .encode("x", (d) => new Date(d.date).getUTCDate())
    .encode("y", (d) => new Date(d.date).getUTCMonth())
    .encode("color", "temp_max")
    .style("inset", 0.5)
    .scale("color", { palette: "gnBu" })
    .animate("enter", { type: "fadeIn" });

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