
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [{
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue')
}, {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/About.vue')
}, {
    path: '/newYearCountDown',
    name: 'NewYearCountDown',
    component: () => import('@/pages/NewYearCountDown.vue')
}, {
    path: '/moonVoice',
    name: 'MoonVoice',
    component: () => import('@/pages/MoonVoice.vue')
}, {
    path: '/puzzle',
    name: 'Puzzle',
    component: () => import('@/pages/Puzzle.vue')
}, {
    path: '/toDoList',
    name: 'ToDoList',
    component: () => import('@/pages/ToDoList/ToDoList.vue')
}, {
    path: '/githubHover',
    name: 'GithubHover',
    component: () => import('@/pages/GithubHover.vue')
}, {
    path: '/gaodeMap',
    name: 'GaodeMap',
    component: () => import('@/pages/GaodeMap.vue')
}, {
    path: '/backTop',
    name: 'BackTop',
    component: () => import('@/pages/BackTop.vue')
}, {
    path: '/splitpane',
    name: 'SplitPane',
    component: () => import('@/pages/SplitPane.vue')
}, {
    path: '/shoppingCart',
    name: 'ShoppingCart',
    component: () => import('@/pages/ShoppingCart/ShoppingCart.vue')
}, {
    path: '/toggleSideMenu',
    name: 'ToggleSideMenu',
    component: () => import('@/pages/ToggleSideMenu.vue')
}, {
    path: '/fourFundamentalRules',
    name: 'FourFundamentalRules',
    component: () => import('@/pages/FourFundamentalRules.vue')
}, {
    path: '/deferPage',
    name: 'DeferPage',
    component: () => import('@/pages/DeferPage/DeferPage.vue')
}]

const router = createRouter({
    history: createWebHistory(),
    routes
})

//导出router
export default router
