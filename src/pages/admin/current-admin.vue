<template>
    <ReusableHeader keywords="owner" description="profile" title="Profile admin"/>
    <div class="w-full h-full grid place-items-center">
        <div class="w-[95%] h-[500px] bg-white p-2 rounded  mx-auto">
            <div class="w-full flex justify-between items-end pb-2 border-b h-16">
                <h1 class="text-lg text-gray-700 flex font-semibold"> <GoBackAdminButton/> <span class="ml-2">Information sur profile d'admin.</span></h1>
                <span class="flex w-fit items-center">
                    <router-link to="/admin/current/update">
                        <span class="bg-blue-600 flex justify-evenly w-fit items-center p-1 rounded mr-1 text-white"> Modifier <PencilIcon class="w-4 h-4"/></span>
                    </router-link>
                </span>
            </div>
            <div class="w-full flex pt-20">
                <div class="w-full h-full flex justify-between">
                    <div class="w-1/2 p-3 border-r h-64 flex flex-col justify-between">
                        <div class="flex justify-between "><span class="font-semibold">Noms</span><span>{{user.name }}</span></div>
                        <div class="flex justify-between "><span class="font-semibold">Email</span><span>{{ user.email }}</span></div>
                        <div class="flex justify-between "><span class="font-semibold">Téléphone</span><span>{{user.mobile || "not given" }}</span></div>
                        <div class="flex justify-between "><span class="font-semibold">Ville</span><span>{{user.location || "not given" }}</span></div>
                        <div class="flex justify-between "><span class="font-semibold">Addresse</span><span>{{user.address || "not given" }}</span></div>
                    </div>
                    <div class="w-1/2 p-3  h-64 flex flex-col justify-between">
                        <div class="flex justify-between "><span class="font-semibold">Type</span><span class="text-indigo-500 font-semibold">Admin</span></div>
                        <div class="flex justify-between "><span class="font-semibold">Actif ?</span><span class="text-green-500 flex items-center font-semibold"> Oui <CheckCircleIcon class="h-5 w-5"/></span></div>
                        <div class="flex justify-between "><span class="font-semibold">Verifié ?</span><span class="text-red-500 flex items-center font-semibold"> Non <NoSymbolIcon class="h-5 w-5"/></span></div>
                        <div class="flex justify-between "><span class="font-semibold">A réjoin le</span><span>{{ formatDateNormal(user.created_at) }}</span></div>
                        <div class="flex justify-between "><span class="font-semibold">Modif.</span><span>{{formatDateToAgo(user.last_update) }}</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { CheckCircleIcon, NoSymbolIcon, PencilIcon } from '@heroicons/vue/24/outline';
import {  onMounted, ref } from 'vue';
import GoBackAdminButton from '../../components/GoBackAdminButton.vue';
import ReusableHeader from '../../components/ReusableHeader.vue';
import Admin from "../../api/admin"
import { store } from '../../api';
import { formatDateNormal, formatDateToAgo } from '../../helpers/format-date';
import useVerify from '../../hooks/useVerify';
useVerify()
        const user = ref({})
        const picture = ref("")
        const getUser = async () => {
            const u = JSON.parse(localStorage.getItem('admin'))
            const result = await Admin.get(u.data.id)
            if(result.type === "success"){
                user.value = result.data
                if(result.data.picture ==="placeholder.jpg"){
                    picture.value = "/images/placeholder.jpg"
                }else picture.value = store+"/users/"+result.data.picture
            }
        }
        onMounted(getUser)
</script>