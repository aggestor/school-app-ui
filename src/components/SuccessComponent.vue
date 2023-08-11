<template>
    <div data-aos="zoom-in" data-aos-duration="500" class="w-full relative h-full flex md:flex-row flex-col overflow-hidden rounded">
        <div data-aos="zoom-in" data-aos-duration="1000" class="md:w-1/2 w-full md:h-full h-48 flex justify-center items-center flex-col bg-green-500">
            <CheckCircleIcon  class="h-40 w-40 text-white"/>
            <span class="text-center font-semibold text-lg text-white">{{title}}</span>
        </div>
        <div class="md:w-1/2 w-full md:h-full bg-white h-48 grid place-items-center">
            <div class="flex w-full items-center justify-center h-full flex-col">
                <span class="w-11/12 text-gray-800  md:text-left ">{{message}}</span>
                <div class="w-11/12 flex md:justify-start justify-center mt-4">
                    <router-link :to="path"><span class=" bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors duration-500 p-1.5">Voir plus &rarr;</span></router-link>
                </div>
            </div>
        </div>
        <XMarkIcon @click="router.back()" class="absolute right-1 top-1 w-7 h-7 md:text-gray-700 text-white cursor-pointer md:hover:bg-gray-200 hover:bg-green-600  duration-500 transition-colors rounded"/>
    </div>
</template>
<script>
import {CheckBadgeIcon, XMarkIcon} from "@heroicons/vue/24/outline"
import { CheckCircleIcon } from "@heroicons/vue/24/solid";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
    components: { CheckBadgeIcon, XMarkIcon, CheckCircleIcon },
    props: ['title', 'message', 'path'],
    setup() {
        const router = useRouter()
        return {router}
    }
})
</script>