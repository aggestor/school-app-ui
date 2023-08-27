<template>
    <div class="w-full pl-2 flex relative  flex-col h-screen __invisible_scroll overflow-auto  border-r bg-white">
        <div class="flex lg:items-center">
            <img src="/logo-with-ecrit.png" class="h-14 hidden lg:flex w-full"/>
            <img src="/logo.png" class="h-10 w-10 lg:hidden"/>
        </div>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/ui/class-teacher" text="Dashboard">
            <TvIcon class="w-6 h-6"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/ui/class-teacher/courses" text="Cours">
            <BookOpenIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/ui/class-teacher/students" text="Eleves">
            <UserGroupIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/ui/class-teacher/rating" text="Cotes">
            <CalculatorIcon class="w-5 h-5"/>
        </SideBarItem>
        
        <small class="bottom-1 hidden lg:flex text-[10px] absolute">&copy; {{new Date().getFullYear() }} SchoolApp,<b>Modernic, Inc</b>.</small>
    </div>
</template>
<script setup>
import {  AdjustmentsHorizontalIcon,Bars3CenterLeftIcon,AdjustmentsVerticalIcon,ListBulletIcon,BarsArrowDownIcon,BarsArrowUpIcon } from "@heroicons/vue/24/solid"
import SideBarItem from "./SideBarItem.vue"
import {ref,onMounted} from "vue"
import { DocumentArrowDownIcon,RectangleGroupIcon,TvIcon,BuildingStorefrontIcon,ArchiveBoxIcon,UsersIcon,DocumentDuplicateIcon,EnvelopeIcon,ShoppingBagIcon,UserGroupIcon, GlobeEuropeAfricaIcon, CurrencyDollarIcon, CalculatorIcon, UserIcon, BookOpenIcon } from "@heroicons/vue/24/outline"

const currentPath = ref("")
const handleClick = (path) =>{
    currentPath.value = path
    localStorage.setItem('curr-menu', path)
}
onMounted(()=>{
    currentPath.value = localStorage.getItem('curr-menu') ?? "/admin"
})
</script>