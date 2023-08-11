<template>
    <div class="w-full h-full grid place-items-center">
        <div class="w-[95%] rounded shadow flex flex-col pt-2 pb-4 px-4 h-auto py-6 bg-white">
            <div class="w-full sticky top-0 bg-white flex items-center justify-between h-14 mb-3 border-b border-gray-300">
                <h1 class="text-lg font-semibold text-gray-700 flex"> <span @click="goBack" class="w-7 p-1 h-7 mr-3 rounded-full hover:bg-blue-600 cursor-pointer bg-blue-500 text-white"><ArrowLeftIcon class="w-full h-full"/></span> <span class="mx-1">|</span> <UsersIcon class="h-7 w-7 mr-2"/> Liste des administrateurs</h1>
                <div class="w-[20%] flex items-center justify-between">
                    <span class="h-8 w-8 mr-2 rounded bg-gray-300 grid place-items-center">{{admins.length}}</span> <router-link to="/admin/create"><button class="bg-white hover:bg-gray-800 flex hover:text-white duration-500 transition-colors rounded p-1 border border-gray-800 text-gray-700"> <PlusCircleIcon class="h-6 w-6 mr-1"/> Nouvel Admin</button></router-link>
                </div>
            </div>
            <div class="w-full text-gray-700 mb-3  flex justify-between border-b border-gray-300 p-2">
                <span class="w-1/12">#</span>
                <span class="w-3/12 font-semibold">Noms</span>
                <span class="w-4/12">Email</span>
                <span class="w-1/12 text-center">Status</span>
                <span class="w-2/12 text-center">Modif</span>
                <span class="w-1/12 text-center">---</span>
            </div>
            <div v-for="admin of admins" class="flex flex-col">
                <div  :class="`w-full text-gray-700 text-sm mb-1.5  flex justify-between ${admins.indexOf(admin) % 2 == 0 ?'bg-white' :'bg-gray-100'} p-2`">
                    <span class="w-1/12">{{admins.indexOf(admin)+1}}</span>
                    <span class="w-3/12 font-semibold">{{admin.name}}</span>
                    <span class="w-4/12">{{admin.email}}</span>
                    <span :class="`w-1/12 text-center ${admin.is_active == 0 ? 'text-green-500' : 'text-yellow-500'}`">{{admin.is_active == 0 ?"Actif" : "Inactif"}}</span>
                    <span class="w-2/12 text-center">{{admin.last_update}}</span>
                    <span class="w-1/12 text-center">---</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Admin from "../../api/admin"
import {UsersIcon, ArrowLeftIcon} from "@heroicons/vue/24/solid"
import {PlusCircleIcon} from "@heroicons/vue/24/outline"

export default {
    components: {
        UsersIcon,ArrowLeftIcon,PlusCircleIcon
    },
    data() {
        return {
            admins:[]
        }
    },
    mounted() {
        this.getAdmins()
    },
    methods: {
        async getAdmins() {
            const result = await Admin.getAll()
            if (result.type === "success") {
                this.admins = result.data;
            }
            else if (result.type === 'auth') {
                localStorage.removeItem('admin')
                this.$router.push("/admin/login")
            }
        },
        goBack() {
            this.$router.back()
        }
    }
}
</script>