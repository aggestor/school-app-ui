<template>
    <div class="w-full px-2 flex items-center justify-between h-14 border">
        <div class="md:w-3/12 w-6/12 flex items-center">
            <router-link to="/"><img src="/images/banner.png" class="md:w-[75%] w-[90%]  h-12"/></router-link>
        </div>
        <div class="w-5/12 items-center hidden lg:flex justify-center">
            <div class="flex w-[70%] items-center  justify-around">
                <div class="bg-white absolute bg-opacity-40 backdrop-blur-lg z-50 w-[45%] rounded border top-2 ">
                    <div :class="` w-full  items-center ${searchResults.length > 0 && 'border-b'} h-9  px-1 flex space-x-2`">
                        <input autofocus @input="handleSearch" :value="term" placeholder="Rechercher vendeur, shop, produit, catégories,serie,..." type="search" class="w-full placeholder:text-gray-400 text-gray-800 outline-none border-none mx-2 h-[80%] bg-transparent"><span @click="handleClickSearch"  class="text-gray-400 hover:bg-gray-100 rounded cursor-pointer"><MagnifyingGlassIcon class="h-7 w-7"/></span>
                    </div>
                    <div v-if="!isSearchLoading && searchResults.length == 0 && term.length > 0 && showSuggestionBox " class="h-64 grid place-items-center w-full">
                        {{boxTitle }}
                    </div>
                    <div v-if="!isSearchLoading && searchResults.length > 0" class="h-64 overflow-auto __scrollbar grid place-items-center w-full">
                        <div @click="handleClickProduct(s)" :key="s.prod_id" v-for="s of searchResults" class="p-1 w-full cursor-pointer hover:bg-blue-100 flex flex-col">
                            <p class="w-full font-semibold">{{s.prod_name }}</p>
                            <small class="text-gray-600">{{s.cat_name }}</small>
                        </div>
                    </div>
                    <div v-if="isSearchLoading" class="h-64 grid place-items-center w-full">
                        Loading...
                    </div>
                </div>
            </div>
        </div>
        <div class="w-4/12 items-center relative flex space-x-3 justify-end">
                <div class="hidden lg:flex space-x-3 items-center">
                    <SimpleNavItem path="/" name="Home"/>
                <BlueLinkAsButton v-if="!isLoggedIn" to="/register">
                    Register <UserPlusIcon class="w-5 h-5 ml-1"/>
                </BlueLinkAsButton>
                <BlueLinkAsButton v-else to="/dashboard">
                    Dashboard <UserIcon class="w-5 h-5 ml-1"/>
                </BlueLinkAsButton>
                </div>
                <div class="flex lg:hidden">
                 <BlueLinkAsButton v-if="isLoggedIn" to="/dashboard">
                     <UserIcon class="w-5 h-5"/>
                 </BlueLinkAsButton>
                </div>
                <BlueLinkAsButton to="/cart">
                    <ShoppingCartIcon class="w-5 h-5"/>
                </BlueLinkAsButton>
                <BlueButtons @press="showPhoneNav = !showPhoneNav">
                    <Bars3BottomLeftIcon class="w-5 h-5" />
                </BlueButtons>  
                <div data-aos="slide-left" data-aos-duration="300" v-if="showPhoneNav" class="absolute w-48 p-2 z-50 border h-72 rounded bg-white bg-opacity-60 top-9 backdrop-blur right-0">
                    <router-link to="/" class="flex hover:text-blue-600 mb-1.5 items-center">
                        <HomeIcon class="w-5 h-5 mr-2"/> Home
                    </router-link>
                    <router-link v-if="!isLoggedIn" to="/login" class="flex hover:text-blue-600 mb-1.5 items-center">
                        <ArrowRightIcon class="w-5 h-5 mr-2"/> Login
                    </router-link>
                    <router-link to="/search" class="flex hover:text-blue-600 mb-1.5 items-center">
                        <MagnifyingGlassIcon class="w-5 h-5 mr-2"/> Search
                    </router-link>
                    <router-link to="/products" class="flex hover:text-blue-600 mb-1.5 items-center">
                        <ShoppingCartIcon class="w-5 h-5 mr-2"/> Buy
                    </router-link>
                    <router-link to="/products/add" class="flex hover:text-blue-600 mb-1.5 items-center">
                        <CurrencyDollarIcon class="w-5 h-5 mr-2"/> Sell
                    </router-link>
                    <router-link to="/categories" class="flex hover:text-blue-600 mb-1.5 items-center">
                        <Squares2X2Icon class="w-5 h-5 mr-2"/> Categories
                    </router-link>
                    <router-link to="/shops" class="flex hover:text-blue-600 mb-1.5 items-center">
                        <BuildingStorefrontIcon class="w-5 h-5 mr-2"/> Shops
                    </router-link>
                    <router-link to="/products/trending" class="flex hover:text-blue-600 mb-1.5 items-center">
                        <ArrowTrendingUpIcon class="w-5 h-5 mr-2"/> Trending
                    </router-link>
                    <router-link to="/help" class="flex hover:text-blue-600 mb-1.5 items-center">
                        <QuestionMarkCircleIcon class="w-5 h-5 mr-2"/> Help
                    </router-link>
                    <BlueButtons v-if="isLoggedIn" @press="logout">
                        <PowerIcon class="w-5 h-5 mr-2"/> Logout
                    </BlueButtons>
                </div>
        </div>
    </div>
</template>
<script setup>
import SimpleNavItem from './SimpleNavItem.vue';
import BlueLinkAsButton from './v2/BlueLinkAsButton.vue';
import BlueButtons from './v2/BlueButtons.vue';
import { Bars3BottomLeftIcon } from '@heroicons/vue/24/solid';
import useIsLoggedIn from '../hooks/use-is-logged-in';
import {  ArrowRightIcon, ArrowTrendingUpIcon, BuildingStorefrontIcon, CurrencyDollarIcon, CurrencyYenIcon, HomeIcon, MagnifyingGlassIcon,PowerIcon,QuestionMarkCircleIcon,ShoppingCartIcon, Squares2X2Icon, UserIcon, UserPlusIcon } from '@heroicons/vue/24/outline';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import prettyString from '../helpers/pretty-string';

const showPhoneNav = ref(false)
const showSuggestionBox = ref(false)
const isSearchLoading = ref(false)
const term = ref("")
const boxTitle = ref("Not found")
const isLoggedIn = useIsLoggedIn()
const searchResults = ref([])
const router = useRouter()
const route = useRoute()
const logout = () =>{
    user.logout()
    localStorage.clear()
    router.push('/')
}
watch(route, ()=> showPhoneNav.value = false)

const handleSearch = async (e) =>{
    term.value = e.target.value
    if(e.target.value.length >=2){
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
        searchResults.value = []
        showSuggestionBox.value = false
    }
    
}
const handleClickSearch =  () =>{
     router.push(`/search?term=${term.value}&type=click&interface=home-nav&access=_All_`)
     showSuggestionBox.value = false
}
const handleClickProduct = prod =>{
    router.push(`/products/${prettyString(prod.prod_name)}/${prod.prod_id}`)
    showSuggestionBox.value = false
    term.value = prod.prod_name
    searchResults.value = []
    isSearchLoading.value = false
}

</script>
