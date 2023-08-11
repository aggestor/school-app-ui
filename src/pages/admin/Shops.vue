<template>
    <div class="w-full h-full grid place-items-center">
        <div class="w-[95%] rounded shadow flex flex-col pt-2 pb-4 px-4 h-auto py-6 bg-white">
            <div class="w-full sticky top-0 bg-white flex items-center justify-between h-14 mb-3 border-b border-gray-300">
                <h1 class="text-lg font-semibold text-gray-700 flex"> <span @click="router.back()" class="w-7 p-1 h-7 md:mr-3 mr-1 rounded-full hover:bg-blue-600 cursor-pointer bg-blue-700 text-white"><ArrowLeftIcon class="w-full h-full"/></span> <span class="mx-1">|</span> <BuildingStorefrontIcon class="h-7 w-7 hidden md:flex  mr-2"/> Liste des shops</h1>
                <div class="w-[20%] flex items-center justify-between">
                    <span class="h-8 w-8 mr-2 rounded bg-gray-300 grid place-items-center">{{shops.length}}</span> <router-link to="/admin/shops/new"><button class="bg-blue-600 flex text-white duration-500 transition-colors rounded p-1 "> <PlusCircleIcon class="h-6 w-6 md:mr-1"/> <span class="hidden md:flex">Nouveau shop</span></button></router-link>
                </div>
            </div>
            <div class="w-full text-gray-600 mb-3 font-semibold flex justify-between border-b border-gray-300 p-2">
                <span class="md:w-[5%]">#</span>
                <span class="md:w-2/12 w-4/12">Noms</span>
                <span class="w-2/12 hidden md:flex">Contact</span>
                <span class="w-2/12 hidden md:flex">WhatsApp</span>
                <span class="w-1/12">Status</span>
                <span class="md:w-1/12 w-2/12 text-center">Modif.</span>
                <span class="w-1/12 text-center">---</span>
            </div>
            <div v-for="shop of shops" class="flex flex-col">
                <div  :class="`w-full text-gray-600 text-sm hover:bg-blue-100 items-center  flex justify-between ${shops.indexOf(shop) % 2 == 0 ?'bg-white' :'bg-gray-100'} p-2`">
                    <span class="md:w-[5%]">{{shops.indexOf(shop)+1}}</span>
                    <span class="md:w-2/12 w-4/12 font-semibold text-gray-700">{{shop.name}}</span>
                    <span class="w-2/12 hidden md:flex"><a class="hover:text-blue-600" :href="'tel:'+shop.contact">{{shop.contact}}</a></span>
                    <span class="w-2/12 hidden md:flex"><a class="hover:text-blue-600" :href="'https://wa.me/'+shop.contact_whatsapp.slice(1)">{{shop.contact_whatsapp}}</a></span>
                    <span class="w-1/12 text-center"><CheckCircleIcon class="text-green-600 w-6 h-6" v-if="shop.status == 1"/> <NoSymbolIcon class="text-red-600 w-6 h-6" v-if="shop.status == 0"/></span>
                    <span class="md:w-1/12 w-2/12 text-center">{{formatDateToAgo(shop.last_update)}}</span>
                    <span class="w-1/12 text-center flex justify-evenly items-center"><TableLinkIconVue :to="'/admin/shops/'+shop.id+'/u/'+shop.owner_id"/></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Shop from "../../api/shop"
import { ArrowLeftIcon, CheckCircleIcon, NoSymbolIcon} from "@heroicons/vue/24/solid"
import { BuildingStorefrontIcon, PlusCircleIcon } from "@heroicons/vue/24/outline"
import TableLinkIconVue from "../../components/TableLinkIcon.vue"
import useVerify from "../../hooks/useVerify"
import { formatDateToAgo } from "../../helpers/format-date"
import { ref,onMounted } from "vue"
import { useRouter } from "vue-router"
useVerify()
    const shops  = ref([])
    const router = useRouter()
  
    async function getShops() {
        const result = await Shop.getAll()
        if (result.type === "success") {
            shops.value = !Array.isArray(result.data) ? [result.data] : result.data;
        }
    }
    onMounted(getShops)
</script>