
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
    path: '/githubHoverNew',
    name: 'GithubHoverNew',
    component: () => import('@/pages/GithubHoverNew.vue')
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
}, {
    path: '/svgStroke',
    name: 'SvgStroke',
    component: () => import('@/pages/SvgStroke.vue')
}, {
    path: '/tabs',
    name: 'Tabs',
    component: () => import('@/pages/Tabs.vue')
}, {
    path: '/vresize',
    name: 'VResize',
    component: () => import('@/pages/VResize.vue')
}, {
    path: '/textSlowShow',
    name: 'TextSlowShow',
    component: () => import('@/pages/TextSlowShow.vue')
}, {
    path: '/nineBoxAnimation',
    name: 'NineBoxAnimation',
    component: () => import('@/pages/NineBoxAnimation.vue')
}, {
    path: '/street',
    name: 'Street',
    component: () => import('@/pages/Street.vue')
}, {
    path: '/winSea-1',
    name: 'WinSea-1',
    component: () => import('@/pages/WinSea-1.vue')
}, {
    path: '/antVLoading',
    name: 'AntVLoading',
    component: () => import('@/pages/AntVLoading.vue')
}, {
    path: '/roughNotation',
    name: 'RoughNotation',
    component: () => import('@/pages/RoughNotation.vue')
}, {
    path: '/cursorSvg',
    name: 'CursorSvg',
    component: () => import('@/pages/CursorSvg.vue')
}, {
    path: '/rotateImg',
    name: 'RotateImg',
    component: () => import('@/pages/RotateImg.vue')
}, {
    path: '/textStroke',
    name: 'TextStroke',
    component: () => import('@/pages/TextStroke.vue')
}, {
    path: '/rememberEditTable',
    name: 'RememberEditTable',
    component: () => import('@/pages/RememberEditTable.vue')
}, {
    path: '/oneImageToNine',
    name: 'OneImageToNine',
    component: () => import('@/pages/OneImageToNine.vue')
}, {
    path: '/backdropFilter',
    name: 'BackdropFilter',
    component: () => import('@/pages/BackdropFilter.vue')
}, {
    path: '/colorthief',
    name: 'Colorthief',
    component: () => import('@/pages/Colorthief.vue')
}, {
    path: '/dragBoard',
    name: 'DragBoard',
    component: () => import('@/pages/DragBoard/DragBoard.vue')
}, {
    path: '/typedJS',
    name: 'TypedJS',
    component: () => import('@/pages/TypedJS.vue')
}, {
    path:'/objectToJSON',
    name:'ObjectToJSON',
    component:()=>import('@/pages/ObjectToJSON.vue')
},{
    path:'/antVG2',
    name:'AntVG2',
    component:()=>import('@/pages/AntVG2/Index.vue')
},
// {
//     path:'/three',
//     name:'Three',
//     component:()=>import('@/pages/Three/Index.vue')
// },{
//     path:'/leaferUi',
//     name:'LeaferUi',
//     component:()=>import('@/pages/LeaferUi/Index.vue')
// }
{
    path:'/lotteryTicket',
    name:'LotteryTicket',
    component:()=>import('@/pages/LotteryTicket.vue')  
}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

//导出router
export default router
