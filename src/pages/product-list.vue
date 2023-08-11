<script setup>
import { onMounted,ref } from 'vue';
import { useRoute } from 'vue-router';
import Product from "../api/product" 
import FirstHomeSection from '../components/public/FirstHomeSection.vue';
import ProductCard from "../components/public/ProductCard.vue"
const route = useRoute()
const type = ref('')
const name = ref('')
const id = ref(0)
const products = ref([])
const loading = ref(false)

const requestProductList = async ()=>{
    loading.value = true
    const result = await Product.listAll()
    if(result.type === "success" && result.data != false){
        products.value = result.data
    }
    loading.value = false
}
onMounted(()=>{
    requestProductList()
})
</script>
<template>
    <div  class="w-[95%] mx-auto">
        <FirstHomeSection/>
        <div class="grid grid-cols-12 space-x-3 mt-3 w-full h-auto">
        <div class="col-span-12">
            <h2 class="text-gray-700 font-semibold py-2 border-b flex text-lg justify-between items-center">Tous nos produits <div class="flex space-x-2 text-sm">
            </div></h2>
            <div class="w-full my-3 flex spacey flex-wrap justify-evenly h-auto">
                <div class="my-3" v-for="p of products" :key="p.id">
                    <ProductCard :content="p" />
                </div>
            </div>
        </div>
    </div>
    </div>
</template>