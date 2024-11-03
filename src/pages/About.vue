<template>
  <div>about 购物车</div>
</template>

<script lang="ts">
import userApi from "@/api/user/index";
export default defineComponent({
  name: "About",
  components: {},
  setup() {
    onMounted(async () => {
      const data = await userApi.me();
      console.log(data);
    });
    return {};
  },
});
</script>
