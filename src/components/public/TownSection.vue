<script setup>
import {ref, onMounted} from "vue"
import TownCard from "./TownCard.vue"
import Location from "../../api/location"
import {GlobeEuropeAfricaIcon } from "@heroicons/vue/24/outline";
    const locations = ref([])
    const getLocations = async () =>{
        const result = await Location.getAll()
        if(result.type === "success"){
            locations.value = !Array.isArray(result.data) ? [result.data] : result.data
        }
    }
    onMounted(getLocations)
</script>
<template>
    <div class="grid grid-cols-12 space-x-3 w-full h-auto">
        <div class="lg:col-span-12 col-span-12">
            <h2 class="text-gray-700 font-semibold py-2 border-b flex text-lg items-center"><span class="w-8 h-8 border-gray-600 rounded-full grid place-items-center border-2 mr-2"><GlobeEuropeAfricaIcon class="h-6 w-6 "/></span> We are available in the following locations.</h2>
            <div class="w-full my-3 flex flex-wrap justify-evenly ">
                <div class="m-2" v-for="cat of locations" :key="cat.id">
                    <TownCard :content="cat" />
                </div>
            </div>
        </div>
    </div>
</template>