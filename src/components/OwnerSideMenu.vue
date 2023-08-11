<template>
    <div class="w-full pl-2 flex flex-col  h-full border-gray-300 border-l-2 bg-white">
        <OwnerMenuSideItem  path="/owner/dashboard" text="Tableau de bord">
            <TvIcon class="w-8 h-8 p-1 bg-gray-200 rounded border"/>
        </OwnerMenuSideItem>
        <OwnerMenuSideItem  path="/owner/branches" text="Branches">
            <HomeModernIcon class="w-8  p-1 bg-gray-200  h-8"/>
        </OwnerMenuSideItem>
        <OwnerMenuSideItem  path="/owner/shop" text="Mon shop">
            <BuildingStorefrontIcon class="w-8  p-1 bg-gray-200  h-8"/>
        </OwnerMenuSideItem>
        <OwnerMenuSideItem  path="/owner/products" text="Produits">
            <ArchiveBoxIcon class="w-8 h-8 p-1 bg-gray-200 rounded border"/>
        </OwnerMenuSideItem>
        <!-- <OwnerMenuSideItem  path="/owner/orders" text="Orders">
            <ShoppingBagIcon class="w-8 h-8 p-1 bg-gray-200 rounded border"/>
        </OwnerMenuSideItem> -->
        <OwnerMenuSideItem  path="/owner/managers" text="Gérants">
            <UserGroupIcon class="w-8 h-8 p-1 bg-gray-200 rounded border"/>
        </OwnerMenuSideItem>
        <!-- <OwnerMenuSideItem  path="/owner/sliders" text="Carousels">
            <DocumentDuplicateIcon class="w-8 h-8 p-1 bg-gray-200 rounded border mr-4"/>
        </OwnerMenuSideItem> -->
    </div>
</template>
<script>
import { TvIcon, ArchiveBoxIcon,RectangleGroupIcon,HomeModernIcon, AdjustmentsHorizontalIcon,Bars3CenterLeftIcon,AdjustmentsVerticalIcon,ListBulletIcon,UsersIcon,EnvelopeIcon,DocumentDuplicateIcon,ShoppingBagIcon,UserGroupIcon,BarsArrowDownIcon,BarsArrowUpIcon, BuildingStorefrontIcon } from "@heroicons/vue/24/solid"
import OwnerMenuSideItem from "./OwnerMenuSideItem.vue"
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
    UsersIcon,
    HomeModernIcon
}
}
</script>