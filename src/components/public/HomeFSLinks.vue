<template>
    <router-link :to="path" class="flex items-center hover:bg-blue-100 px-1.5 py-0.5 rounded-full bg-gray-100 border-gray-200 border text-gray-700">
        <slot/><span class="ml-1">{{text}}</span>
    </router-link>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
    props: {
        text : String,
        path : String
    },
    setup(props){
        return props
    }
})
</script>