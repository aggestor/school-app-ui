<template>
    <span @click="onClick" v-if="isActive" class="bg-green-600 cursor-pointer transition-colors duration-500 w-fit flex items-center hover:bg-green-700 border-2 border-transparent hover text-white rounded-full justify-around px-1 py-0.5"><span>Debloquer</span> <LockOpenIcon class="h-4 ml-1 w-4"/> </span>
    <span @click="onClick" v-else class="bg-red-600 cursor-pointer transition-colors duration-500 w-fit flex items-center hover:bg-red-700 border-2 border-transparent hover text-white rounded-full justify-around px-1 py-0.5"><span>Bloquer</span> <NoSymbolIcon class="h-4 ml-1 w-4"/> </span>
</template>
<script>
import {NoSymbolIcon, LockOpenIcon } from '@heroicons/vue/24/solid';

export default {
    props: {
        isActive: String,
        onClick :Function
    },
    components: {NoSymbolIcon,LockOpenIcon }
}
</script>