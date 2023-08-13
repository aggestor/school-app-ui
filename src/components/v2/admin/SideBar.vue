<template>
    <div class="w-full pl-2 flex flex-col h-screen __invisible_scroll overflow-auto  border-r bg-white">
        <p class="text-blue-600 font-bold text-2xl  flex items-center">
            SchoolApp
        </p>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/admin" text="Dashboard">
            <TvIcon class="w-6 h-6"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/admin/shops" text="Shops">
            <BuildingStorefrontIcon class="w-5  h56"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/admin/products" text="Produits">
            <ArchiveBoxIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/admin/services" text="Services">
            <DocumentArrowDownIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/admin/categories" text="Catégories">
            <Bars3CenterLeftIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/admin/extensions" text="Extensions">
            <BarsArrowUpIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/admin/models" text="Modèles">
            <AdjustmentsHorizontalIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/admin/types" text="Types">
            <BarsArrowDownIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/admin/marks" text="Marques">
            <AdjustmentsVerticalIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/admin/sets" text="Series">
            <ListBulletIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/admin/specifications" text="Spécifications">
            <RectangleGroupIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/admin/orders" text="Orders">
            <ShoppingBagIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/admin/users" text="Utilisateurs">
            <UserGroupIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/admin/sliders" text="Carousels">
            <DocumentDuplicateIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/admin/towns" text="Villes">
            <GlobeEuropeAfricaIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/admin/newsletter" text="Newsletter">
            <EnvelopeIcon class="w-5 h-5"/>
        </SideBarItem>
    </div>
</template>
<script setup>
import {  AdjustmentsHorizontalIcon,Bars3CenterLeftIcon,AdjustmentsVerticalIcon,ListBulletIcon,BarsArrowDownIcon,BarsArrowUpIcon } from "@heroicons/vue/24/solid"
import SideBarItem from "./SideBarItem.vue"
import {ref,onMounted} from "vue"
import { DocumentArrowDownIcon,RectangleGroupIcon,TvIcon,BuildingStorefrontIcon,ArchiveBoxIcon,UsersIcon,DocumentDuplicateIcon,EnvelopeIcon,ShoppingBagIcon,UserGroupIcon, GlobeEuropeAfricaIcon } from "@heroicons/vue/24/outline"

const currentPath = ref("")
const handleClick = (path) =>{
    currentPath.value = path
    localStorage.setItem('curr-menu', path)
}
onMounted(()=>{
    currentPath.value = localStorage.getItem('curr-menu') ?? "/admin"
})
</script>