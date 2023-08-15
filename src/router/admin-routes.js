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
    {
        path: '/admin/options/create',
        alias:"/ui/admin/options/create",
        name: 'create-option',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/options/create.vue")
    },
    {
        path: '/admin/options',
        alias:"/ui/admin/options",
        name: 'list-option',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/options/list.vue")
    },
    {
        path: '/admin/years/create',
        alias:"/ui/admin/years/create",
        name: 'create-year',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/years/create.vue")
    },
    {
        path: '/admin/years',
        alias:"/ui/admin/years",
        name: 'list-year',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/years/list.vue")
    },
    {
        path: '/admin/classes/create',
        alias:"/ui/admin/classes/create",
        name: 'create-class',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/classes/create.vue")
    },
    {
        path: '/admin/classes',
        alias:"/ui/admin/classes",
        name: 'list-class',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/classes/list.vue")
    },
]