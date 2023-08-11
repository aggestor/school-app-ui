<template>
    <div class="w-full h-full grid place-items-center">
        <div class="w-[95%] rounded shadow flex flex-col pt-2 pb-4 px-4 h-auto py-6 bg-white">
            <div class="w-full sticky top-0 bg-white flex items-center justify-between h-14 mb-3 border-b border-gray-300">
                <h1 class="text-lg font-semibold text-gray-700 flex"> <span @click="router.back()" class="w-7 p-1 h-7 mr-3 rounded-full hover:bg-blue-600 cursor-pointer bg-blue-500 text-white"><ArrowLeftIcon class="w-full h-full"/></span> <span class="mx-1">|</span> <UsersIcon class="h-7 w-7 hidden md:flex mr-2"/> Liste des utilisateurs</h1>
                <div class="md:w-[10%] w-fit flex items-center space-x-1 justify-between">
                    <span class="p-1  rounded bg-gray-300 grid place-items-center">{{admins.length}}</span> 
                    <router-link to="/admin/create"><button class="bg-blue-600 text-white h-8 w-8 grid place-items-center hover:bg-blue-700 rounded"> <PlusIcon class="h-6 w-6"/></button></router-link>
                    <router-link to="/admin/users/no-admin"><button class="bg-blue-600 text-white h-8 w-8 grid place-items-center hover:bg-blue-700 rounded"> <ListBulletIcon class="h-6 w-6"/></button></router-link>
                </div>
            </div>
            <div class="w-full text-gray-700 mb-3 font-semibold flex justify-between border-b border-gray-300 p-2">
                <span class="w-1/12">#</span>
                <span class="w-4/12 md:w-2/12">Noms</span>
                <span class="w-3/12 hidden md:flex">Email</span>
                <span class="w-1/12 hidden md:flex text-center">Type</span>
                <span class="w-1/12 text-center">Status</span>
                <span class="w-2/12 hidden md:flex text-center">Modif</span>
                <span class="w-1/12 text-center">---</span>
            </div>
            <div v-for="admin of admins" class="flex flex-col">
                <div  :class="`w-full text-gray-700 text-sm mb-1.5 font-semibold flex justify-between ${admins.indexOf(admin) % 2 == 0 ?'bg-white' :'bg-gray-100'} p-2`">
                    <span class="w-1/12">{{admins.indexOf(admin)+1}}</span>
                    <span class="w-4/12 md:w-2/12">{{admin.name}}</span>
                    <span class="w-3/12 hidden md:flex">{{admin.email}}</span>
                    <span :class="`w-1/12 hidden md:flex text-center`">Admin</span>
                    <span :class="`w-1/12 flex justify-center ${admin.status == 0 ? 'text-yellow-500' : 'text-green-500'}`"><CheckCircleIcon v-if="(admin.status == 1)" class="h-6 w-6"/> <NoSymbolIcon v-else class="h-6 w-6"/></span>
                    <span class="w-2/12 hidden md:flex text-center">{{formatDateToAgo(admin.last_update)}}</span>
                    <span class="w-1/12 text-center">---</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Admin from "../../api/admin"
import {UsersIcon, ArrowLeftIcon, CheckCircleIcon, NoSymbolIcon} from "@heroicons/vue/24/solid"
import {ListBulletIcon, PlusIcon} from "@heroicons/vue/24/outline"
import { formatDateToAgo } from "../../helpers/format-date"
import { useRouter } from "vue-router"
import useVerify from "../../hooks/useVerify"
import { onMounted ,ref} from "vue"
    useVerify()
    const admins = ref([])
    async function  getAdmins() {
        const result = await Admin.getAll()
        if (result.type === "success") {
            admins.value = result.data;
        }
    }
    const router = useRouter()
    onMounted(getAdmins)

</script>