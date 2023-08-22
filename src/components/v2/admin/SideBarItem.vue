<template>
    <router-link @click="onClick(path)" :to="path">
    <span  class=" w-fit lg:w-11/12 items-center  flex my-0.5 p-1 rounded text-gray-700 hover:text-white hover:bg-blue-600 duration-500 transition-colors group">
       <span class="border hover:border-none w-7 h-7 grid place-items-center group-hover:bg-blue-600 group-hover:text-white rounded lg:mr-2"><slot/></span> <span class="hidden lg:flex">{{text}}</span>
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