export default [
    {
        path: '/class-teacher',
        alias:"/ui/class-teacher",
        name: 'class-teacher-dashboard',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/dashboard.vue")
    },
    {
        path: '/class-teacher/levels/create',
        alias:"/ui/class-teacher/levels/create",
        name: 'create-level',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/levels/create.vue")
    },
    {
        path: '/class-teacher/levels',
        alias:"/ui/class-teacher/levels",
        name: 'list-level',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/levels/list.vue")
    },
    {
        path: '/class-teacher/levels/:id/update',
        alias:"/ui/class-teacher/levels/:id/update",
        name: 'update-level',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/levels/update.vue")
    },
    {
        path: '/class-teacher/courses/create',
        alias:"/ui/class-teacher/courses/create",
        name: 'create-course',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/courses/create.vue")
    },
    {
        path: '/class-teacher/courses',
        alias:"/ui/class-teacher/courses",
        name: 'list-course',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/courses/list.vue")
    },
    {
        path: '/class-teacher/courses/:id/update',
        alias:"/ui/class-teacher/courses/:id/update",
        name: 'update-course',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/courses/update.vue")
    },
    {
        path: '/class-teacher/options/create',
        alias:"/ui/class-teacher/options/create",
        name: 'create-option',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/options/create.vue")
    },
    {
        path: '/class-teacher/options',
        alias:"/ui/class-teacher/options",
        name: 'list-option',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/options/list.vue")
    },
    {
        path: '/class-teacher/options/:id/update',
        alias:"/ui/class-teacher/options/:id/update",
        name: 'update-option',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/options/update.vue")
    },
    {
        path: '/class-teacher/years/create',
        alias:"/ui/class-teacher/years/create",
        name: 'create-year',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/years/create.vue")
    },
    {
        path: '/class-teacher/years',
        alias:"/ui/class-teacher/years",
        name: 'list-year',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/years/list.vue")
    },
    {
        path: '/class-teacher/years/:id/update',
        alias:"/ui/class-teacher/years/:id/update",
        name: 'update-year',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/years/update.vue")
    },
    {
        path: '/class-teacher/classes/create',
        alias:"/ui/class-teacher/classes/create",
        name: 'create-class',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/classes/create.vue")
    },
    {
        path: '/class-teacher/classes',
        alias:"/ui/class-teacher/classes",
        name: 'list-class',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/classes/list.vue")
    },
    {
        path: '/class-teacher/classes/:id',
        alias:"/ui/class-teacher/classes/:id",
        name: 'uniq-class',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/classes/unique.vue")
    },
    {
        path: '/class-teacher/classes/:id/update',
        alias:"/ui/class-teacher/classes/:id/update",
        name: 'update-class',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/classes/update.vue")
    },
    {
        path: '/class-teacher/users',
        alias:"/ui/class-teacher/users",
        name: 'list-user',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/users/list.vue")
    },
    {
        path: '/class-teacher/users/create',
        alias:"/ui/class-teacher/users/create",
        name: 'create-user',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/users/create.vue")
    },
    {
        path: '/class-teacher/users/:id/update',
        alias:"/ui/class-teacher/users/:id/update",
        name: 'update-user',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/users/update.vue")
    },
    {
        path: '/class-teacher/roles',
        alias:"/ui/class-teacher/roles",
        name: 'list-roles',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/roles/list.vue")
    },
    {
        path: '/class-teacher/roles/create',
        alias:"/ui/class-teacher/roles/create",
        name: 'create-role',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/roles/create.vue")
    },
    {
        path: '/class-teacher/roles/:id/update',
        alias:"/ui/class-teacher/roles/:id/update",
        name: 'update-role',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/roles/update.vue")
    },
    {
        path: '/class-teacher/inscriptions',
        alias:"/ui/class-teacher/inscriptions",
        name: 'list-inscriptions',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/inscriptions/list.vue")
    },
    {
        path: '/class-teacher/inscriptions/create',
        alias:"/ui/class-teacher/inscriptions/create",
        name: 'create-inscriptions',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/inscriptions/create.vue")
    },
    {
        path: '/class-teacher/inscriptions/:id/update',
        alias:"/ui/class-teacher/inscriptions/:id/update",
        name: 'update-inscriptions',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/inscriptions/update.vue")
    },
    {
        path: '/class-teacher/students',
        alias:"/ui/class-teacher/students",
        name: 'list-students',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/students/list.vue")
    },
    {
        path: '/class-teacher/students/create',
        alias:"/ui/class-teacher/students/create",
        name: 'create-students',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/students/create.vue")
    },
    {
        path: '/class-teacher/students/:id',
        alias:"/ui/class-teacher/students/:id",
        name: 'uniq-students',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/students/unique.vue")
    },
    {
        path: '/class-teacher/students/:id/update',
        alias:"/ui/class-teacher/students/:id/update",
        name: 'update-students',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/students/update.vue")
    },
    {
        path: '/class-teacher/payments',
        alias:"/ui/class-teacher/payments",
        name: 'list-payments',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/payments/list.vue")
    },
    {
        path: '/class-teacher/payments/pay',
        alias:"/ui/class-teacher/payments/pay",
        name: 'create-payments',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/payments/pay.vue")
    },
    {
        path: '/class-teacher/payments/debts',
        alias:"/ui/class-teacher/payments/debts",
        name: 'fetch-debts',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/payments/debts.vue")
    },
    {
        path: '/class-teacher/payments/insolvable',
        alias:"/ui/class-teacher/payments/insolvable",
        name: 'fetch-insolvable',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/payments/insolvable.vue")
    },
    {
        path: '/class-teacher/payments/:id/update',
        alias:"/ui/class-teacher/payments/:id/update",
        name: 'update-payments',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/payments/update.vue")
    },
    {
        path: '/class-teacher/rating',
        alias:"/ui/class-teacher/rating",
        name: 'fetch-rating',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/rating/list.vue")
    },
    {
        path: '/class-teacher/rating/create',
        alias:"/ui/class-teacher/rating/create",
        name: 'create-rating',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/rating/create.vue")
    },
    {
        path: '/class-teacher/rating/:id/update',
        alias:"/ui/class-teacher/rating/:id/update",
        name: 'update-rating',
        meta : {layout : 'class-teacher'},
        component:async ()=> await import("../pages/class-teacher/rating/update.vue")
    },
]