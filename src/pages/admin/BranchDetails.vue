<template>
    <ReusableHeader keywords="owner" description="Branche" title="Details d'une branche"/>
    
    <div class="w-[95%]  my-5 p-3 rounded bg-white   mx-auto">
        <div class="w-full flex justify-between items-center border-b h-14">
            <h1 class="text-lg text-gray-700 flex font-semibold"> <GoBackAdminButton/> <span class="ml-2 hidden md:flex">Information sur la branche</span></h1>
            <span class="flex w-fit items-center">
                <router-link :to="'/admin/shops/'+branch.shop_id+'/branches/'+branch.id+'/update'">
                    <span class="bg-blue-600 flex justify-evenly w-fit items-center p-1 rounded mr-1 text-white"> <span class="mr-1 hidden md:flex">Modifier</span> <PencilIcon class="w-4 h-4"/></span>
                </router-link>
                <span @click="removeBranch" class="bg-red-600 flex cursor-pointer justify-evenly w-fit items-center p-1 rounded mr-1 text-white"> <span class="hidden md:flex mr-1">Supprimer </span> <TrashIcon class="w-4 h-4"/></span>
            </span>
        </div>
        <div class="w-full flex flex-col md:flex-row md:justify-evenly flex-wrap md:pt-20">
                <div class="md:w-1/3 flex md:my-0 my-3 justify-center w-full h-full ">
                    <div class="md:w-60 h-60 rounded overflow-hidden border">
                        <img :src="store+'/shops/'+branch.logo" class="h-full w-full object-cover" alt="">
                    </div>
                </div>
                <div class="md:w-1/3 md:p-3 md:border-r md:h-64 flex flex-col justify-between">
                    <div class="flex justify-between "><span class="font-semibold">Noms</span><span>{{branch.name }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Email</span><span>{{branch.email }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Téléphone</span><span>{{branch.contact }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">WhatsApp</span><span>{{branch.contact_whatsapp }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Ville</span><span>{{branch.location}}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Addresse</span><span>{{ branch.full_address }}</span></div>
                </div>
                <div class="md:w-1/3 md:p-3  w-full md:h-64 flex flex-col justify-between">
                    <div class="flex justify-between "><span class="font-semibold">Catg.</span><span class="flex items-center font-semibold">{{branch.categories }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Shop</span><span class="text-indigo-500 flex items-center font-semibold">{{branch.shop_name }}<CheckBadgeIcon class="w-5 ml-2 h-5"/> </span></div>
                    <div class="flex justify-between "><span class="font-semibold">Activé ?</span><span class="font-semibold"> <span class="text-green-500 flex items-center" v-if="branch.status == 1"><CheckCircleIcon class="h-5 w-5"/></span> <span class="text-red-500 flex items-center" v-else><NoSymbolIcon class="h-5 w-5"/></span> </span></div>
                    <div class="flex justify-between "><span class="font-semibold">A réjoin le</span><span>{{moment(branch.created_at).format('ll') }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Modif.</span><span>{{moment(branch.last_update).fromNow() }}</span></div>
                </div>
        </div>
        <div v-if="branch.manager_id" class="w-full flex mt-10 border-t">
                <div class="w-[62.5%] py-2">
                    <span class="text-gray-800 text-lg  font-semibold">Information sur le gérant</span>
                    <div class="w-full p-3 border-r h-48 flex flex-col justify-between">
                        <div class="flex justify-between "><span class="font-semibold">Noms</span><span>{{branch.manager_name }}</span></div>
                        <div class="flex justify-between "><span class="font-semibold">Email</span><span>{{branch.manager_email }}</span></div>
                        <div class="flex justify-between "><span class="font-semibold">Téléphone</span><span>{{branch.manager_phone }}</span></div>
                        <div class="flex justify-between "><span class="font-semibold">Ville</span><span>{{ branch.location }}</span></div>
                    </div>
                </div>
                <div class="w-[37.5%] py-2">
                    <div class="w-full p-3  h-48 grid place-items-center">
                       <div class="w-9/12 flex flex-col h-fit items-center text-center"> 
                        <span class=" text-sm">Plus d'information sur ce gérant ? Clique sur le bouton ci-bas.</span>
                         <router-link :to="'/admin/users/no-admin/'+branch.manager_id">
                            <span class="bg-blue-600 flex justify-evenly mt-2 w-fit items-center p-1 rounded mr-2 text-white">{{ branch.manager_name }}<LinkIcon class="w-4 ml-1 h-4"/></span>
                        </router-link>
                    </div>
                    </div>
                </div>
        </div>
        <div v-else class="w-full flex flex-col justify-center items-center mt-10 border-t">
            <UserIcon class="h-16 w-16 text-gray-600"/>
            <span class="my-3 w-fit text-sm">Cette branche n'a aucun gerant pour le moment !</span> 
            <router-link  :to="'/admin/shops/'+branch.shop_id+'/'+prettyString(branch.shop_name)+'/branches/'+branch.id+'/'+prettyString(branch.name)+'/managers/new'"><span class="bg-gray-800  cursor-pointer px-1 py-1 w-fit text-white flex items-center justify-around rounded">Ajouter un gerant a ce shop <PlusCircleIcon class=" ml-2 h-5 w-5"/> </span></router-link>
        </div>
    </div>
</template>
<script setup>
import { CheckCircleIcon, LinkIcon, NoSymbolIcon, PencilIcon } from '@heroicons/vue/24/outline';
import { ref,onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import GoBackAdminButton from '@/components/GoBackAdminButton.vue';
import ReusableHeader from '@/components/ReusableHeader.vue';
import useVerify from '@/hooks/useVerify';
import Branch from "@/api/branch"
import { CheckBadgeIcon, HomeModernIcon, PlusCircleIcon,TrashIcon,UserIcon } from '@heroicons/vue/24/solid';
import moment from 'moment';
import { store } from '../../api';
import prettyString from '../../helpers/pretty-string';

        useVerify()
        const branch = ref({})
        const route = useRoute()
        const router = useRouter()
        const getBranchDetails = async (id) => {
            const result = await Branch.get(id)
            if(result.type === "success"){
                branch.value= result.data
            }
        }
        const removeBranch = async () =>{
            const result = await Branch.remove(branch.value.id)
            if(result.type === "success"){
                router.push("/admin/shops/"+branch.value.shop_id+'/branches')
            }
        }
        onMounted(()=> getBranchDetails(route.params.branch))
</script>