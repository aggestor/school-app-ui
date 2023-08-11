<script setup>
import { onMounted,ref } from 'vue';
import { useRoute } from 'vue-router';
import Product from "../api/product" 
import FirstHomeSection from '../components/public/FirstHomeSection.vue';
import ProductCard from "../components/public/ProductCard.vue"
import GoBack from '../components/GoBackAdminButton.vue'
import prettyString from '../helpers/pretty-string';
import uppercaseFirst from '../helpers/uppercase-first';
import BlueLinkAsButton from '../components/v2/BlueLinkAsButton.vue';
import NoDataFoundComponent from '../components/v2/NoDataFoundComponent.vue';
import { PlusIcon,ChevronRightIcon } from '@heroicons/vue/24/outline';
const route = useRoute()
const type = ref('')
const name = ref('')
const term = ref('')
const id = ref(0)
const products = ref([])
const loading = ref(false)

const performRouteCheck = async () =>{
    type.value = route.params.type
    if(route.params.name){
        name.value = prettyString(route.params.name,true)
    }
    id.value = route.params.id
    type.value = route.params.type
    switch(type.value){
        case "locations":
            term.value = "located in"
            break;
        default :
        term.value = type.value.slice(0,-1)
    }
}
const requestProductList = async ()=>{
    loading.value = true
    const result = await Product.listFiltered(type.value, id.value)
    if(result.type === "success" && result.data != false){
        products.value = !Array.isArray(result.data) ? [result.data] : result.data
    }
    loading.value = false
}
onMounted(()=>{
    performRouteCheck().then(requestProductList)
})
</script>
<template>
    <div  class="w-[95%] mx-auto">
        <FirstHomeSection/>
        <div class="grid grid-cols-12 space-x-3 mt-3 w-full h-auto">
        <div class="col-span-12">
            <h2 class="text-gray-700  py-2 border-b flex md:text-lg justify-between items-center"><div class="flex items-center"><GoBack/> <span class="flex ml-2 items-center"> {{uppercaseFirst(term) }} <ChevronRightIcon class="w-5 h-5"/> <span class="font-semibold">{{name }}</span></span> </div> 
            <div class="hidden md:flex">
                <BlueLinkAsButton to="/products/create">
                    <span>Add a product</span> <PlusIcon class="w-5 h-5 ml-1"/>
                </BlueLinkAsButton>
            </div>
        </h2>
            <div class="w-full my-3 flex spacey flex-wrap justify-evenly h-auto">
                <div class="grid place-items-center font-semibold h-72 w-full" v-if="loading">
                Loading...</div>
                <div v-if="products.length > 0 && !loading" class="my-3" v-for="p of products" :key="p.id">
                    <ProductCard :content="p" />
                </div>
                <NoDataFoundComponent title="Oups! No data found for this specific search." :text="`The model ${name} has no data in our database for the moment. Please checkout later or login to your account to provide products for this model. Thanks`" v-if="products.length == 0 && !loading"/>
            </div>
        </div>
    </div>
    </div>
</template>