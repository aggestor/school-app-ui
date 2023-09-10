export default [
    {
        path: '/student',
        alias:"/ui/student",
        name: 'student-dashboard',
        meta : {layout : 'student'},
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
        path: '/student/login/finalize',
        alias:"/ui/student/login/finalize",
        name: 'student-login-finalize',
        meta : {layout : 'blank'},
        component:async ()=> await import("../pages/student/login-finalize.vue")
    },
    {
        path: '/student/me',
        alias:"/ui/student/me",
        name: 'student-details',
        meta : {layout : 'student'},
        component:async ()=> await import("../pages/student/me.vue")
    },
    {
        path: '/student/courses',
        alias:"/ui/student/courses",
        name: 'list-course-student',
        meta : {layout : 'student'},
        component:async ()=> await import("../pages/student/courses/list.vue")
    },
    {
        path: '/student/students',
        alias:"/ui/student/students",
        name: 'list-students-teacher',
        meta : {layout : 'student'},
        component:async ()=> await import("../pages/student/students/list.vue")
    },
    {
        path: '/student/students/:id',
        alias:"/ui/student/students/:id",
        name: 'uniq-students-teacher',
        meta : {layout : 'student'},
        component:async ()=> await import("../pages/student/students/unique.vue")
    },
    {
        path: '/student/rating',
        alias:["/ui/student/rating", '/student/ratings','/ui/student/ratings'],
        name: 'fetch-rating-student',
        meta : {layout : 'student'},
        component:async ()=> await import("../pages/student/rating/list.vue")
    },
    {
        path: '/student/payments',
        alias:["/ui/student/payments", '/student/payments','/ui/student/payments'],
        name: 'fetch-payment-student',
        meta : {layout : 'student'},
        component:async ()=> await import("../pages/student/payments/list.vue")
    },
]