<template>
  <div>
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <td>{{ item.id }}</td>
          <td>
            <input type="text" v-model="item.name" placeholder="Enter Name" />
          </td>
        </tr>
      </tbody>
    </table>

    <button @click="prevPage" :disabled="isFirstPage">上一页</button>
    当前：{{ currentPage }}页
    <button @click="nextPage">下一页</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

interface Item {
  id: number;
  name: string;
}

const data = ref<Item[]>([]);
const rememberMap = ref(new Map<number, Item>());
const page = reactive({
  pageNo: 1,
  pageSize: 5,
});

const isFirstPage = computed(() => page.pageNo === 1);
const currentPage = computed(() => page.pageNo);

const loadData = async () => {
  data.value = [...Array(page.pageSize).keys()].map((_, index) => ({
    id: page.pageSize * (page.pageNo - 1) + index + 1,
    name: "",
  }));
};

const setData = async () => {
  data.value
    .filter((item) => item.name)
    .forEach((i) => {
      rememberMap.value.set(i.id, i);
    });
};

const getData = async () => {
  data.value = data.value.map((item) => rememberMap.value.get(item.id) || item);
};

const prevPage = async () => {
  if (page.pageNo > 1) {
    page.pageNo--;
    await setPageData();
  }
};

const nextPage = async () => {
  page.pageNo++;
  await setPageData();
};

const setPageData = async () => {
  await setData();
  await loadData();
  await getData();
};

onMounted(() => {
  loadData();
});
</script>
