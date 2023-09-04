import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import 'uno.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import "nprogress/nprogress.css"; // 进度条组件
import Resize from './directive/resize';

const store = createPinia()
const app = createApp(App)

store.use(piniaPluginPersistedstate)
app.directive('resize', Resize)

app.use(router)
app.use(store)
app.mount('#app')
