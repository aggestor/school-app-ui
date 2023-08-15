export default [
    {
        path: '/config/create-school',
        name: 'create-school',
        meta : {layout : 'blank'},
        component:async ()=> await import("../pages/config/create-school.vue")
    },
    {
        path: '/config/roles',
        name: 'config-roles',
        meta : {layout : 'blank'},
        component:async ()=> await import("../pages/config/roles.vue")
    },
    {
        path: '/config/super-user',
        name: 'config-super-user',
        meta : {layout : 'blank'},
        component:async ()=> await import("../pages/config/super-user.vue")
    },
]