<template>
    <div class="grid grid-cols-12 space-x-3 mt-3 w-full h-auto">
        <div class="col-span-12">
               
            <h2 class="text-gray-700 font-semibold mx-4 py-2 border-b flex text-lg justify-between items-center"><span class="flex items-center"><span class="w-8 h-8 border-gray-600 rounded-full grid place-items-center border-2 mr-2"><BuildingStorefrontIcon class="h-6 w-6 "/></span>Shops on muyisphere</span> <div class="flex space-x-2 text-sm">

            </div></h2>
            <div class="w-full my-3 flex spacey flex-wrap justify-evenly h-auto">
                <div class="my-3" v-for="p of shops" :key="p.id">
                    <ShopCard :content="p" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { BuildingStorefrontIcon} from "@heroicons/vue/24/outline";
import {ref, onMounted} from "vue"
import ShopCard from "../components/public/ShopCard.vue"
import Shop from "../api/shop"
    const shops = ref([])
    const getShops = async () =>{
        const result = await Shop.showroom()
        if(result.type === "success"){
            shops.value = !Array.isArray(result.data) ? [result.data] : result.data
        }
    }
    onMounted(getShops)
</script>