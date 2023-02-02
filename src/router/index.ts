
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
}]

const router = createRouter({
    history: createWebHistory(),
    routes
})

//导出router
export default router
