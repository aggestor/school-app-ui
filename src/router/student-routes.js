export default [
    {
        path: '/student',
        alias:"/ui/student",
        name: 'student-dashboard',
        meta : {layout : 'teacher'},
        component:async ()=> await import("../pages/student/dashboard.vue")
    },
    {
        path: '/student/login',
        alias:"/ui/student/login",
        name: 'student-login',
        meta : {layout : 'blank'},
        component:async ()=> await import("../pages/student/login.vue")
    },
    {
        path: '/student/me',
        alias:"/ui/student/me",
        name: 'student-details',
        meta : {layout : 'teacher'},
        component:async ()=> await import("../pages/student/me.vue")
    },
    {
        path: '/student/courses',
        alias:"/ui/student/courses",
        name: 'list-course-teacher',
        meta : {layout : 'teacher'},
        component:async ()=> await import("../pages/student/courses/list.vue")
    },
    {
        path: '/student/students',
        alias:"/ui/student/students",
        name: 'list-students-teacher',
        meta : {layout : 'teacher'},
        component:async ()=> await import("../pages/student/students/list.vue")
    },
    {
        path: '/student/students/:id',
        alias:"/ui/student/students/:id",
        name: 'uniq-students-teacher',
        meta : {layout : 'teacher'},
        component:async ()=> await import("../pages/student/students/unique.vue")
    },
    {
        path: '/student/rating',
        alias:["/ui/student/rating", '/student/ratings','/ui/student/ratings'],
        name: 'fetch-rating-teacher',
        meta : {layout : 'teacher'},
        component:async ()=> await import("../pages/student/rating/list.vue")
    },
    {
        path: '/student/rating/create',
        alias:"/ui/student/rating/create",
        name: 'create-rating-class-reacher',
        meta : {layout : 'teacher'},
        component:async ()=> await import("../pages/student/rating/create.vue")
    },
    {
        path: '/student/rating/:id/:name/:mat/:course/update',
        alias:"/ui/student/rating/:id/:name/:mat/:course/update",
        name: 'update-rating-student',
        meta : {layout : 'teacher'},
        component:async ()=> await import("../pages/student/rating/update.vue")
    },
]