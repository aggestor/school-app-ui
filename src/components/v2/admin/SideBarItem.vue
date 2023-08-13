<template>
    <router-link @click="onClick(path)" :to="path">
    <span  v-if="currentPath === path" class=" w-fit lg:w-11/12 bg-gray-800  duration-500 transition-colors hover:bg-gray-700 items-center flex my-0.5 p-1.5 rounded text-gray-300 font-semibold">
        <span class=" rounded p-0.5 lg:mr-4"><slot/></span><span class="hidden lg:flex">{{text}}</span>
    </span>
    <span  v-else  class=" w-fit lg:w-11/12 items-center  flex my-0.5 p-1 rounded text-gray-700 hover:bg-blue-100 duration-500 transition-colors group font-semibold">
       <span class="bg-gray-200 group-hover:bg-blue-100 rounded p-1 lg:mr-4"><slot/></span> <span class="hidden lg:flex">{{text}}</span>
    </span>
    </router-link>
</template>
<script>
import {defineComponent } from 'vue';

export default defineComponent({
    props: {
        text: String,
        path: String,
        currentPath:String,
        onClick:Function
    }
})
</script>