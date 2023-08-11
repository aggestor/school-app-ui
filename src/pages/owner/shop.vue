<template>
    <ReusableHeader keywords="owner" description="Branche" title="Details d'un shop"/>
    
    <div class="w-[95%] h-[400px]  mx-auto">
        <div class="w-full flex justify-between items-end pb-2 border-b h-16">
            <h1 class="text-lg text-gray-700 flex "> <GoBackAdminButton/> <span class="ml-2">Information sur  <span class="font-semibold">{{ shop.shop_name }}</span> </span></h1>
            <span class="flex w-fit items-center">
                <router-link :to="'/owner/shop/'+shop.shop_id+'/update'">
                    <span class="bg-blue-600 flex justify-evenly w-fit items-center p-1 rounded mr-1 text-white"> Modifier <PencilIcon class="w-4 h-4"/></span>
                </router-link>
            </span>
        </div>
        <div class="w-full flex justify-evenly flex-wrap flex-shrink-0 pt-20">
            <div class="w-[30%] h-full ">
                <div class="w-60 h-60 rounded-lg overflow-hidden border">
                    <img :src="store+'/shops/'+shop.shop_logo" class="h-full w-full object-cover" alt="">
                </div>
            </div>
            <div class="w-[70%] h-full flex justify-between">
                <div class="w-1/2 p-3 border-r h-64 flex flex-col justify-between">
                    <div class="flex justify-between "><span class="font-semibold">Noms</span><span>{{shop.shop_name}}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Email</span><span>{{shop.email || "Not given" }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Téléphone</span><span>{{shop.contact }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">WhatsApp</span><span>{{shop.whatsapp }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Ville</span><span>{{shop.shop_location }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Addresse</span><span>{{shop.full_address }}</span></div>
                </div>
                <div class="w-1/2 p-3  h-64 flex flex-col justify-between">
                    <div class="flex justify-between "><span class="font-semibold">Catég</span><span :title="categories" class="text-indigo-500 text-right text-ellipsis overflow-hidden w-2/3 font-semibold">{{categories }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Niveau</span><span class="text-orange-500 font-semibold">{{shop.shop_level }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Actif ?</span><span class="text-green-500 flex items-center font-semibold"> <CheckCircleIcon class="h-5 w-5"/></span></div>
                    <div class="flex justify-between "><span class="font-semibold">Verifié ?</span><span class="text-red-500 flex items-center font-semibold"> <NoSymbolIcon class="h-5 w-5"/></span></div>
                    <div class="flex justify-between "><span class="font-semibold">A réjoin le</span><span>{{formatDateNormal(shop.shop_created_at) }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Modif.</span><span>{{formatDateToAgo(shop.last_update) }}</span></div>
                </div>
            </div>
        </div>
        <div class="w-full mt-10 border-t flex md:flex-row flex-col justify-evenly">
                <div class="md:w-[25%] w-full py-2">
                    <div class="w-full p-3  md:h-48 h-auto grid place-items-center">
                       <div class="w-11/12 flex flex-col h-fit items-center text-center"> 
                        <span class=" text-sm">Les informations des produits concernant ce shop</span>
                         <router-link :to="'/owner/shop/'+shop.shop_id+'/products'">
                            <span class="bg-blue-600 flex justify-evenly mt-2 w-fit items-center p-1 rounded mr-2 text-white">Voir la liste<LinkIcon class="w-4 ml-1 h-4"/></span>
                        </router-link>
                    </div>
                    </div>
                </div>
                <div class="md:w-[25%] w-full py-2">
                    <div class="w-full p-3  md:h-48 h-auto grid place-items-center">
                       <div class="w-11/12 flex flex-col h-fit items-center text-center"> 
                        <span class=" text-sm">Les informations des branches concernant ce shop</span>
                         <router-link :to="'/owner/shop/'+shop.shop_id+'/branches'">
                            <span class="bg-gray-700 flex justify-evenly mt-2 w-fit items-center p-1 rounded mr-2 text-white">Voir la liste<LinkIcon class="w-4 ml-1 h-4"/></span>
                        </router-link>
                    </div>
                    </div>
                </div>
                <div class="md:w-[25%] w-full py-2">
                    <div class="w-full p-3  md:h-48 h-auto grid place-items-center">
                       <div class="w-11/12 flex flex-col h-fit items-center text-center"> 
                        <span class=" text-sm">Les informations des gerants concernant ce shop</span>
                         <router-link :to="'/owner/shop/'+shop.shop_id+'/managers'">
                            <span class="bg-yellow-600 flex justify-evenly mt-2 w-fit items-center p-1 rounded mr-2 text-white">Voir la liste<LinkIcon class="w-4 ml-1 h-4"/></span>
                        </router-link>
                    </div>
                    </div>
                </div>
                <div class="md:w-[25%] w-full py-2">
                    <div class="w-full p-3  md:h-48 h-auto grid place-items-center">
                       <div class="w-11/12 flex flex-col h-fit items-center text-center"> 
                        <span class=" text-sm">Les informations des commandes concernant ce shop</span>
                         <router-link :to="'/owner/shop/'+shop.shop_id+'/orders'">
                            <span class="bg-green-600 flex justify-evenly mt-2 w-fit items-center p-1 rounded mr-2 text-white">Voir la liste<LinkIcon class="w-4 ml-1 h-4"/></span>
                        </router-link>
                    </div>
                    </div>
                </div>
        </div>
    </div>
</template>
<script setup>
import { CheckCircleIcon, LinkIcon, NoSymbolIcon, PencilIcon } from '@heroicons/vue/24/outline';
import { onMounted, ref} from 'vue';
import GoBackAdminButton from '../../components/GoBackAdminButton.vue';
import ReusableHeader from '../../components/ReusableHeader.vue';
import useVerify from "../../hooks/useVerify"
import Shop from "../../api/shop"
import { store } from '../../api';
import {formatDateToAgo,formatDateNormal} from "../../helpers/format-date"
        useVerify('owner')
        const shop = ref({})
        const categories = ref("")
        const  getShop = async (id) =>{
            const result = await Shop.getUsingOwner(id)
            if(result.type === "success"){
                shop.value = result.data.shop
                if(result.data.categories !== false){
                    const c = !Array.isArray(result.data.categories) ?[result.data.categories] : result.data.categories
                    categories.value = c.map(a => a.name).join()  
                }
            }
        }
        onMounted(()=>{
            const user = JSON.parse(localStorage.getItem("logged_in_user"))
            if(user){
                getShop(user.data.id)
            }
        })
</script>