<template>
    <div class="tab-list">
        <div v-for="tab in tabList" :key="tab.id" class="tab-item"
            :class="activeTab === tab.id ? 'tab-selected' : 'not-selected'" @click="onTab(tab.id)">
            <!-- <image :src="tab.icon" class="tab-icon" /> -->
            <div>{{ tab.label }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const tabList = ref([
    { id: 1, label: "Tab1", icon: "" },
    { id: 2, label: "Tab2", icon: "" },
    { id: 3, label: "Tab3", icon: "" },
    { id: 4, label: "Tab4", icon: "" },
    { id: 5, label: "Tab5", icon: "" },
]);
const activeTab = ref(1);
const onTab = (id: number) => {
    activeTab.value = id;
};
</script>

<style scoped lang="scss">
// scss
$tab-height: 52px;
$active-color: #ffffff;
$default-color: #e2e8f8;
$primary-color: #3369ff;

.tab-list {
    display: flex;
    position: relative;
    z-index: 2;
    border-radius: 12px 12px 0 0;
    background-color: $default-color;
    overflow: hidden; // 重点

    .tab-item {
        flex: 1;
        height: $tab-height;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        // opacity: 0.65;   // 暂时删除，不选中样式需要重新编写
        color: $primary-color;
        font-weight: 600;
        position: relative;
        cursor: pointer;
    }

    .tab-icon {
        width: 17px;
        height: 17px;
        margin-right: 4px;
        margin-top: 1px;
    }

    .tab-selected {
        opacity: 1;
        background: #ffffff;
        border-radius: 12px 12px 0 0;
        box-shadow: 24px 40px 0 $active-color, -24px 40px 0 0 $active-color; // 重点
        transition: all 0.1s ease-in-out;
    }

    .tab-selected::before {
        content: "";
        position: absolute;
        left: -6px;
        bottom: 0;
        width: 12px;
        height: $tab-height;
        border-top-left-radius: 12px;
        background-color: $active-color;
        transform: skewX(-15deg); // 重点
    }

    .tab-selected::after {
        content: "";
        position: absolute;
        right: -6px;
        bottom: 0;
        width: 12px;
        height: $tab-height;
        border-top-right-radius: 12px;
        background-color: $active-color;
        transform: skewX(15deg); // 重点
    }

    .not-selected::before {
        content: "";
        position: absolute;
        left: 6px;
        bottom: 0;
        width: 12px;
        height: $tab-height;
        background: $default-color;
        border-bottom-left-radius: 12px;
        transform: skewX(15deg); // 重点
    }

    .not-selected::after {
        content: "";
        z-index: 1;
        position: absolute;
        right: 6px;
        bottom: 0;
        width: 12px;
        height: $tab-height;
        background: $default-color;
        border-bottom-right-radius: 12px;
        transform: skewX(-15deg); // 重点
    }
}
</style>