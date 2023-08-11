export default [
    {
        path: '/owner/profile',
        name: 'owner-profile',
        meta : {layout : 'owner'},
        component: async ()=> await import("@/pages/owner/profile.vue")
    },
    {
        path: '/owner/update',
        name: 'owner-update',
        meta : {layout : 'owner'},
        component: async ()=> await import("@/pages/owner/update-profile.vue")
    },
    {
        path: '/owner/update/password',
        name: 'owner-update-password',
        meta : {layout : 'owner'},
        component: async ()=> await import("@/pages/owner/update-password.vue")
    },
    {
        path: '/owner/dashboard',
        name: 'owner-dashboard',
        meta : {layout : 'owner'},
        component: async ()=> await import("@/pages/owner/dashboard.vue")
    },
    {
        path: '/owner/shop',
        name: 'owner-shop',
        meta : {layout : 'owner'},
        component: async ()=> await import("@/pages/owner/shop.vue")
    },
    {
        path: '/owner/managers',
        name: 'owner-managers',
        meta : {layout : 'owner'},
        component: async ()=> await import("@/pages/owner/managers.vue")
    },
    {
        path: '/owner/branches',
        name: 'owner-branches',
        meta : {layout : 'owner'},
        component: async ()=> await import("@/pages/owner/branches.vue")
    },
    {
        path: '/owner/managers/:id',
        name: 'owner-manager-unique',
        meta : {layout : 'owner'},
        component: async ()=> await import("@/pages/owner/unique-manager.vue")
    },
    {
        path: '/owner/branches/:id',
        name: 'owner-branch-unique',
        meta : {layout : 'owner'},
        component: async ()=> await import("@/pages/owner/unique-branch.vue")
    },
    {
        path: '/owner/shops/:id/branches/create',
        alias:'/owner/shops/branches/create',
        name: 'owner-branch-create',
        meta : {layout : 'owner'},
        component: async ()=> await import("@/pages/owner/create-branch.vue")
    },
    {
        path: '/owner/branches/:id/:name/assign-manager',
        name: 'assign-branch-manager',
        meta : {layout : 'owner'},
        component: async ()=> await import("@/pages/owner/assign-manager.vue")
    },
    {
        path: '/owner/products/:id',
        alias: '/owner/products/:name/:id',
        name: 'owner-unique-unique',
        meta : {layout : 'owner'},
        component: async ()=> await import("@/pages/owner/unique-product.vue")
    },
    {
        path: '/owner/shop/:id/products/create',
        alias:"/owner/products/create",
        name: 'owner-new-product',
        meta : {layout : 'owner'},
        component: async ()=> await import("@/pages/owner/create-product.vue")
    },
    {
        path: '/owner/shop/:id/update',
        alias:"/owner/shop/update",
        name: 'owner-update-shop',
        meta : {layout : 'owner'},
        component: async ()=> await import("@/pages/owner/update-shop.vue")
    },
    {
        path: '/owner/products',
        name: 'owner-products',
        meta : {layout : 'owner'},
        component: async ()=> await import("@/pages/owner/products.vue")
    },
    {
        path: '/owner/sliders',
        name: 'owner-sliders',
        meta : {layout : 'owner'},
        component: async ()=> await import("@/pages/owner/sliders.vue")
    },
]