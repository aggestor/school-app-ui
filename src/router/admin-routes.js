export default [
    {
        path: '/admin/login',
        name: 'admin-login',
        meta : {layout : 'blank'},
        component:async ()=> await import("../pages/admin/Login.vue")
    },
    {
        path: '/admin/administrators/create',
        alias: '/admin/create',
        name: 'admin-add',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/AddAdmin.vue")
    },
    {
        path: '/admin/shops/create',
        alias: '/admin/shops/new',
        name: 'shop-add',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/AddShops.vue")
    },
    {
        path: '/admin/shops',
        alias: '/admin/shops/all',
        name: 'shop-all',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/Shops.vue")
    },
    {
        path: '/admin/shops/:id/u/:user',
        name: 'shop-details',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/ShopDetails.vue")
    },
    {
        path: '/admin/shops/:id/update',
        aliias: '/admin/shops/:id/edit',
        name: 'shop-update',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/UpdateShop.vue")
    },
    {
        path: '/admin/shops/:id/update/categories',
        aliias: '/admin/shops/:id/edit/categories',
        name: 'shop-update-categories',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/UpdateShopCategories.vue")
    },
    {
        path: '/admin/shops/:id/branches/new',
        name: 'shop-branches-add',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/AddShopBranches.vue")
    },
    {
        path: '/admin/shops/:id/branches',
        name: 'shop-branches-all',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/ShopBranches.vue")
    },
    {
        path: '/admin/shops/:id/branches/:branch',
        name: 'shop-branches-unique',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/BranchDetails.vue")
    },
    {
        path: '/admin/shops/:id/branches/:branch/update',
        name: 'shop-branches-update',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/UpdateShopBranches.vue")
    },
    {
        path: '/admin/shops/:shop_id/:shop_name/branches/:branch_id/:branch_name/managers/new',
        name: 'shop-branches-new-manager',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/AssignBranchToManager.vue")
    },
    {
        path: '/admin/shops/:shop_id/:shop_name/owners/new',
        name: 'shop-new-owner',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/AssignShopToOwner.vue")
    },
    {
        path: '/admin/shops/:id/products/create',
        path: '/admin/shops/:id/products/new',
        name: 'product-shop-no-reneric-add',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/AddProducts.vue")
    },
    {
        path: '/admin/products',
        name: 'all-products',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/Products.vue")
    },
    {
        path: '/admin/services',
        name: 'all-services',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/Services.vue")
    },
    {
        path: '/admin/products/:id',
        alias: '/admin/products/:name/:id',
        name: 'unique-product',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/UniqueProduct.vue")
    },
    {
        path: '/admin/current',
        alias: '/admin/profile',
        name: 'current-admin',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/current-admin.vue")
    },
    {
        path: '/admin/current/update',
        alias: '/admin/profile/update',
        name: 'current-admin-update',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/update-admin.vue")
    },
    {
        path: '/admin/products/:id/update',
        alias: '/admin/products/:id/edit',
        name: 'edit-product',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/UpdateProduct.vue")
    },
    {
        path: '/admin/products/:id/update/media',
        alias: '/admin/products/:id/edit/media',
        name: 'edit-product-media',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/UpdateProductMedia.vue")
    },
    {
        path: '/admin/products/:id/update/keywords-and-specs',
        alias: '/admin/products/:id/edit/keywords-and-specs',
        name: 'edit-product-specs-keywords',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/UpdateProductKeyWordsAndSpecs.vue")
    },
    {
        path: '/admin/products/create',
        name: 'create-product',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/GenericCreateProduct.vue")
    },
    {
        path: '/admin/extensions/create',
        alias: '/admin/extensions/new',
        name: 'sub-cat-add',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/AddExtensions.vue")
    },
    {
        path: '/admin/models/create',
        alias: '/admin/models/new',
        name: 'models-add',
        meta : {layout : 'admin'},
        component:async ()=> await import("../pages/admin/AddModels.vue")
    },
    {
        path: '/admin/specifications/create',
        alias: '/admin/specifications/new',
        name: 'specifications-add',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/AddSpecs.vue")
    },
    {
        path: '/admin/specifications/:specId',
        alias: '/admin/specs/:specId',
        name: 'specifications-unique',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/UniqueSpec.vue")
    },
    {
        path: '/admin/specifications/all',
        alias: '/admin/specifications',
        name: 'specifications-all',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/Specs.vue")
    },
    {
        path: '/admin/marks/create',
        alias: '/admin/marks/new',
        name: 'marks-add',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/AddMarks.vue")
    },
    {
        path: '/admin/marks',
        alias: '/admin/marks/all',
        name: 'marks',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/Marks.vue")
    },
    {
        path: '/admin/sets',
        alias: '/admin/sets/all',
        name: 'sets',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/Sets.vue")
    },
    {
        path: '/admin/sets/create',
        alias: '/admin/sets/new',
        name: 'sets-add',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/AddSets.vue")
    },
    {
        path: '/admin/types/create',
        alias: '/admin/types/new',
        name: 'type-add',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/AddTypes.vue")
    },
    {
        path: '/admin/extensions',
        alias: '/admin/extensions/all',
        name: 'sub-cat-all',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/Extensions.vue")
    },
    {
        path: '/admin/models',
        alias: '/admin/models/all',
        name: 'models-all',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/Models.vue")
    },
    {
        path: '/admin/types',
        alias: '/admin/types/all',
        name: 'type-all',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/AllTypes.vue")
    },
    {
        path: '/admin/categories/create',
        alias: '/admin/categories/new',
        name: 'add-category',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/AddCategory.vue")
    },
    {
        path: '/admin/categories',
        alias: '/admin/categories/all',
        name: 'categories-all',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/Categories.vue")
    },
    {
        path: '/admin/administrators',
        alias: '/admin/all',
        name: 'admin-all',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/Admins.vue")
    },
    {
        path: '/admin',
        name: 'admin-dashboard',
        alias:'/admin/dashboard',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/Dashboard.vue")
    },
    {
        path: '/admin/users/all',
        alias: '/admin/users',
        name: 'admin-users',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/AdminUsers.vue")
    },
    {
        path: '/admin/users/no-admin',
        alias: '/admin/users-no-admin',
        name: 'admin-users-no-admin',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/NoAdminUsers.vue")
    },
    {
        path: '/admin/users/no-admin/:id',
        alias: '/admin/users-no-admin/:id',
        name: 'admin-users-no-admin-spec',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/UserNoAdminDetails.vue")
    },
    {
        path: '/admin/users/no-admin/:id/update',
        alias: '/admin/users-no-admin/:id/edit',
        name: 'admin-users-update',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/update-user.vue")
    },
    {
        path: '/admin/users/update/:id',
        alias: '/admin/users/edit/:id',
        name: 'update-one-user',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/AdminUpdateUser.vue")
    },
    {
        path: '/admin/categories/:id/:name/update',
        alias: '/admin/categories/:id/name:/edit',
        name: 'update-one-category',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/UpdateCategory.vue")
    },
    {
        path: '/admin/extensions/:id/:name/c/:category/update',
        alias: '/admin/extensions/:id/name:/c/:category/edit',
        name: 'update-one-extension',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/UpdateExtension.vue")
    },
    {
        path: '/admin/models/:id/:name/c/:category/update',
        alias: '/admin/models/:id/name:/c/:category/edit',
        name: 'update-one-model',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/UpdateModel.vue")
    },
    {
        path: '/admin/types/:id/:name/c/:category/e/:extension/update',
        alias: '/admin/types/:id/:name/c/:category/e/:extension/edit',
        name: 'update-one-type',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/UpdateType.vue")
    },
    {
        path: '/admin/marks/:id/:name/update',
        alias: '/admin/marks/:id/:name/edit',
        name: 'update-one-mark',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/UpdateMark.vue")
    },
    {
        path: '/admin/marks/:id',
        name: 'see-one-mark',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/UniqueMark.vue")
    },
    {
        path: '/admin/marks/:id/:name/assign-category',
        alias: '/admin/marks/:id/assign-category',
        name: 'assign-one-mark',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/AssignToMark.vue")
    },
    {
        path: '/admin/specifications/:id/:name/c/:category/e/:extension/t/:type/update',
        alias: '/admin/specifications/:id/:name/c/:category/e/:extension/t/:type/edit',
        name: 'update-one-spec',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/UpdateSpec.vue")
    },
    {
        ///admin/sets/1/Marque-de-test-encore-update/c/1/mod/1/mar/1/update
        path: '/admin/sets/:id/:name/c/:category/mod/:model/mar/:mark/update',
        alias: '/admin/sets/:id/:name/c/:category/mod/:model/mar/:mark/edit',
        name: 'update-one-set',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/UpdateSet.vue")
    },
    {
        path: '/admin/sliders',
        alias: '/admin/sliders/all',
        name: 'sliders',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/Sliders.vue")
    },
    {
        path: '/admin/sliders/add',
        alias: '/admin/sliders/create',
        name: 'sliders-add',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/AddSliders.vue")
    },
    {
        path: '/admin/sliders/:id/update',
        alias: '/admin/sliders/:id/edit',
        name: 'sliders-update',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/UpdateSlider.vue")
    },
    {
        path: '/admin/sliders/:id',
        alias: '/admin/sliders/:id',
        name: 'sliders-unique',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/UniqueSlider.vue")
    },
    {
        path: '/admin/newsletter',
        name: 'newsletter-list',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/Newsletter.vue")
    },
    {
        path: '/admin/towns',
        name: 'towns-list',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/Towns.vue")
    },
    {
        path: '/admin/towns/add',
        alias:'/admin/towns/create',
        name: 'towns-add',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/AddTown.vue")
    },
    {
        path: '/admin/towns/:id/:name/:country/update',
        alias:'/admin/towns/:id/:name/:country/edit',
        name: 'towns-edit',
        meta : {layout : 'admin'},
        component: async ()=> await import("../pages/admin/UpdateTown.vue")
    },
]