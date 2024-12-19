<template>
  <div class="container mx-auto p-4 rounded-md shadow-md">
    <!-- 页面标题 -->
    <h1 class="text-2xl font-bold mb-4">Variable Name Conversion</h1>
    <div class="input-group mb-4">
      <!-- 输入类型选择 -->
      <h2 for="input-type" class="block text-gray-700 font-medium mb-2">
        Input Type:
      </h2>
      <div class="flex flex-wrap justify-center">
        <div
          v-for="item in inputTypes"
          :key="item.label"
          class="p-4 m-2 rounded-lg shadow-md cursor-pointer"
          :class="[
            isSelected(item.label)
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-600',
          ]"
          @click="selectInputType(item)"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
    <div class="input-group mb-4">
      <!-- 输入值字段 -->
      <h2 for="input-value" class="block text-gray-700 font-medium mb-2">
        Input Value:
      </h2>
      <input
        id="input-value"
        v-model="inputValue"
        type="text"
        class="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 box-border"
      />
    </div>
    <!-- 转换按钮 -->
    <button
      @click="conversion()"
      class="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
    >
      Convert
    </button>
    <div class="output-group mt-4">
      <!-- 输出部分 -->
      <h2 class="text-xl font-bold mb-2">Output:</h2>
      <div v-for="item in afterValues" :key="item" class="mb-2">
        {{ item }}
        <button
          @click="copyItem(item)"
          class="bg-blue-500 text-white rounded-md px-2 py-1 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          Copy
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 导入必要的工具和类型
import inputTypes, { InputTypeItem } from "@/utils/variableNameConversion";
import { useClipboard } from "@vueuse/core";
import { ref } from "vue";

// 初始化剪贴板功能
const { copy } = useClipboard();

// 响应式状态变量
const selectedInputType = ref("smallHump");
const inputValue = ref("helloWorld");
const afterValues = ref<string[]>([]);

// 检查输入类型是否被选中
const isSelected = (label: string) => {
  return label === selectedInputType.value;
};

// 选择输入类型并设置示例值
const selectInputType = (item: InputTypeItem) => {
  selectedInputType.value = item.label;
  inputValue.value = item.example;
  conversion(); // 当选择新类型时自动转换
};

// 根据选定的输入类型执行转换
const conversion = () => {
  const item = inputTypes.find(
    (item) => item.label === selectedInputType.value
  );
  // 验证输入格式
  if (!item?.regex.test(inputValue.value)) return alert("请输入正确的格式");
  // 将输入值通过转换函数映射
  afterValues.value = item.fns.map((fn) => fn(inputValue.value));
};

// 初始转换调用
conversion();

// 将给定文本复制到剪贴板
const copyItem = (text: string) => {
  copy(text);
};
</script>
