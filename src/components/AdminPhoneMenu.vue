<template>
    <div class="w-full pl-2 flex flex-col h-[calc(100vh-56px)] __invisible_scroll overflow-auto border-gray-300 border-l-2 bg-white">
        <AdminPhoneMenuItem :menuAction="menuAction" :currentPath="currentPath"  path="/admin" text="Tableau de bord">
            <TvIcon class="w-6 h-6"/>
        </AdminPhoneMenuItem>
        <AdminPhoneMenuItem :menuAction="menuAction" :currentPath="currentPath"  path="/admin/shops" text="Shops">
            <BuildingStorefrontIcon class="w-6  h-6"/>
        </AdminPhoneMenuItem>
        <AdminPhoneMenuItem :menuAction="menuAction" :currentPath="currentPath"  path="/admin/products" text="Produits">
            <ArchiveBoxIcon class="w-6 h-6"/>
        </AdminPhoneMenuItem>
        <AdminPhoneMenuItem :menuAction="menuAction" :currentPath="currentPath"  path="/admin/services" text="Services">
            <DocumentArrowDownIcon class="w-6 h-6"/>
        </AdminPhoneMenuItem>
        <AdminPhoneMenuItem :menuAction="menuAction" :currentPath="currentPath"  path="/admin/categories" text="Catégories">
            <Bars3CenterLeftIcon class="w-6 h-6"/>
        </AdminPhoneMenuItem>
        <AdminPhoneMenuItem :menuAction="menuAction" :currentPath="currentPath"  path="/admin/extensions" text="Extensions">
            <BarsArrowUpIcon class="w-6 h-6"/>
        </AdminPhoneMenuItem>
        <AdminPhoneMenuItem :menuAction="menuAction" :currentPath="currentPath"  path="/admin/models" text="Modèles">
            <AdjustmentsHorizontalIcon class="w-6 h-6"/>
        </AdminPhoneMenuItem>
        <AdminPhoneMenuItem :menuAction="menuAction" :currentPath="currentPath"  path="/admin/types" text="Types">
            <BarsArrowDownIcon class="w-6 h-6"/>
        </AdminPhoneMenuItem>
        <AdminPhoneMenuItem :menuAction="menuAction" :currentPath="currentPath"  path="/admin/marks" text="Marques">
            <AdjustmentsVerticalIcon class="w-6 h-6"/>
        </AdminPhoneMenuItem>
        <AdminPhoneMenuItem :menuAction="menuAction" :currentPath="currentPath"  path="/admin/sets" text="Series">
            <ListBulletIcon class="w-6 h-6"/>
        </AdminPhoneMenuItem>
        <AdminPhoneMenuItem :menuAction="menuAction" :currentPath="currentPath"  path="/admin/specifications" text="Spécifications">
            <RectangleGroupIcon class="w-6 h-6"/>
        </AdminPhoneMenuItem>
        <AdminPhoneMenuItem :menuAction="menuAction" :currentPath="currentPath"  path="/admin/orders" text="Orders">
            <ShoppingBagIcon class="w-6 h-6"/>
        </AdminPhoneMenuItem>
        <AdminPhoneMenuItem :menuAction="menuAction" :currentPath="currentPath"  path="/admin/users" text="Utilisateurs">
            <UserGroupIcon class="w-6 h-6"/>
        </AdminPhoneMenuItem>
        <AdminPhoneMenuItem :menuAction="menuAction" :currentPath="currentPath"  path="/admin/sliders" text="Carousels">
            <DocumentDuplicateIcon class="w-6 h-6"/>
        </AdminPhoneMenuItem>
        <AdminPhoneMenuItem :menuAction="menuAction" :currentPath="currentPath"  path="/admin/towns" text="Villes">
            <GlobeEuropeAfricaIcon class="w-6 h-6"/>
        </AdminPhoneMenuItem>
        <AdminPhoneMenuItem :menuAction="menuAction" :currentPath="currentPath"  path="/admin/newsletter" text="Newsletter">
            <EnvelopeIcon class="w-6 h-6"/>
        </AdminPhoneMenuItem>
    </div>
</template>
<script>
import { TvIcon, ArchiveBoxIcon,RectangleGroupIcon, AdjustmentsHorizontalIcon,Bars3CenterLeftIcon,AdjustmentsVerticalIcon,ListBulletIcon,UsersIcon,EnvelopeIcon,DocumentDuplicateIcon,ShoppingBagIcon,UserGroupIcon,BarsArrowDownIcon,BarsArrowUpIcon, BuildingStorefrontIcon, GlobeEuropeAfricaIcon } from "@heroicons/vue/24/solid"
import {useRoute} from "vue-router"
import { DocumentArrowDownIcon } from "@heroicons/vue/24/outline"
import AdminPhoneMenuItem from "./AdminPhoneMenuItem.vue"
export default {
    props:{
        menuAction : Function
    },
components: {
    TvIcon,
    ArchiveBoxIcon,
    Bars3CenterLeftIcon,
    RectangleGroupIcon,
    BuildingStorefrontIcon,
    BarsArrowUpIcon,
    AdjustmentsHorizontalIcon,
    BarsArrowDownIcon,
    AdjustmentsVerticalIcon,
    ListBulletIcon,
    ShoppingBagIcon,
    UserGroupIcon,
    DocumentDuplicateIcon,
    EnvelopeIcon,
    UsersIcon,
    DocumentArrowDownIcon,
    AdminPhoneMenuItem,
    GlobeEuropeAfricaIcon
},
setup({menuAction}){
return {menuAction}
}
}
</script>