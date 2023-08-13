<template>
    <div class="w-full pl-2 flex relative flex-col h-screen __invisible_scroll overflow-auto  border-r bg-white">
        <div class="flex items-center">
            <img src="/logo-with-ecrit.png" class="h-14 w-full"/>
        </div>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/ui/admin" text="Dashboard">
            <TvIcon class="w-6 h-6"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/ui/admin/levels" text="Niveaux">
            <BuildingStorefrontIcon class="w-5  h56"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/ui/admin/courses" text="Cours">
            <ArchiveBoxIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/ui/admin/options" text="Options">
            <DocumentArrowDownIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/ui/admin/years" text="Annee scolaire">
            <Bars3CenterLeftIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/ui/admin/classes" text="Classes">
            <BarsArrowUpIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/ui/admin/inscriptions" text="Inscriptions">
            <AdjustmentsHorizontalIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/ui/admin/students" text="Eleves">
            <BarsArrowDownIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/ui/admin/fees" text="Frais">
            <AdjustmentsVerticalIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/ui/admin/rating" text="Cotes">
            <ListBulletIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/ui/admin/results" text="Resultats">
            <RectangleGroupIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/ui/admin/users" text="Utilisateurs">
            <UserGroupIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/ui/admin/class-teachers" text="Titulaires">
            <DocumentDuplicateIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/ui/admin/parents" text="Parents">
            <DocumentDuplicateIcon class="w-5 h-5"/>
        </SideBarItem>
        <small class="mt-3">&copy; {{new Date().getFullYear() }} SchoolApp,<b>Modernic, Inc</b>.</small>
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