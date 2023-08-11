<script setup>
import {onMounted,ref} from 'vue'
import Shop from "../api/shop.js"
import Product from "../api/product"
import { useRoute } from 'vue-router';
import { store } from '../api';
import Whatsapp from '../components/public/Whatsapp.vue';
import {  PhoneIcon } from '@heroicons/vue/24/solid';
import ProductCard from '../components/public/ProductCard.vue';
const shop = ref({})
const route = useRoute()
const name = ref("")
const products = ref([])

const getShop = async (id) =>{
    const result = await Shop.get(id)
    if(result.type === "success"){
        shop.value = result.data
        name.value = result.data.name
    }
    return result.data.id
}
const getProducts =  async (id) =>{
    const result = await Product.getByShopLimited(`${id}-12`)
    if(result.type === "success"){
        products.value = !Array.isArray(result.data) ? [result.data] : result.data
        
    }
}
onMounted(()=>{
    getShop(route.params.id).then((id)=> getProducts(id))
})

</script>
<template>
    <div class="w-full flex items-center sticky top-[60px] z-50 bg-white justify-between p-2 h-[85px] shadow">
        <div class="border rounded-full h-16 overflow-hidden w-16">
            <img :src="store+'/shops/'+shop.logo" :alt="shop.name+'\'s logo'" class="w-full h-full object-cover">
        </div>
        <div class="w-[calc(100%-70px)] relative flex justify-between">
            <div class="md:w-[20%] w-[90%] flex flex-col">
                <span class="font-semibold md:text-xl">{{shop.name }}</span>
                <span class="font-semibold hidden md:flex text-sm md:text-base text-green-600">{{shop.level }}</span>
                <div class="w-full flex md:hidden text-gray-800 text-sm  flex-col">
                    <span class="">{{shop.location_name }},{{shop.full_address }}</span>
                    <span class="font-semibold">{{shop.categories }}</span>
                    <span class="absolute right-0 -top-1.5 rounded bg-gray-600 text-white p-0.5">{{shop.level }}</span>
                </div>
            </div>
            <div class="w-[20%] hidden md:flex text-gray-800  flex-col">
                <span class="">{{shop.location_name}}</span>
                <span class="">{{shop.full_address }}</span>
            </div>
            <div class="md:w-[20%] w-fit space-x-2 md:space-x-0 text-gray-600 flex  md:space-y-2 md:flex-col">
                <a target="blank" :href="`https://wa.me/${shop.contact_whatsapp?.slice(1)}/?text= Bonjour, j'etais entrain de visiter votre shop *${shop.name}*,`" class="flex items-center space-x-2 hover:text-green-600 font-semibold  h-full">
                    <span class="w-6 h-6  rounded bg-green-600 grid place-items-center "><Whatsapp class="w-5 h-5 fill-white"/></span><span class="hidden md:flex">{{shop.contact_whatsapp}}</span></a>
                <a :href="'tel:'+shop.contact" class="flex items-center hover:text-red-600 font-semibold space-x-2">
                    <span class="w-6 h-6  rounded bg-red-600 grid place-items-center"><PhoneIcon class="w-5 h-5 text-white"/></span> <span class="hidden md:flex">{{shop.contact }}</span></a>
            </div>
            <div class="w-[20%] hidden text-gray-600 md:flex flex-col">
                <span class="">Categorisation</span>
                <span class="font-semibold">{{shop.categories }}</span>
            </div>
        </div>
       
    </div>
    <div class="grid grid-cols-12 space-x-3 mt-3 w-[95%] mx-auto h-auto">
        <div class="col-span-12">
            <h2 class="text-gray-700 font-semibold py-2  flex text-lg justify-between items-center">Tous nos produits <div class="flex space-x-2 text-sm">
            </div></h2>
            <div class="w-full my-3 flex spacey flex-wrap justify-evenly h-auto">
                <div class="my-3" v-for="p of products" :key="p.id">
                    <ProductCard :content="p" />
                </div>
            </div>
        </div>
</div>
</template>
