import "nprogress/nprogress.css"; // 进度条组件
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import 'uno.css';
import { createApp } from 'vue';
import GridLayout from 'vue3-drr-grid-layout';
import 'vue3-drr-grid-layout/dist/style.css';
import App from './App.vue';
import Resize from './directive/resize';
import router from './router';
const store = createPinia()
const app = createApp(App)

store.use(piniaPluginPersistedstate)
app.directive('resize', Resize)

app.use(GridLayout)
app.use(router)
app.use(store)
app.mount('#app')
