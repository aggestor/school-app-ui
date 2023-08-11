<template>
    <div class=" w-11/12 mx-auto mb-4 h-16 items-center flex justify-between">
         <span class="text-white hidden bg-gray-500 md:flex rounded p-1.5 hover:ring-2 hover:ring-gray-500 border-2 border-transparent hover:border-white font-semibold duration-200 transition-all text-base "><router-link to="/categories">Toutes les catégories</router-link></span>
         <span class="border rounded p-0.5 hover:bg-gray-100"><router-link to="/categories"><QueueListIcon class="text-gray-500 rounded hover:ring-2 hover:ring-gray-500 border-2 border-transparent hover:border-white font-semibold duration-200 transition-all h-9 "/></router-link></span>
         <div class="border p-0.5 focus-within:border-2 transition-all duration-300 focus-within:border-blue-500 group border-gray-300 flex h-10  rounded-lg w-10/12 md:w-6/12">
            <input class="w-full outline-none mx-2" placeholder="Taper votre recherche ici..." type="text"><span class="text-gray-400 p-1 group-focus-within:text-white group-focus-within:rounded group-focus-within:bg-blue-500 flex items-center cursor-pointer justify-center hover:bg-blue-500 hover:rounded duration-300 transition-all hover:text-white"><MagnifyingGlassIcon class="h-6 w-6"/></span>
         </div>
    </div>
</template>

<script>
import Button from './Button.vue';
import ButtonLink from './ButtonLink.vue';
import {MagnifyingGlassIcon, QueueListIcon} from "@heroicons/vue/24/outline"
export default {
    components: { Button, ButtonLink,MagnifyingGlassIcon,QueueListIcon }
}
</script>

<style>

</style>