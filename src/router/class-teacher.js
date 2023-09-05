export default [
    {
        path: '/class-teacher',
        alias:"/ui/class-teacher",
        name: 'class-teacher-dashboard',
        meta : {layout : 'teacher'},
        component:async ()=> await import("../pages/class-teacher/dashboard.vue")
    },
    {
        path: '/class-teacher/me',
        alias:"/ui/class-teacher/me",
        name: 'class-teacher-details',
        meta : {layout : 'teacher'},
        component:async ()=> await import("../pages/class-teacher/me.vue")
    },
    {
        path: '/class-teacher/courses',
        alias:"/ui/class-teacher/courses",
        name: 'list-course-teacher',
        meta : {layout : 'teacher'},
        component:async ()=> await import("../pages/class-teacher/courses/list.vue")
    },
    {
        path: '/class-teacher/students',
        alias:"/ui/class-teacher/students",
        name: 'list-students-teacher',
        meta : {layout : 'teacher'},
        component:async ()=> await import("../pages/class-teacher/students/list.vue")
    },
    {
        path: '/class-teacher/students/:id',
        alias:"/ui/class-teacher/students/:id",
        name: 'uniq-students-teacher',
        meta : {layout : 'teacher'},
        component:async ()=> await import("../pages/class-teacher/students/unique.vue")
    },
    {
        path: '/class-teacher/rating',
        alias:["/ui/class-teacher/rating", '/class-teacher/ratings','/ui/class-teacher/ratings'],
        name: 'fetch-rating-teacher',
        meta : {layout : 'teacher'},
        component:async ()=> await import("../pages/class-teacher/rating/list.vue")
    },
    {
        path: '/class-teacher/rating/create',
        alias:"/ui/class-teacher/rating/create",
        name: 'create-rating-class-reacher',
        meta : {layout : 'teacher'},
        component:async ()=> await import("../pages/class-teacher/rating/create.vue")
    },
    {
        path: '/class-teacher/rating/:id/:name/:mat/:course/update',
        alias:"/ui/class-teacher/rating/:id/:name/:mat/:course/update",
        name: 'update-rating-class-teacher',
        meta : {layout : 'teacher'},
        component:async ()=> await import("../pages/class-teacher/rating/update.vue")
    },
]