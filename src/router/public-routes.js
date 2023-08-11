export default [
    {
        path: '/',
        name: 'home',
        component:async ()=> await import("../pages/Home.vue")
    },
    {
        path: '/contacts',
        name: 'contacts',
        meta : {layout : 'default'},
        component:async ()=> await import("../pages/Contacts.vue")
    },
    {
        path: '/search',
        name: 'search',
        meta : {layout : 'default'},
        component: async ()=> await import("../pages/Search.vue")
    },
    {
        path: '/about',
        name: 'about',
        meta : {layout : 'default'},
        component: async ()=> await import("../pages/About.vue")
    },
    {
        path: '/term-of-use',
        name: 'terms',
        meta : {layout : 'default'},
        component: async ()=> await import("../pages/Terms.vue")
    },
    {
        path: '/shops',
        name: 'shops-list',
        meta : {layout : 'default'},
        component: async ()=> await import("../pages/shops-list.vue")
    },
    {
        path: '/shops/:id',
        alias: '/shops/:name/:id',
        name: 'shop-unique',
        meta : {layout : 'default'},
        component: async ()=> await import("../pages/unique-shop.vue")
    },
    {
        path: '/cart',
        name: 'cart',
        meta : {layout : 'default'},
        component:async ()=> await import("../pages/Cart.vue")
    },
    {
        path: '/categories',
        alias:"/categorization",
        name: 'categories',
        meta : {layout : 'default'},
        component:async ()=> await import("../pages/Categories.vue")
    },
    {
        path: '/towns',
        alias:"/cities",
        name: 'towns',
        meta : {layout : 'default'},
        component:async ()=> await import("../pages/Towns.vue")
    },
    {
        path: '/products/:id',
        alias: '/products/:name/:id',
        name: 'uniqueProduct',
        meta : {layout : 'default'},
        component: async ()=> await import("../pages/UniqueProduct.vue")
    },
    {
        path: '/products',
        name: 'list-product',
        meta : {layout : 'default'},
        component: async ()=> await import("../pages/product-list.vue")
    },
    {
        path: '/products/filter/:type/:name/:id',
        alias: '/products/filter/:type/:id',
        name: 'filter-prod',
        meta : {layout : 'default'},
        component: async ()=> await import("../pages/ProductsListFiltered.vue")
    },
    {
        path: '/cart/add/:prod_name/:prod_qty/:prod_price/:prod_image/:prod_id',
        alias: '/cart/add/:prod_name/:prod_id',
        name: 'cart-add-prod',
        meta : {layout : 'default'},
        component: async ()=> await import("../pages/cart-add.vue")
    },
]