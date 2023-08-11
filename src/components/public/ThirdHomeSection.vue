<template>
    <div class="grid grid-cols-12 space-x-3 mt-3 w-full h-auto">
        <div class="col-span-12">
               
            <h2 class="text-gray-700 font-semibold py-2 border-b flex text-lg justify-between items-center"><span class="flex items-center"><span class="w-8 h-8 border-gray-600 rounded-full grid place-items-center border-2 mr-2"><SparklesIcon class="h-6 w-6 "/></span>Newest products this month.</span> <div class="flex space-x-2 text-sm">

            </div></h2>
            <div class="w-full my-3 flex spacey flex-wrap justify-evenly h-auto">
                <div class="my-3" v-for="p of products" :key="p.id">
                    <ProductCard :content="p" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { HandThumbUpIcon,PlusCircleIcon} from "@heroicons/vue/24/outline";
import {defineComponent,ref, onMounted} from "vue"
import SlidersHomeSection from "./SlidersHomeSection.vue"
import ProductCard from "./ProductCard.vue"
import Product from "../../api/product"
import {  SparklesIcon } from "@heroicons/vue/24/solid";
    export default defineComponent({
        setup(){
            const products = ref([])
            const getProducts = async () =>{
                const result = await Product.showroomData()
                if(result.type === "success"){
                    products.value = !Array.isArray(result.data) ? [result.data] : result.data
                }
            }
            onMounted(getProducts)
            return {products}
        },
        components:{ SlidersHomeSection, HandThumbUpIcon, ProductCard, SparklesIcon, PlusCircleIcon }
    })
</script>