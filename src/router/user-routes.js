export default [
     {
        path: '/profile',
        name: 'user-profile',
        meta : {layout : 'normal'},
        component:async ()=> await import("../pages/Profile.vue")
    },
     {
        path: '/dashboard',
        name: 'user-dashboard',
        meta : {layout : 'normal'},
        component:async ()=> await import("../pages/Dashboard.vue")
    },
     {
        path: '/register',
        name: 'user-register',
        meta : {layout : 'default'},
        component:async ()=> await import("../pages/Register.vue")
    },
     {
        path: '/reset-password',
        alias:'/auth/reset-password',
        name: 'reset-password',
        meta : {layout : 'default'},
        component:async ()=> await import("../pages/v2/reset-password.vue")
    },
     {
        path: '/new-password/:uuid/:id/:email/:token',
        alias: '/auth/new-password/:uuid/:id/:email/:token',
        name: 'set-new-password',
        meta : {layout : 'default'},
        component:async ()=> await import("../pages/v2/set-new-password.vue")
    },
    {
        path: '/user/update',
        name: 'user-update',
        meta : {layout : 'normal'},
        component:async ()=> await import("../pages/UpdateUser.vue")
    },
]