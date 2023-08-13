export default [
    {
        path: '/login',
        name: 'new-login',
        meta : {layout : 'blank'},
        component:async ()=> await import("../pages/v2/login.vue")
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