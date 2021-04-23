import Layout from '@/layout'

//公共路由
export default [{
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
        path: '/redirect/:path(.*)',
        component: () =>
            import('@/views/constant/redirect/index')
    }]
},
{
    path: '/login',
    component: () =>
        import('@/views/constant/login/index'),
    hidden: true
},
{
    path: '/auth-redirect',
    component: () =>
        import('@/views/constant/login/auth-redirect'),
    hidden: true
},
{
    path: '/404',
    component: () =>
        import('@/views/constant/error-page/404'),
    hidden: true
},
{
    path: '/401',
    component: () =>
        import('@/views/constant/error-page/401'),
    hidden: true
},
{
    path: '/icon',
    component: Layout,
    hidden: true,
    children: [{
        path: 'index',
        component: () =>
            import('@/views/constant/icons/index'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true }
    }]
},
//{ path: '*', redirect: '/404', hidden: true }
]