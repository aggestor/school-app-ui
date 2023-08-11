<template>
    <div class="w-full h-full grid place-items-center">
        <div class="w-[95%] rounded shadow flex flex-col pt-2 pb-4 px-4 h-auto py-6 bg-white">
            <div class="w-full sticky top-0 bg-white flex items-center justify-between h-14 mb-3 border-b border-gray-300">
                <h1 class="text-lg font-semibold text-gray-700 flex"> <span @click="router.back()" class="w-7 p-1 h-7 mr-3 rounded-full hover:bg-blue-600 cursor-pointer bg-blue-500 text-white"><ArrowLeftIcon class="w-full h-full"/></span> <span class="mx-1">|</span> <UsersIcon class="h-7 w-7 hidden md:flex mr-2"/> Liste des utilisateurs</h1>
                <div class="w-fit space-x-1 flex items-center justify-between">
                    <span class="p-1 rounded bg-gray-300 grid place-items-center">{{users.length}}</span> 
                </div>
            </div>
            <div class="w-full text-gray-700 mb-3  flex justify-between border-b border-gray-300 p-2">
                <span class="w-1/12">#</span>
                <span class="md:w-2/12 w-4/12 font-semibold">Noms</span>
                <span class="w-3/12 hidden md:flex">Email</span>
                <span class="w-1/12 ">Status</span>
                <span class="w-1/12 hidden md:flex text-center">Type</span>
                <span class="w-2/12  hidden md:flex text-center">Modif.</span>
                <span class="w-1/12 text-center">---</span>
            </div>
            <div v-for="user,i of users" class="flex flex-col">
                <div  :class="`w-full text-gray-700 text-sm  hover:bg-blue-100  flex justify-between ${users.indexOf(user) % 2 == 0 ?'bg-white' :'bg-gray-100'} p-2`">
                    <span class="w-1/12">{{i+1}}</span>
                    <span class="md:w-2/12 w-4/12 font-semibold">{{(user.name)}}</span>
                    <span class="w-3/12  hidden md:flex">{{user.email}}</span>
                    <span :class="`w-1/12 ${user.is_active == 0 ? 'text-yellow-500' : 'text-green-500'}`"><CheckCircleIcon v-if="(user.is_active == 1)" class="h-6 w-6"/> <CheckCircleIcon v-else class="h-6 w-6"/></span>
                    <span :class="`w-1/12  hidden md:flex text-center`">{{user.type.toString().charAt(0).toUpperCase()+user.type.toString().slice(1) }}</span>
                    <span class="w-2/12  hidden md:flex text-center">{{formatDateToAgo(user.last_update)}}</span>
                    <span class="w-1/12 flex justify-center"><router-link :to="('/admin/users/no-admin/'+user.id)"><span class="w-7 h-7 hover:bg-blue-700 text-white bg-blue-600 rounded grid place-items-center p-1"><AdjustmentsHorizontalIcon class="w-full h-full"/></span></router-link></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import User from "../../api/user"
import {UsersIcon, ArrowLeftIcon, CheckCircleIcon, AdjustmentsHorizontalIcon} from "@heroicons/vue/24/solid"
import { formatDateToAgo } from "../../helpers/format-date"
import { ref ,onMounted} from "vue"
import { useRouter } from "vue-router"

const users = ref([])

async function getUsers() {
    const result = await User.getAll()
    if (result.type === "success") {
       users.value = !Array.isArray(result.data) ? [result.data] : result.data
    }
}
const router = useRouter()
onMounted(getUsers)
</script>