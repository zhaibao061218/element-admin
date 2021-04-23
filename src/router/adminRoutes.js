import Layout from '@/layout'

//公司管理员后台路由
export default [{
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
        path: 'dashboard',
        component: () =>
            import('@/views/admin/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '数据总览', icon: 'dashboard', affix: true }
    }]
},
{
    path: '/academy',
    component: Layout,
    redirect: '/academy/index',
    meta: { title: '学院页管理', icon: 'academy', noCache: true },
    children: [{
        path: 'index',
        component: () =>
            import('@/views/admin/academy/index'),
        name: 'academy-index',
        meta: { title: '学院页设置', icon: '', noCache: true },
    },
    {
        path: 'icon/edit',
        component: () =>
            import('@/views/admin/academy/icon/edit'),
        name: 'academy-icon-edit',
        meta: { title: '学院页设置', icon: '', activeMenu: '/academy/index', noCache: true },
        hidden: true
    },
    {
        path: 'banner/edit',
        component: () =>
            import('@/views/admin/academy/banner/edit'),
        name: 'academy-banner-edit',
        meta: { title: '学院页banner编辑', icon: '', activeMenu: '/academy/index', noCache: true },
        hidden: true
    },
    {
        path: 'content/edit',
        component: () =>
            import('@/views/admin/academy/content/edit'),
        name: 'academy-content-edit',
        meta: { title: '学院页内容编辑', icon: '', activeMenu: '/academy/index', noCache: true },
        hidden: true
    },
    {
        path: 'brandstory/edit',
        component: () =>
            import('@/views/admin/academy/brandStory/edit'),
        name: 'academy-brandstory',
        meta: { title: 'Rebatest brand story', icon: '', activeMenu: '/academy/index', noCache: true },
        hidden: true
    },
    {
        path: 'shareearn/edit',
        component: () =>
            import('@/views/admin/academy/shareEarn/edit'),
        name: 'academy-shareEarn',
        meta: { title: 'Share & Earn', icon: '', activeMenu: '/academy/index', noCache: true },
        hidden: true
    },
    {
        path: 'course/list',
        component: () =>
            import('@/views/admin/academy/course/list'),
        name: 'academy-course-list',
        meta: { title: '课程管理', icon: '', noCache: true },
    },
    {
        path: 'course/edit/:id(\\d+)',
        component: () =>
            import('@/views/admin/academy/course/edit'),
        name: 'academy-course-edit',
        meta: { title: '课程编辑', icon: '', activeMenu: '/academy/course/list', noCache: true },
        hidden: true
    },
    {
        path: 'course/create/',
        component: () =>
            import('@/views/admin/academy/course/create'),
        name: 'academy-course-create',
        meta: { title: '课程编辑', icon: '', activeMenu: '/academy/course/list', noCache: true },
        hidden: true
    },
    {
        path: 'statistics',
        component: () =>
            import('@/views/admin/academy/statistics'),
        name: 'academy-statistics',
        meta: { title: '数据统计', icon: '', noCache: true },

    }
    ]
},

{
    path: '/makeMoney',
    component: Layout,
    redirect: '/makeMoney/index',
    meta: { title: '兼职活动', icon: 'makeMoney' },
    children: [{
        path: 'index',
        component: () =>
            import('@/views/admin/makeMoney/index'),
        name: 'makeMoney-index',
        meta: { title: '用户统计' },
    },
    {
        path: 'invite',
        component: () =>
            import('@/views/admin/makeMoney/invite'),
        name: 'makeMoney-invite',
        meta: { title: '邀请用户统计' },
    }, {
        path: 'funds',
        component: () =>
            import('@/views/admin/makeMoney/funds'),
        name: 'makeMoney-funds',
        meta: { title: '用户资金流水' },
    }],
    "hide-xs": true
},

{
    path: '/blog',
    component: Layout,
    redirect: '/blog/index',
    meta: { title: '博客管理', icon: 'blog' },
    children: [
        {
            path: 'index',
            name: 'blogIndex',
            component: () => import('@/views/admin/blog/index.vue'),
            meta: { title: '博客列表', icon: '' }
        },
        {
            path: 'edit/:id(\\d+)',
            name: 'blogEdit',
            component: () => import('@/views/admin/blog/edit.vue'),
            meta: { title: '编辑博客', icon: '', activeMenu: '/blog/index' },
            hidden: true
        },
        {
            path: 'review/:id(\\d+)',
            name: 'reviewEdit',
            component: () => import('@/views/admin/blog/review.vue'),
            meta: { title: '编辑评论', icon: '', activeMenu: '/blog/comment' },
            hidden: true
        },
        {
            path: 'comment',
            name: 'blogComment',
            component: () => import('@/views/admin/blog/comment.vue'),
            meta: { title: '评论管理', icon: '' },
        }]
},

{
    path: '/overseas-partner',
    component: Layout,
    redirect: '/overseas-partner/index',
    meta: { title: '海外合伙人', icon: 'partner', noCache: true },
    hidden: true,
    children: [{
        path: 'index',
        component: () =>
            import('@/views/admin/overseas-partner/index'),
        name: 'overseas-partner',
        meta: { title: '合伙人数据统计', icon: '', noCache: true },

    },
    {
        path: 'partner-management',
        component: () =>
            import('@/views/admin/overseas-partner/partner-management'),
        name: 'partner-management',
        meta: { title: '合伙人管理', icon: '', noCache: true },

    },
    {
        path: 'blacklist',
        component: () =>
            import('@/views/admin/overseas-partner/blacklist'),
        name: 'blacklist',
        meta: { title: '黑名单管理', icon: '', noCache: true },

    },
    {
        path: 'financial-management',
        component: () =>
            import('@/views/admin/overseas-partner/financial-management'),
        name: 'financial-management',
        meta: { title: '财务管理', icon: '', noCache: true },

    },
    {
        path: 'financial-overview',
        component: () =>
            import('@/views/admin/overseas-partner/financial-overview'),
        name: 'financial-control',
        meta: { title: '财务数据统计', icon: '', noCache: true },

    },
    {
        path: 'help-list',
        component: () =>
            import('@/views/admin/overseas-partner/helpList'),
        name: 'helpList',
        meta: { title: '帮助管理', icon: '', noCache: true },

    },
    {
        path: 'addHelp',
        component: () =>
            import('@/views/admin/overseas-partner/addHelp'),
        name: 'addHelp',
        meta: { title: '新增帮助', icon: '', noCache: true },

    }
    ],
    "hide-xs": true
},
{
    path: '/financial-control',
    component: Layout,
    redirect: '/financial-control/index',
    meta: { title: '财务管理', icon: 'financial', noCache: true },
    hidden: true,
    children: [
        {
            path: 'invoices',
            redirect: '/invoices/documentType',
            meta: { title: '单据', icon: '', noCache: true },
            component: () =>
                import('@/views/admin/financial-control/invoices/index'), // Parent router-view

            children: [{
                path: 'documentType',
                component: () =>
                    import('@/views/admin/financial-control/invoices/documentType'),
                name: 'documentType',
                meta: { title: '单据录入', icon: '', noCache: true },
            }, {
                path: 'invoiceAuditing',
                component: () =>
                    import('@/views/admin/financial-control/invoices/invoiceAuditing'),
                name: 'invoiceAuditing',
                meta: { title: '审核单据', icon: '', noCache: true },
            }]
        }
    ],
    "hide-xs": true
}
]