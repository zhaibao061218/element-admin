import Layout from '@/layout'

export default [
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            component: () =>
                import('@/views/user/dashboard/index'),
            name: 'Dashboard',
            meta: { title: '数据总览', icon: 'dashboard', affix: true }
        }]
    },
    {
        path: '/product',
        component: Layout,
        meta: { title: '产品推广', icon: 'el-icon-goods' },
        children: [{
            path: 'index',
            component: () =>
                import('@/views/user/product/index'),
            name: 'Product',
            meta: { title: '推广产品', affix: true }
        }, {
            path: '/productData',
            component: () =>
                import('@/views/user/product/component/productData'),
            name: 'Product1',
            meta: { title: '产品数据', affix: true }
        }]
    },
    {
        path: '/order',
        component: Layout,
        redirect: '/order/index',
        children: [{
            path: 'index',
            component: () =>
                import('@/views/user/order/index'),
            name: 'Order',
            meta: { title: '购买订单', icon: 'el-icon-s-order', noCache: true }
        }]
    },
    {
        path: '/payment',
        component: Layout,
        redirect: '/payment/index',
        meta: { title: '资金管理', icon: 'money', noCache: true },
        children: [{
            path: 'index',
            component: () =>
                import('@/views/user/payment/index'),
            name: 'Payment',
            meta: { title: '资金管理', icon: '', noCache: true },

        },
        {
            path: 'moneyFlows',
            component: () =>
                import('@/views/user/payment/moneyFlows'),
            name: 'Payment2',
            meta: { title: '资金流水', icon: '', noCache: true },

        }
        ]
    },
    {
        path: '/payment/',
        component: Layout,
        redirect: '/payment/rechargeUser/index',
        children: [{
            path: 'rechargeUser',
            hidden: true,
            component: () =>
                import('@/views/user/payment/rechargeUser'),
            name: 'rechargeUser',
            meta: { title: '账户充值', noCache: true }

        }],
        "hide-xs": true //手机端隐藏
    },
    {
        path: '/invite',
        component: Layout,
        redirect: '/invite/index',
        children: [{
            path: 'index',
            component: () =>
                import('@/views/user/invite/index'),
            name: 'Invite',
            meta: { title: '邀请管理', icon: 'invite', noCache: true }
        }],
        "hide-xs": true //手机端隐藏
    },

    {
        path: '/profile',
        component: Layout,
        redirect: '/profile/index',
        // hidden: true,
        children: [{
            path: 'index',
            component: () =>
                import('@/views/user/profile/index'),
            name: 'Profile',
            meta: { title: '个人中心', icon: 'el-icon-user', noCache: true }
        }],
        "hide-xs": true //手机端隐藏
    },
    {
        path: '/return',
        component: Layout,
        redirect: '/return/index',
        children: [{
            path: 'index',
            component: () =>
                import('@/views/user/return/index'),
            name: 'Return',
            meta: { title: '退货管理', icon: 'returns', noCache: true }
        }],
        "hide-xs": true //手机端隐藏
    },
    {
        path: '/renew',
        component: Layout,
        redirect: '/renew/index',
        children: [{
            path: 'index',
            component: () =>
                import('@/views/user/renew/index'),
            name: 'Renew',
            meta: { title: '套餐续费', icon: 'renew', noCache: true }
        }],
        "hide-xs": true //手机端隐藏
    },
    {
        path: 'external-link',
        component: Layout,
        children: [{
            path: 'https://help.pingjiae.com/',
            meta: { title: '帮助中心', icon: 'question' }
        }],
        "hide-xs": true //手机端隐藏
    },
]