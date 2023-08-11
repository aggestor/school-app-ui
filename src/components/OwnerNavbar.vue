<template>
    <div class="w-full flex justify-between items-center p-2 h-14 bg-white border">
        <div class="md:w-4/12 lg:w-3/12 w-5/12 flex items-center">
            <img src="/images/banner.png" class="w-[60%]  h-12"/>
        </div>
        <div class=" md:w-fit w-6/12 text-gray-500 flex space-x-4 justify-end">
            <span class="w-8 h-8 cursor-pointer hover:bg-gray-300 bg-gray-200 transition-colors duration-500 p-1 rounded"><MagnifyingGlassIcon class="w-full h-full"/></span>
            <router-link to="/" class="w-8 h-8 cursor-pointer hover:bg-gray-300 bg-gray-200 transition-colors duration-500 p-1 rounded"><HomeIcon class="w-full h-full"/></router-link>
            <router-link to="/owner/profile" class="w-8 h-8 cursor-pointer hover:bg-gray-300 bg-gray-200 transition-colors duration-500 p-1 rounded"><UserIcon class="w-full h-full"/></router-link>
            <span @click="logout" class="w-8 h-8 cursor-pointer hover:bg-gray-300 bg-gray-200 transition-colors duration-500 p-1 rounded"><PowerIcon class="w-full h-full"/></span>
            <span @click="hideShowIconsOnly" class="w-8 h-8 cursor-pointer hover:bg-gray-300 bg-gray-200 transition-colors duration-500 p-1 rounded"><Bars3CenterLeftIcon class="w-full h-full"/></span>
        </div>
    </div>
</template>
<script>
import {useUserStore} from "../store/user"
import {Bars3CenterLeftIcon, UserIcon,PowerIcon,HomeIcon,MagnifyingGlassIcon} from "@heroicons/vue/24/solid"
import User from "../api/user"
export default {
    components: { Bars3CenterLeftIcon, UserIcon, PowerIcon, HomeIcon, MagnifyingGlassIcon },
    methods: {
        logout() {
            User.logout()
            const useStore = useUserStore()
            useStore.reset();
            localStorage.clear()
            this.$router.push("/login")
        },
        hideShowIconsOnly(){

        }
    }
}
    
</script>