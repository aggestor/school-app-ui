export default [
    {
        path: '/admin',
        alias:"/ui/admin",
        name: 'admin-dashboard',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/dashboard.vue")
    },
    {
        path: '/admin/levels/create',
        alias:"/ui/admin/levels/create",
        name: 'create-level',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/levels/create.vue")
    },
    {
        path: '/admin/levels',
        alias:"/ui/admin/levels",
        name: 'list-level',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/levels/list.vue")
    },
    {
        path: '/admin/courses/create',
        alias:"/ui/admin/courses/create",
        name: 'create-course',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/courses/create.vue")
    },
    {
        path: '/admin/courses',
        alias:"/ui/admin/courses",
        name: 'list-course',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/courses/list.vue")
    },
]