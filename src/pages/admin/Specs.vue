<template>
    <ReusableHeader title="Liste des specifications"/>
    <div class="w-full h-full grid place-items-center">
        <div class="w-[95%] rounded shadow flex flex-col pt-2 pb-4 px-4 h-auto py-6 bg-white">
            <div class="w-full sticky top-0 bg-white flex items-center justify-between h-14 mb-3 border-b border-gray-300">
                <h1 class="text-lg font-semibold text-gray-700 flex"> <span @click="goBack" class="w-7 p-1 h-7 md:mr-3 mr-1 rounded-full hover:bg-blue-600 cursor-pointer bg-blue-500 text-white"><ArrowLeftIcon class="w-full h-full"/></span> <span class="mx-1">|</span> <RectangleGroupIcon class="h-7 hidden md:flex w-7 mr-2"/> Liste de spécifications</h1>
                <!-- <div class="w-[40%]  flex items-center justify-between h-full">
                    <button @click="prev" class="bg-gray-100 hover:bg-gray-200 h-fit  hover:shadow-gray-300 hover:shadow-lg flex text-gray-800 duration-500 transition-colors rounded p-1 border border-gray-800 font-semibold">&larr; Précedent</button>
                    <span class="text-gray-600">{{interval}}</span>
                    <button @click="next" class="bg-gray-100 hover:bg-gray-200 h-fit  hover:shadow-gray-300 hover:shadow-lg flex text-gray-800 duration-500 transition-colors rounded p-1 border border-gray-800 font-semibold">Suivant &rarr;</button>
                </div> -->
                <div class="w-[15%] flex items-center justify-between">
                    <span class="h-8 w-8 md:mr-2 p-1 mr-1 rounded bg-gray-300 grid place-items-center">{{total}}</span> <router-link to="/admin/specifications/create"><button class="bg-blue-600 hover:bg-blue-700  hover:shadow-blue-300 hover:shadow-lg flex text-white duration-500 transition-colors rounded p-1  font-semibold"> <PlusCircleIcon class="h-6 w-6 mr-1"/><span class="hidden md:flex">Ajouter</span></button></router-link>
                </div>
            </div>
            <div class="w-full text-gray-700 mb-3 font-semibold flex justify-between border-b border-gray-300 p-2">
                <span class="w-fit pr-1">#</span>
                <span class="md:w-2/12 w-4/12">Nom</span>
                <span class="w-4/12 md:w-2/12">Type</span>
                <span class="w-2/12 hidden md:flex">Extension</span>
                <span class="w-2/12 hidden md:flex">Catégorie</span>
                <span class="md:w-1/12 w-2/12">Modif.</span>
                <span class="w-2/12 text-center">---</span>
            </div>
            <div v-if="specifications" v-for=" (s,i) of specifications" class="flex flex-col">
                <div :key="s.cat_id"  :class="`w-full text-gray-700 text-sm mb-1.5  flex justify-between ${i % 2 == 0 ?'bg-white' :'bg-gray-100'} p-2`">
                    <span class="w-fit pr-1">{{i+1}}</span>
                    <span class="md:w-2/12 w-4/12 font-semibold">{{s.spe_name}}</span>
                    <span class="w-4/12 md:w-2/12">{{s.typ_name}}</span>
                    <span class="w-2/12  hidden text-ellipsis overflow-hidden md:flex">{{s.ext_name}}</span>
                    <span class="w-2/12 hidden md:flex">{{s.cat_name}}</span>
                    <span class="md:w-1/12 w-2/12 text-ellipsis overflow-hidden">{{formatDateToAgo(s.last_update)}}</span>
                    <span class="w-2/12 flex justify-center">
                         <router-link :to="'/admin/specifications/'+s.spe_id"><span class="w-6 hover:bg-slate-300 mr-2 cursor-pointer h-6  bg-gray-200 rounded grid place-items-center"><LinkIcon class="w-4 h-4"/></span></router-link>
                         <router-link :to="'/admin/specifications/'+s.spe_id+'/'+prettyString(s.spe_name)+'/c/'+s.cat_id+'/e/'+s.ext_id+'/t/'+s.typ_id+'/update'"><span class="w-6 hover:bg-blue-700 text-white cursor-pointer h-6 mx-auto bg-blue-600 rounded grid place-items-center"><PencilIcon class="w-4 h-4"/></span></router-link>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {RectangleGroupIcon,LinkIcon, ArrowLeftIcon, PencilIcon} from "@heroicons/vue/24/solid"
import {PlusCircleIcon} from "@heroicons/vue/24/outline"
import Spec from "../../api/spec"
import prettyString from "../../helpers/pretty-string"
import useVerify from "../../hooks/useVerify"
import ReusableHeader from "../../components/ReusableHeader.vue"
import { formatDateToAgo } from "../../helpers/format-date"
import { ref , onMounted} from "vue"

       
        const specifications =ref([])
        const data = ref([]) 
        const currentStep =ref(0)
        const maxSteps = ref(0) 
        const interval = ref("")
        const total = ref(0)
        useVerify()
        async function getSpecs() {
            const result = await Spec.getAll()
            if (result.type === "success") {
                specifications.value = !Array.isArray(result.data) ? [result.data] : result.data;
                total.value =  result.data.length ?? 0
            }
        }
        onMounted(getSpecs)
        
</script>