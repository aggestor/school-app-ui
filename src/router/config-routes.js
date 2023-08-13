export default [
    {
        path: '/config/create-school',
        name: 'create-school',
        meta : {layout : 'blank'},
        component:async ()=> await import("../pages/config//create-school.vue")
    },
    {
        path: '/contacts',
        name: 'contacts',
        meta : {layout : 'default'},
        component:async ()=> await import("../pages/Contacts.vue")
    },
]