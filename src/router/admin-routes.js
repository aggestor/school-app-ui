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
        path: '/admin/levels/:id/update',
        alias:"/ui/admin/levels/:id/update",
        name: 'update-level',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/levels/update.vue")
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
        component:async ()=> await import("../pages/admin/courses/update.vue")
    },
    {
        path: '/admin/courses/:id/update',
        alias:"/ui/admin/courses/:id/update",
        name: 'update-course',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/courses/update.vue")
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
        path: '/admin/options/:id/update',
        alias:"/ui/admin/options/:id/update",
        name: 'update-option',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/options/update.vue")
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
        path: '/admin/years/:id/update',
        alias:"/ui/admin/years/:id/update",
        name: 'update-year',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/years/update.vue")
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
    {
        path: '/admin/classes/:id',
        alias:"/ui/admin/classes/:id",
        name: 'uniq-class',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/classes/unique.vue")
    },
    {
        path: '/admin/classes/:id/update',
        alias:"/ui/admin/classes/:id/update",
        name: 'update-class',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/classes/update.vue")
    },
    {
        path: '/admin/users',
        alias:"/ui/admin/users",
        name: 'list-user',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/users/list.vue")
    },
    {
        path: '/admin/users/create',
        alias:"/ui/admin/users/create",
        name: 'create-user',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/users/create.vue")
    },
    {
        path: '/admin/users/:id/update',
        alias:"/ui/admin/users/:id/update",
        name: 'update-user',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/users/update.vue")
    },
    {
        path: '/admin/roles',
        alias:"/ui/admin/roles",
        name: 'list-roles',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/roles/list.vue")
    },
    {
        path: '/admin/roles/create',
        alias:"/ui/admin/roles/create",
        name: 'create-role',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/roles/create.vue")
    },
    {
        path: '/admin/roles/:id/update',
        alias:"/ui/admin/roles/:id/update",
        name: 'update-role',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/roles/update.vue")
    },
]