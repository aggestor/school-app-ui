<template>
  <div class="w-[95%] mx-auto">
    <FirstHomeSection/>
  </div>
  <div v-if="!showSearchResult" class="w-[95%] mx-auto  flex flex-col items-center justify-center h-[400px] md:h-[620px]">
    <h1 class=" mb-4 text-3xl font-bold text-blue-500">Muyisphere Search</h1>
      <div class="max-h-96 transition-all duration-500 md:w-6/12 w-full hover:shadow hover:shadow-gray-400 hover:border-t rounded-3xl p-2 border border-gray-300">
          <div class="w-full h-8 flex justify-between">
            <span class=" h-full w-10 mr-2 grid place-items-center"><MagnifyingGlassIcon class="h-6 w-6 text-gray-400"/></span>
            <input :value="term" @input="handleSearch" class="outline-none bg-transparent w-full " type="text">
            <span @click="cleanInput" class=" h-full cursor-pointer border-l ml-2 w-10 grid place-items-center"><XMarkIcon class="h-6 w-6 text-gray-400"/></span>
          </div>
          <div data-aos="slide-up" v-if="showSuggestionBox" class="h-80 overflow-auto __scrollbar w-full mt-2">
            <div v-if="searchResults && !isSearchLoading" @click="handleClickProduct(r)" v-for="r of searchResults" class="p-2 hover:bg-gray-100 cursor-pointer flex flex-col" :key="r.prod_id">
                <span class="font-semibold text-sm">{{ r.prod_name }}</span>
                <span class="text-xs text-gray-500">{{ r.cat_name }}</span>
            </div>
            <div v-if="isSearchLoading" class="flex justify-center items-center h-full">
                Loading...
            </div>
          </div>
      </div>
  </div>
  <div v-else class="w-[95%] mx-auto  flex flex-col items-center justify-center h-auto">
    <div class="p-2 w-full border-b">
      <h1>{{ count }} resultats pour <span class="font-semibold">{{term }}</span> </h1>
    </div>
    <div class="w-full my-3 flex spacey flex-wrap justify-evenly h-auto">
        <div class="my-3" v-for="p of products" :key="p.id">
            <ProductCard :content="p" />
        </div>
    </div>
  </div>
</template>

<script setup>
import {MagnifyingGlassIcon, XMarkIcon} from "@heroicons/vue/24/outline"
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Search from "../api/search";
import prettyString from "../helpers/pretty-string";
import ProductCard from "../components/public/ProductCard.vue"
import FirstHomeSection from '../components/public/FirstHomeSection.vue';
const showSearchResult = ref(false)
const showSuggestionBox = ref(false)
const isSearchLoading = ref(false)
const searchResults = ref([])
const products = ref([])
const term = ref("")
const count = ref(451)
const router = useRouter()
const route = useRoute()

    const handleSearch = async (e) =>{
    if(e.target.value.length >=2){
        term.value = e.target.value
        isSearchLoading.value = true
        showSuggestionBox.value = true
        const result = await Search.elementarySearch(e.target.value)
        if(result.type === "success"){
            searchResults.value = !Array.isArray(result.data) ? [result.data] : result.data
        }
        isSearchLoading.value = false
    }else{
        showSuggestionBox.value = false
    }
    
}
const handleClickProduct = prod =>{
    router.push(`/products/${prettyString(prod.prod_name)}/${prod.prod_id}`)
    showSuggestionBox.value = false
}
const checkURL = () =>{
  const {query,params,path} = route
  if(query.term){
    showSearchResult.value = true
    term.value = query.term
    requestSearchListResult(query.term)
  }
}
const requestSearchListResult = async (term) =>{
  const result = await Search.collectionSearch(term)
  if(result.type == "success" && result.data !== false){
    products.value = Array.isArray(result.data) ? result.data : [result.data]
    count.value = result.data.length
  }
}
const cleanInput = () =>{
  showSuggestionBox.value = false
  term.value = ""
}
onMounted(()=>{
  checkURL()
})
</script>