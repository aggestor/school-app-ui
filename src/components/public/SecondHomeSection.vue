<template>
    <div class="grid grid-cols-12 space-x-3 w-full h-auto">
        <div class="lg:col-span-12 col-span-12">
            <h2 class="text-gray-700 font-semibold py-2 border-b flex text-lg items-center"><span class="w-8 h-8 border-gray-600 rounded-full grid place-items-center border-2 mr-2"><ArrowTrendingUpIcon class="h-6 w-6 "/></span> Trending products this month.</h2>
            <div class="w-full my-3 flex overflow-x-auto __invisible_scroll space-x-3 h-auto">
                <div v-for="p of products" :key="p.id">
                    <ProductCard :content="p" />
                </div>
            </div>
        </div>
        <!-- <SlidersHomeSection/> -->
    </div>
</template>
<script>
import { HandThumbUpIcon } from "@heroicons/vue/24/outline";
import {defineComponent,ref, onMounted} from "vue"
import SlidersHomeSection from "./SlidersHomeSection.vue"
import ProductCard from "./ProductCard.vue"
import Product from "../../api/product"
import { ArrowTrendingUpIcon, SparklesIcon } from "@heroicons/vue/24/solid";
    export default defineComponent({
        setup(){
            const products = ref([])
            const getProducts = async () =>{
                const result = await Product.trendingShowroomData()
                if(result.type === "success"){
                    products.value = !Array.isArray(result.data) ? [result.data] : result.data
                }
            }
            onMounted(getProducts)
            return {products}
        },
        components:{ SlidersHomeSection, HandThumbUpIcon, ProductCard, SparklesIcon, ArrowTrendingUpIcon }
    })
</script>