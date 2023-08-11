<template>
  <div class="w-[95%]  mt-8 rounded h-auto bg-white  mx-auto">
        <div class="w-full flex px-2 justify-between items-end pb-2 border-b h-16">
            <h1 class="text-lg text-gray-700 flex font-semibold"> <GoBackAdminButton/> <span class="ml-2">Information sur profile</span></h1>
            <span class="flex w-fit items-center">
                <router-link :to="'/admin/users/no-admin/'+user.id+'/update'">
                    <span class="bg-blue-600 flex justify-evenly w-fit items-center p-1 rounded mr-1 text-white"> <span class="hidden md:flex mr-1">Modifier </span><PencilIcon class="w-4 h-4"/></span>
                </router-link>
                    <span @click="removeUser" class="bg-red-600 flex cursor-pointer justify-evenly w-fit items-center p-1 rounded mr-1 text-white"> <span class="hidden md:flex mr-1">Supprimer </span> <TrashIcon class="w-4 h-4"/></span>
            </span>
        </div>
        <div class="w-full px-5 justify-evenly flex-col md:flex-row   flex pt-20">
                <div class="md:w-1/3 w-full h-full ">
                    <div class="w-60 mx-auto md:mx-0 h-60 rounded-full overflow-hidden border">
                        <img :src="picture" class="h-full w-full object-cover" alt="">
                    </div>
                </div>
                <div class="md:w-1/3 w-full p-3 md:border-r h-64 flex flex-col justify-between">
                    <div class="flex justify-between "><span class="font-semibold">Noms</span><span>{{user.name }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Email</span><span>{{ user.email }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Téléphone</span><span>{{user.mobile }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Ville</span><span>{{user.location }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Addresse</span><span>{{user.address }}</span></div>
                </div>
                <div class="md:w-1/3 w-full p-3  h-64 flex flex-col justify-between">
                    <div class="flex justify-between "><span class="font-semibold">Type</span><span class="text-indigo-500 font-semibold">{{ user.type }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Actif ?</span><span class="text-green-500 flex items-center font-semibold"> Oui <CheckCircleIcon class="h-5 w-5"/></span></div>
                    <div class="flex justify-between "><span class="font-semibold">Verifié ?</span><span class="text-red-500 flex items-center font-semibold"> Non <NoSymbolIcon class="h-5 w-5"/></span></div>
                    <div class="flex justify-between "><span class="font-semibold">A réjoin le</span><span>{{ formatDateNormal(user.created_at) }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Modif.</span><span>{{formatDateToAgo(user.last_update) }}</span></div>
                </div>
            </div>
            <div class="w-full mt-10">
                <h2 v-if=" data.branch || data.shop" class="text-gray-700 w-full border-b px-3 pb-2 font-semibold text-lg">
                    Information sur {{data.branch ? "la branche" : "le shop" }} de l'utilisateur.
                </h2>
                <div class="w-[95%] flex flex-col md:flex-row py-4 mx-auto">
                    <div v-if=" data.branch || data.shop" class="md:w-1/3 w-full mb-3 h-full ">
                        <div class="w-48 mx-auto md:mx-0 h-48 rounded overflow-hidden border">
                            <img :src="logo" class="h-full w-full object-cover" alt="">
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row justify-between w-[95%] mx-auto md:w-2/3">
                        <div v-if="data.shop" class="md:w-[60%] w-full md:h-full h-56 flex justify-between flex-col">
                            <div class="flex justify-between "><span class="font-semibold">Nom </span><span>{{data.shop.name }}</span></div>
                            <div class="flex justify-between "><span class="font-semibold">Email</span><span>{{ data.shop.email || "no data" }}</span></div>
                            <div class="flex justify-between "><span class="font-semibold">Téléphone</span><span>{{data.shop.contact }}</span></div>
                            <div class="flex justify-between "><span class="font-semibold">Ville</span><span>{{data.shop.location }}</span></div>
                            <div class="flex justify-between "><span class="font-semibold">Addresse</span><span>{{data.shop.full_address }}</span></div>
                        </div>
                        <div v-if="data.branch" class="md:w-[60%] w-full md:h-full h-56 flex justify-between flex-col">
                            <div class="flex justify-between "><span class="font-semibold">Nom </span><span>{{data.branch.name }}</span></div>
                            <div class="flex justify-between "><span class="font-semibold">Email</span><span>{{ data.branch.email ||"no data" }}</span></div>
                            <div class="flex justify-between "><span class="font-semibold">Téléphone</span><span>{{data.branch.contact }}</span></div>
                            <div class="flex justify-between "><span class="font-semibold">Ville</span><span>{{data.branch.location }}</span></div>
                            <div class="flex justify-between "><span class="font-semibold">Addresse</span><span>{{data.branch.full_address }}</span></div>
                        </div>
                        <div v-if="data.branch" class="md:w-[25%] mt-3 w-full flex items-center">
                           <router-link class="bg-blue-600 text-white rounded p-1 hover:shadow-lg hover:shadow-blue-300 hover:bg-blue-700" :to="'/admin/shops/'+data.branch.shop_id+'/branches/'+data.branch.id"> En savoir plus &rarr;</router-link>
                        </div>
                        <div v-if="data.shop" class="md:w-[25%] mt-3 w-full flex items-center">
                           <router-link class="bg-blue-600 text-white rounded p-1 hover:shadow-lg hover:shadow-blue-300 hover:bg-blue-700" :to="'/admin/shops/'+data.shop.id"> En savoir plus &rarr;</router-link>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>
<script setup>
import { CheckCircleIcon, NoSymbolIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/solid';
import User from '../../api/user';
import { ref ,onMounted} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useVerify from '../../hooks/useVerify';
import { formatDateNormal, formatDateToAgo } from '../../helpers/format-date';
import GoBackAdminButton from "../../components/GoBackAdminButton.vue"
import { store } from '../../api';
useVerify()
const route = useRoute()
const router =useRouter()
const user = ref({})
const data  = ref({})
const picture = ref("")
const logo = ref("")
        async function getUser() {
            const result = await User.getUser(route.params.id);
            if (result.type === "success") {
                user.value = result.data;
                if(result.data.picture ==="placeholder.jpg"){
                    picture.value = "/images/placeholder.jpg"
                }else picture.value = store+"/users/"+result.data.picture
            }
        }
        const removeUser = async () =>{
            const result =await User.remove(user.value.id)
            if(result.type === "success"){
                router.push("/admin/users/no-admin")
            }
        }
        async function getUserShopAndBranches() {
            const result = await User.getShopAndBranches(route.params.id)
            if(result.type === "success"){
                data.value = result.data
                if(result.data.shop){
                    logo.value = store+"/shops/"+result.data.shop.logo
                }else if(result.data.branch) logo.value =  store+"/shops/"+ result.data.branch.logo
            }
        }
        onMounted(()=>{
            getUser()
            getUserShopAndBranches()
        })
</script>