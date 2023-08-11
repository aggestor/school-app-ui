<template>
    <div class="w-full flex justify-between  items-center p-2 h-14 bg-white">
        <div class="md:w-4/12 lg:w-3/12 w-5/12 flex items-center">
            <img src="/images/banner.png" class="w-[60%]  h-12"/>
        </div>
        <div class="w-7/12 lg:w-6/12 md:flex hidden">
            <div class="lg:w-[600px] w-[400px] bg-white z-50 absolute top-[10px] h-auto  rounded-md border">
                <div :class="`px-1 flex items-center ${showSuggestionBox && 'border-b'}`">
                    <span class="p-0.5 grid place-items-center rounded hover:bg-gray-100 h-8 w-8 text-gray-500"><MagnifyingGlassIcon class="w-5 h-5"/></span>
                    <input @input="handleSearch" placeholder="Rechercher vendeur, shop, produit, catégories,serie,..." type="search" :value="term" class="w-[98%] placeholder:text-gray-400 text-gray-800 outline-none border-none mx-2 my-1 h-[80%] bg-transparent">
                </div>
                <div v-if="showSuggestionBox" class=" h-64 w-full __scrollbar overflow-auto rounded-b-md  bg-white">
                    <div v-if="searchResults  && !isSearchLoading" @click="handleClickProduct(r)" v-for="r of searchResults" class="p-2 hover:bg-gray-100 cursor-pointer flex flex-col" :key="r.prod_id">
                            <span class="font-semibold text-sm">{{ r.prod_name }}</span>
                            <span class="text-xs text-gray-500">{{ r.cat_name }}</span>
                        </div>
                        <div v-if="!isSearchLoading && searchResults.length ==0" class=" text-gray-600 h-full w-full flex justify-center items-center">
                            Not found
                        </div>
                        <div v-if="isSearchLoading" class="flex justify-center items-center h-full">
                            Loading...
                        </div>
                        {{ searchResults.length }}
                </div>
            </div>
        </div>
        <div class="md:w-3/12 lg:w-2/12 w-6/12 text-gray-600 flex space-x-2 md:space-x-3 lg:space-x-4 justify-end">
            <router-link to="/" class="w-8 h-8 cursor-pointer hover:bg-blue-100 transition-colors duration-500 p-1 bg-gray-200 rounded"><HomeIcon class="w-full h-full"/></router-link>
            <router-link to="/admin/current" class="w-8 h-8 cursor-pointer hover:bg-blue-100 transition-colors duration-500 p-1 bg-gray-200 rounded"><UserIcon class="w-full h-full"/></router-link>
            <span @click="logout" class="w-8 h-8 cursor-pointer hover:bg-blue-100 transition-colors duration-500 p-1 bg-gray-200 rounded"><PowerIcon class="w-full h-full"/></span>
            <span @click="showMenu  = !showMenu" class="w-8 h-8 cursor-pointer hover:bg-blue-100 transition-colors duration-500 p-1 bg-gray-200 rounded"><Bars3CenterLeftIcon class="w-full h-full"/></span>
        </div>
        <div data-aos="slide-left" aos-duration="1000" v-if="showMenu" class="absolute z-50 left-0 top-14 w-full h-auto">
            <AdminPhoneMenu :menuAction="hideMenuFunc" />
        </div>
    </div>
</template>
<script setup>
import {useUserStore} from "../store/user"
import {Bars3CenterLeftIcon, UserIcon,PowerIcon,HomeIcon,MagnifyingGlassIcon} from "@heroicons/vue/24/solid"
import admin from "../api/admin"
import AdminPhoneMenu from "./AdminPhoneMenu.vue"
import { ref } from "vue"
import {useRouter} from "vue-router"
import Search from "../api/search"
import prettyString from "../helpers/pretty-string"

const showSuggestionBox = ref(false)
const isSearchLoading = ref(false)
const searchResults = ref([])
const showMenu = ref(false)
const term = ref("")

const router = useRouter()
function logout() {
    admin.logout()
    const useStore = useUserStore()
    useStore.reset();
    localStorage.clear()
    router.push("/admin/login")
}
function hideMenuFunc(){
    showMenu.value = false
}
const handleSearch = async (e) =>{
    if(e.target.value.length >=2){
        term.value = e.target.value
        isSearchLoading.value = true
        showSuggestionBox.value = true
        const result = await Search.elementarySearch(e.target.value)
        if(result.type === "success" && result.data !== false){
            searchResults.value = !Array.isArray(result.data) ? [result.data] : result.data
        }else{
            searchResults.value = []
        }
        isSearchLoading.value = false
    }else{
        showSuggestionBox.value = false
    }
    
}
const handleClickSearch =  () =>{
     router.push(`/admin/search?term=${term.value}&type=click&interface=admin-nav&access=_Admin_`)
     showSuggestionBox.value = false
}
const handleClickProduct = prod =>{
    router.push(`/admin/products/${prettyString(prod.prod_name)}/${prod.prod_id}`)
    showSuggestionBox.value = false
}
    
</script>