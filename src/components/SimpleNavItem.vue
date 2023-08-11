<template>
    <router-link :to="path">
        <span  class="text-base font-semibold flex items-center text-gray-600 hover:text-blue-600  duration-200 transition-colors hover:text-blue-5000">{{name}}</span>
    </router-link>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        path: String,
        name : String,
    },
    setup(){

    }
})
</script>