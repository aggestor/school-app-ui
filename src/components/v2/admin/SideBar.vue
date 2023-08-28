<template>
    <div class="w-full pl-2 flex relative flex-col h-screen __invisible_scroll overflow-auto  border-r bg-white">
        <div class="flex lg:items-center">
            <img src="/logo-with-ecrit.png" class="h-14 hidden lg:flex w-full"/>
            <img src="/logo.png" class="h-10 w-10 lg:hidden"/>
        </div>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/ui/admin" text="Dashboard">
            <TvIcon class="w-6 h-6"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/ui/admin/levels" text="Niveaux">
            <AdjustmentsHorizontalIcon class="w-5  h56"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/ui/admin/courses" text="Cours">
            <BookOpenIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/ui/admin/options" text="Options">
            <Squares2X2Icon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/ui/admin/years" text="Année scolaire">
            <CalendarDaysIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/ui/admin/classes" text="Classes">
            <BuildingOffice2Icon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/ui/admin/inscriptions" text="Inscriptions">
            <PencilSquareIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/ui/admin/students" text="Eleves">
            <AcademicCapIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/ui/admin/payments" text="Payments">
            <CurrencyDollarIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/ui/admin/rating" text="Cotes">
            <VariableIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/ui/admin/results" text="Resultats">
            <CalculatorIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/ui/admin/users" text="Utilisateurs">
            <UserIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/ui/admin/class-teachers" text="Titulaires">
            <UsersIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/ui/admin/parents" text="Parents">
            <UserGroupIcon class="w-5 h-5"/>
        </SideBarItem>
        <SideBarItem :currentPath="currentPath" :onClick="handleClick"   path="/ui/admin/roles" text="Roles">
            <IdentificationIcon class="w-5 h-5"/>
        </SideBarItem>
        <small class="mt-3 hidden md:flex">&copy; {{new Date().getFullYear() }} SchoolApp,<b>Modernic, Inc</b>.</small>
    </div>
</template>
<script setup>
import {  AdjustmentsHorizontalIcon,Bars3CenterLeftIcon,AdjustmentsVerticalIcon,ListBulletIcon,BarsArrowDownIcon,BarsArrowUpIcon } from "@heroicons/vue/24/solid"
import SideBarItem from "./SideBarItem.vue"
import {ref,onMounted} from "vue"
import { DocumentArrowDownIcon,RectangleGroupIcon,TvIcon,BuildingStorefrontIcon,ArchiveBoxIcon,UsersIcon,DocumentDuplicateIcon,EnvelopeIcon,ShoppingBagIcon,UserGroupIcon, GlobeEuropeAfricaIcon, CurrencyDollarIcon, BookOpenIcon, CalendarDaysIcon, BuildingOffice2Icon, CalculatorIcon, AcademicCapIcon, PencilSquareIcon, Squares2X2Icon, UserIcon, VariableIcon, IdentificationIcon } from "@heroicons/vue/24/outline"

const currentPath = ref("")
const handleClick = (path) =>{
    currentPath.value = path
    localStorage.setItem('curr-menu', path)
}
onMounted(()=>{
    currentPath.value = localStorage.getItem('curr-menu') ?? "/admin"
})
</script>