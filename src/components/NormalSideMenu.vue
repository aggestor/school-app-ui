<template>
    <div class="w-full pl-2 relative flex flex-col h-full bg-white">
        <OwnerMenuSideItem  path="/dashboard" text="Dashboard">
            <TvIcon class="w-8 h-8 p-1 bg-gray-200 rounded border mr-4"/>
        </OwnerMenuSideItem>
        <OwnerMenuSideItem  path="/profile" text="Profile">
            <UsersIcon class="w-8  p-1 bg-gray-200 rounded  h-8 mr-4"/>
        </OwnerMenuSideItem>
        <OwnerMenuSideItem  path="/products" text="Produits">
            <ArchiveBoxIcon class="w-8 h-8 p-1 bg-gray-200 rounded border mr-4"/>
        </OwnerMenuSideItem>
        <OwnerMenuSideItem  path="/categories" text="Catégories">
            <Bars3CenterLeftIcon class="w-8 h-8 p-1 bg-gray-200 rounded border mr-4"/>
        </OwnerMenuSideItem>
        <OwnerMenuSideItem  path="/user/orders" text="Orders">
            <ShoppingBagIcon class="w-8 h-8 p-1 bg-gray-200 rounded border mr-4"/>
        </OwnerMenuSideItem>
        <div class="absolute text-xs font-semibold text-gray-600 bottom-2 w-11/12 ">
            <span>&copy; {{(new Date().getFullYear())}} Muyisphere | {{version}}</span>
        </div>
    </div>
</template>
<script>
import { TvIcon, ArchiveBoxIcon,RectangleGroupIcon, AdjustmentsHorizontalIcon,Bars3CenterLeftIcon,AdjustmentsVerticalIcon,ListBulletIcon,UsersIcon,EnvelopeIcon,DocumentDuplicateIcon,ShoppingBagIcon,UserGroupIcon,BarsArrowDownIcon,BarsArrowUpIcon, BuildingStorefrontIcon } from "@heroicons/vue/24/solid"
import OwnerMenuSideItem from "./OwnerMenuSideItem.vue"
import { useRoute } from "vue-router"
import useVersion from "../hooks/use-version"
import { version } from "vue"
export default {
    components: {
        OwnerMenuSideItem,
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
        UsersIcon
    },
    data() {
        return {
            currentPath: String,
                version: useVersion()
            }
    },
    mounted() {
        const route = useRoute()
        this.currentPath = route.path
    }
}
</script>