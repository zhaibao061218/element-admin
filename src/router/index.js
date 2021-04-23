/* Layout */
import Layout from '@/layout'


import Vue from 'vue'
import Router from 'vue-router'

import commonRoutes from './commonRoutes'  // 商家用户后台路由

//import userRoutes from './userRoutes'  // 商家用户后台路由
//import adminRoutes from './adminRoutes' // 公司管理员后台路由

Vue.use(Router)

export const constantRoutes = commonRoutes;  //userRoutes.concat(adminRoutes,constantRoutes)

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
    { path: '*', redirect: '/404', hidden: true }
];

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router


