<template>
    <ReusableHeader keywords="owner" description="Branche" title="Details sur une branche"/>
    
    <div class="w-[95%] h-[400px]  mx-auto">
        <div class="w-full flex justify-between items-end pb-2 border-b h-16">
            <h1 class="text-lg text-gray-700 flex font-semibold"> <GoBackAdminButton/> <span class="ml-2">Information sur la branche</span></h1>
            <span class="flex w-fit items-center">
                <router-link :to="'/owner/branches/'+branch.id+'/update'">
                    <span class="bg-blue-600 flex justify-evenly w-fit items-center p-1 rounded mr-1 text-white"> Modifier <PencilIcon class="w-4 h-4"/></span>
                </router-link>
            </span>
        </div>
        <div class="w-full flex pt-20">
            <div class="w-[25%] h-full ">
                <div class="w-64 h-64 rounded-lg overflow-hidden border">
                    <img :src="store+'/shops/'+branch.logo" class="h-full w-full object-cover" alt="">
                </div>
            </div>
            <div class="w-[75%] h-full flex justify-between">
                <div class="w-1/2 p-3 border-r h-64 flex flex-col justify-between">
                    <div class="flex justify-between "><span class="font-semibold">Noms</span><span>{{branch.name }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Email</span><span></span></div>
                    <div class="flex justify-between "><span class="font-semibold">Téléphone</span><span>{{branch.contact }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">WhatsApp</span><span>{{branch.contact_whatsapp}}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Ville</span><span>{{branch.location}}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Addresse</span><span> {{branch.full_address }}</span></div>
                </div>
                <div class="w-1/2 p-3  h-64 flex flex-col justify-between">
                    <div class="flex justify-between "><span class="font-semibold">Shop</span><span class="text-indigo-500 font-semibold">{{branch.shop_name}}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Actif ?</span><span class="text-green-500 flex items-center font-semibold"><CheckCircleIcon class="h-5 w-5"/></span></div>
                    <div class="flex justify-between "><span class="font-semibold">Verifié ?</span><span class="text-red-500 flex items-center font-semibold"><NoSymbolIcon class="h-5 w-5"/></span></div>
                    <div class="flex justify-between "><span class="font-semibold">A réjoin le</span><span>{{formatDateNormal(branch.last_update)}}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Modif.</span><span>{{formatDateToAgo(branch.last_update)}}</span></div>
                </div>
            </div>
        </div>
        <div v-if="branch.manager_id" class="w-full flex mt-10 border-t">
                <div class="w-[62.5%] py-2">
                    <span class="text-gray-800 text-lg  font-semibold">Information sur le gérant</span>
                    <div class="w-full p-3 border-r h-48 flex flex-col justify-between">
                        <div class="flex justify-between "><span class="font-semibold">Noms</span><span>{{branch.manager_name }}</span></div>
                        <div class="flex justify-between "><span class="font-semibold">Email</span><span>{{branch.manager_email }}</span></div>
                        <div class="flex justify-between "><span class="font-semibold">Téléphone</span><span>{{branch.manager_phone }}</span></div>
                    </div>
                </div>
                <div class="w-[37.5%] py-2">
                    <div class="w-full p-3  h-48 grid place-items-center">
                       <div class="w-9/12 flex flex-col h-fit items-center text-center"> 
                        <span class=" text-sm">Plus d'information sur ce gérant ? Clique sur le bouton ci-bas.</span>
                         <router-link :to="'/owner/managers/'+branch.manager_id">
                            <span class="bg-blue-600 flex justify-evenly mt-2 w-fit items-center p-1 rounded mr-2 text-white">{{branch.manager_name }}<LinkIcon class="w-4 ml-1 h-4"/></span>
                        </router-link>
                    </div>
                    </div>
                </div>
        </div>
        <div v-else class="w-full flex mt-10 border-t">
                <div class="w-full py-2">
                    <p class="text-gray-800 text-lg text-center w-full  font-semibold">Information sur le gérant</p>
                    <div class="w-full p-3 border-r h-48 flex items-center flex-col justify-center">
                        <UserIcon class="h-10 w-10"/>
                        <p class="text-center w-7/12 text-gray-600">Cette brance n'a pas de gerant pour le moment. Assigner un gerant sur un de vos branches c'est gratuit !  Assignez un gerant en cliquant sur le bouton ci-bas !</p>
                        <router-link :to="'/owner/branches/'+branch.id+'/'+prettyString(branch.name)+'/assign-manager'">
                            <span class="bg-blue-600 flex justify-evenly mt-2 w-fit items-center p-1 rounded mr-2 text-white">Assigner un gerant<LinkIcon class="w-4 ml-1 h-4"/></span>
                        </router-link>
                    </div>
                </div>
        </div>
    </div>
</template>
<script setup>
import { CheckCircleIcon, LinkIcon, NoSymbolIcon, PencilIcon, UserIcon } from '@heroicons/vue/24/outline';
import { defineComponent,ref, onMounted } from 'vue';
import GoBackAdminButton from '../../components/GoBackAdminButton.vue';
import ReusableHeader from '../../components/ReusableHeader.vue';
import Branch from "../../api/branch"
import { useRoute } from 'vue-router';
import useVerify from '../../hooks/useVerify';
import prettyString from '../../helpers/pretty-string';
import { store } from '../../api';
import {formatDateToAgo, formatDateNormal} from "../../helpers/format-date"

        useVerify('owner')
        const branch = ref({})
        const getBranch = async (id) =>{
            const result = await Branch._get(id)
            if(result.type === "success"){
                branch.value = result.data
            };
        }
        const route = useRoute()
        onMounted(()=>{
            getBranch(route.params.id)
        })
</script>