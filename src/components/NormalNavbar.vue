<template>
    <div class="w-full flex justify-between items-center p-2 h-14 bg-white border">
        <div class="md:w-3/12 w-5/12">
            <span class="text-blue-600 text-2xl font-semibold ml-1">
                Muyisphere
            </span>
        </div>
        <div class="md:w-2/12 w-6/12 text-gray-500 flex space-x-4 justify-end">
            <span class="w-8 h-8 cursor-pointer bg-gray-200 transition-colors duration-500 p-1 rounded"><MagnifyingGlassIcon class="w-full h-full"/></span>
            <span class="w-8 h-8 cursor-pointer bg-gray-200 transition-colors duration-500 p-1 rounded"><HomeIcon class="w-full h-full"/></span>
            <span class="w-8 h-8 cursor-pointer bg-gray-200 transition-colors duration-500 p-1 rounded"><UserIcon class="w-full h-full"/></span>
            <span @click="logout" class="w-8 h-8 cursor-pointer bg-gray-200 transition-colors duration-500 p-1 rounded"><PowerIcon class="w-full h-full"/></span>
            <span class="w-8 h-8 cursor-pointer bg-gray-200 transition-colors duration-500 p-1 rounded"><Bars3CenterLeftIcon class="w-full h-full"/></span>
        </div>
    </div>
</template>
<script>
import {Bars3CenterLeftIcon, UserIcon,PowerIcon,HomeIcon,MagnifyingGlassIcon} from "@heroicons/vue/24/solid"
import { useLogout } from "../helpers/logout"
export default {
    components: { Bars3CenterLeftIcon, UserIcon, PowerIcon, HomeIcon, MagnifyingGlassIcon },
    methods: {
        logout() {
            useLogout()
        }
    }
}
    
</script>