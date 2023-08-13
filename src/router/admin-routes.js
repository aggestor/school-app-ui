export default [
    {
        path: '/admin',
        alias:"/ui/admin",
        name: 'admin-dashboard',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/dashboard.vue")
    },
    {
        path: '/reset-password',
        alias:'/auth/reset-password',
        name: 'reset-password',
        meta : {layout : 'blank'},
        component:async ()=> await import("../pages/v2/reset-password.vue")
    },
     {
        path: '/new-password/:uuid/:id/:email/:token',
        alias: '/auth/new-password/:uuid/:id/:email/:token',
        name: 'set-new-password',
        meta : {layout : 'blank'},
        component:async ()=> await import("../pages/v2/set-new-password.vue")
    },
]