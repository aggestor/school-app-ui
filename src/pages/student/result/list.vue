<template>
    <div class="w-[95%] mt-2 mx-auto">
        <div class="flex border-b mb-3 py-2 items-center justify-between">
            <div class="flex  items-center">
                <GoBackAdminButton/>
                <h1 class="text-lg font-semibold ml-2">Resultat</h1>
            </div>
           <div class="flex relative items-center">
               <span class="w-7 h-7 mr-2 rounded bg-gray-200 grid place-items-center">{{ data?.length}}</span>
                <span @click="dropDown = !dropDown" class="w-8 h-8 hover:bg-gray-100 cursor-pointer ml-1 rounded border grid place-items-center">
                    <ChevronDownIcon :class="`w-5 h-5 ${dropDown ? 'transform rotate-180' :''} transition-all duration-500`"/>
                </span>
                <div v-if="dropDown" data-aos="zoom-in" data-aos-duration="500" class="absolute w-48 overflow-hidden bg-white bg-opacity-80 border top-9 right-0 shadow backdrop-blur-sm rounded fit">
                    <div @click="setRatingType('')" class="cursor-pointer group hover:bg-blue-600 flex  items-center hover:text-white text-black p-1">
                        <span class="w-6 h-6 rounded border grid place-items-center mr-1.5"><ArrowRightIcon class="w-5 h-5"/></span>
                        <p>Tout</p>
                    </div>
                    <div @click="setRatingType('P1')" class="cursor-pointer group hover:bg-blue-600 flex  items-center hover:text-white text-black p-1">
                        <span class="w-6 h-6 rounded border grid place-items-center mr-1.5"><ArrowRightIcon class="w-5 h-5"/></span>
                        <p>1ère Période</p>
                    </div>
                    <div @click="setRatingType('P2')" class="p-1 cursor-pointer flex items-center hover:bg-blue-600 hover:text-white text-black">
                        <span class="w-6 h-6 rounded border grid place-items-center mr-1.5"><ArrowRightIcon class="w-5 h-5"/></span>
                        <p>2ème Période</p>
                    </div>
                    <div @click="setRatingType('E1')" class="cursor-pointer flex items-center hover:bg-blue-600 hover:text-white text-black p-1">
                        <span class="w-6 h-6 rounded border grid place-items-center mr-1.5"><ArrowRightIcon class="w-5 h-5"/></span>
                        <p>Examen 1er Sem</p>
                    </div>
                    <div @click="setRatingType('P3')" class="cursor-pointer hover:bg-blue-600 hover:text-white flex items-center text-black p-1">
                        <span class="w-6 h-6 rounded border grid place-items-center mr-1.5"><ArrowRightIcon class="w-5 h-5"/></span>
                        <p>3ème Période</p>
                    </div>
                    <div @click="setRatingType('P4')" class="cursor-pointer hover:bg-blue-600 hover:text-white flex items-center text-black p-1">
                        <span class="w-6 h-6 rounded border grid place-items-center mr-1.5"><ArrowRightIcon class="w-5 h-5"/></span>
                        <p>4ème Période</p>
                    </div>
                    <div @click="setRatingType('E2')" class="cursor-pointer hover:bg-blue-600 hover:text-white flex items-center text-black p-1">
                        <span class="w-6 h-6 rounded border grid place-items-center mr-1.5"><ArrowRightIcon class="w-5 h-5"/></span>
                        <p>Examen 2ème Sem</p>
                    </div>
                </div>
           </div>
        </div>
        <div class="border-b pb-1  font-semibold flex items-center justify-between">
            <span class="w-1/12">#</span>
            <span class="w-2/12 flex justify-center">Cours</span>
            <span class="w-2/12 flex justify-center">Periode</span>
            <span class="w-2/12 flex justify-center">Cote</span>
            <span class="w-2/12 flex justify-center">Cote</span>
            <span class="w-2/12 text-center ">Maj</span>
        </div>

        <div v-for="o,i of data" :class="` py-2 text-sm  flex items-center justify-between ${i % 2 != 0 ? 'bg-gray-100' :''}`">
            <span class="w-1/12">{{i+1 }}</span>
            <span class="w-2/12 flex justify-center">{{o.cours }}</span>
            <span class="w-2/12 flex justify-center">{{parseRatingType(o.cotes_types) }}</span>
            <span class="w-2/12 flex justify-center"><span :class="o.cotes >= o.total_periode/2 ? 'bg-green-100 border border-green-300  text-green-600 rounded p-0.5': 'bg-red-100 border border-red-300 text-red-600 rounded p-0.5'">{{o.cotes }}</span></span>
            <span class="w-2/12 flex justify-center">{{o.total_periode }}</span>
            <span class="w-2/12 flex justify-center ">{{formatDateToAgo(o.updated_at) }}</span>
        </div>
    </div>
</template>
<script setup>
import {ref} from "vue"
import { formatDateToAgo } from "../../../helpers/format-date";
import parseRatingType from "../../../helpers/parse-rating-type";
import {   ArrowRightIcon, ChevronDownIcon} from "@heroicons/vue/24/outline";
import GoBackAdminButton from "../../../components/GoBackAdminButton.vue";
import Rating from "../../../api/v2/Rating";
import useFetch from "../../../hooks/useFetch";
import DeleteDialog from "../../../components/v2/DeleteDialog.vue";

const {data, loading} = useFetch(Rating.getStudentRating)
const dropDown = ref(false)
const currentRatingType = ref("")
const setRatingType = async type =>{
    currentRatingType.value = type
    dropDown.value = false
    const result = await Rating.getStudentRating(type)
    if(result.data){
        data.value = result.data
    }
}
</script>