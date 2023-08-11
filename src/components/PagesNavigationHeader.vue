<template>
     <div class="w-full flex items-center mb-2">
        <span @click="onclickBack" class="w-8 cursor-pointer h-8 hover:bg-blue-600 duration-500 transition-colors rounded-full p-1 border text-white bg-blue-500 mr-5"><ArrowLeftIcon class="h-full w-full"/></span><h2 class="font-semibold text-lg text-gray-700">{{title}}</h2>
     </div>
</template>
<script>
import {ArrowLeftIcon} from "@heroicons/vue/24/solid"
export default {
    components: { ArrowLeftIcon },
    props: {
        title:String
    },
    methods: {
        onclickBack() {
            this.$router.back()
        }
    }
}
</script>