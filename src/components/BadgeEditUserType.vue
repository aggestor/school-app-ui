<template>
    <span @click="onClick" v-if="(name === current)" class="bg-blue-600 cursor-pointer transition-colors duration-500 w-fit flex items-center hover:bg-blue-700 border-2 border-transparent hover text-white rounded-full justify-around px-1 py-0.5"><span>{{(name.charAt(0).toUpperCase()+name.slice(1))}}</span> <CheckIcon class="h-4 ml-2 w-4"/> </span>
    <span @click="onClick" v-else class="border-2 border-blue-600 flex cursor-pointer transition-colors duration-500 items-center hover:bg-blue-600 hover:text-white text-blue-600 rounded-full justify-around px-1 py-0.5"><span>{{(name.charAt(0).toUpperCase()+name.slice(1))}}</span></span>
</template>
<script>
import { CheckIcon } from '@heroicons/vue/24/solid';

export default {
    props: {
        name: String,
        current: String,
        onClick : Function
    },
    components: { CheckIcon }
}
</script>