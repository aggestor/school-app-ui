<template>
    <ReusableHeader title="Liste des villes"/>
    <div class="w-full h-full grid place-items-center">
        <div class="w-[95%] rounded shadow flex flex-col pt-2 pb-4 px-4 h-auto py-6 bg-white">
            <div class="w-full sticky top-0 bg-white flex items-center justify-between h-14 mb-3 border-b border-gray-300">
                <h1 class="text-lg font-semibold text-gray-700 flex"> <span @click="goBack" class="w-7 p-1 h-7 md:mr-3 mr-1 rounded-full hover:bg-blue-600 cursor-pointer bg-blue-500 text-white"><ArrowLeftIcon class="w-full h-full"/></span> <span class="mx-1">|</span> <GlobeEuropeAfricaIcon class="h-7 w-7 hidden md:flex  mr-2"/> Liste des villes</h1>
                <div class="w-[15%] flex items-center justify-between">
                    <span class="h-8 w-8 md:mr-2 p-1 m-1 rounded bg-gray-300 grid place-items-center">{{locations.length}}</span> <router-link to="/admin/towns/create"><button class="bg-blue-600 hover:bg-blue-700  hover:shadow-blue-300 hover:shadow-lg flex text-white duration-500 transition-colors rounded p-1 border border-blue-600 font-semibold"> <PlusCircleIcon class="h-6 w-6 md:mr-1"/><span class="hidden md:flex">Ajouter</span></button></router-link>
                </div>
            </div>
            <div class="w-full text-gray-700 mb-3 font-semibold flex justify-between border-b border-gray-300 p-2">
                <span class="md:w-1/12">#</span>
                <span class="md:w-3/12 w-4/12">Ville</span>
                <span class="md:w-3/12 w-4/12">Pays</span>
                <span class="w-3/12 text-center">Modif.</span>
                <span class="md:w-3/12 w-1/12 text-center">---</span>
            </div>
            <div v-for="loc,i of locations" class="flex flex-col">
                <div :key="loc.id"  :class="`w-full text-gray-700 text-sm mb-1.5  flex justify-between ${i % 2 == 0 ?'bg-white' :'bg-gray-100'} p-2`">
                    <span class="md:w-1/12">{{i+1}}</span>
                    <span class="md:w-3/12 w-4/12 font-semibold">{{loc.name}}</span>
                    <span class="md:w-3/12 w-4/12">{{loc.country}}</span>
                    <span class="w-3/12 text-center">{{formatDateToAgo(loc.last_update)}}</span>
                    <span class="md:w-3/12 w-1/12 flex justify-center"><router-link :to="'/admin/towns/'+loc.id+'/'+prettyString(loc.name)+'/'+prettyString(loc.country)+'/update'"><span class="w-6 h-6 bg-blue-600 rounded text-white grid place-items-center"><PencilIcon class="w-4 h-4"/></span></router-link></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Location from "../../api/location"
import { ArrowLeftIcon, PencilIcon} from "@heroicons/vue/24/solid"
import prettyString from "../../helpers/pretty-string"
import {GlobeEuropeAfricaIcon, PlusCircleIcon} from "@heroicons/vue/24/outline"
import ReusableHeader from "../../components/ReusableHeader.vue"
import useVerify from "../../hooks/useVerify"
import {formatDateToAgo} from "../../helpers/format-date"
import {ref, onMounted} from "vue"
import { useRouter } from "vue-router"
    const router = useRouter()
    const locations= ref([])
    useVerify() 
     async function getLocations() {
        const result = await Location.getAll()
        if (result.type === "success") {
            locations.value = !Array.isArray(result.data)? [result.data] : result.data
        }
    }
    function goBack() {
        router.back()
    }
    onMounted(getLocations)
</script>