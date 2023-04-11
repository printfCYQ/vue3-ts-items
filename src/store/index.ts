import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => {
    return {
      count: 0,
      sideMenuShow: true,
      sideMenuWidth: 30,
      perSideMenuWidth: 30,
    };
  },
  persist: true, // 持久化
  actions: {
    addCount() {
      this.count++;
    },
    toggleSideMenuShow() {
      if (this.sideMenuShow) {
        this.perSideMenuWidth = this.sideMenuWidth;
        this.setSideMenuWidth(0);
      } else {
        this.setSideMenuWidth(this.perSideMenuWidth);
      }
      this.sideMenuShow = !this.sideMenuShow;
    },
    setSideMenuWidth(val: number) {
      this.sideMenuWidth = val;
    },
  },
});
