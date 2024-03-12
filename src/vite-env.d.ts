/// <reference types="vite/client" />
declare let AMap: any;
declare let WeixinJSBridge: any;
declare module 'colorthief'
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
