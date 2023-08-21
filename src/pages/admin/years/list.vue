<template>
    <div class="w-[95%] mt-2 mx-auto">
        <div class="flex border-b mb-3 py-2 items-center justify-between">
            <div class="flex  items-center">
                <GoBackAdminButton/>
                <h1 class="text-lg font-semibold ml-2">Liste des années scolaires</h1>
            </div>
           <div class="flex items-center">
            <span class="w-7 h-7 mr-2 rounded bg-gray-200 grid place-items-center">{{ years?.length}}</span>
            <BlueLinkAsButton to="/ui/admin/years/create">
                <PlusIcon class="w-5 h-5 mr-1"/> Créer une année scolaire
            </BlueLinkAsButton>
           </div>
        </div>
        <div class="border-b pb-1  font-semibold flex items-center justify-between">
            <span class="w-1/12">#</span>
            <span class="w-3/12 flex justify-center">Année scolaire</span>
            <span class="w-3/12 flex justify-center">Status</span>
            <span class="w-3/12 ">Maj</span>
            <span class="w-[10%] flex justify-center text-center">Actions</span>
        </div>

        <div v-for="y of years" :class="` py-2 text-sm  flex items-center justify-between ${years.indexOf(y) % 2 != 0 ? 'bg-gray-100' :''}`">
            <span class="w-1/12">{{years.indexOf(y)+1 }}</span>
            <span class="w-3/12 flex justify-center">{{y.year }}</span>
            <span class="w-3/12  justify-center space-x-2 flex">
                <span class="text-red-600" v-if="y.status == 0 ">Non activée</span> 
                <span class="text-green-600" v-if="y.status == 1 ">Activée</span>
                <span @click="setStatus(y)" v-if="y.status == 0 " class="rounded p-0.5 cursor-pointer text-white bg-green-600 hover:bg-green-700">Activer</span>
                <span @click="setStatus(y)" v-if="y.status == 1 " class="rounded p-0.5 cursor-pointer text-white bg-red-600 hover:bg-red-700">Desactiver</span>
            </span>
            <span class="w-3/12 flex ">{{formatDateToAgo(y.updated_at) }}</span>
            <span class="w-[10%] flex items-center justify-around">
                <BlackLinkAsButton :to="'/ui/admin/years/'+y.id+'/update'">
                    <PencilIcon class="w-5 h-5"/>
                </BlackLinkAsButton>
                <RedButtons @press="deleteYear">
                    <TrashIcon class="w-5 h-5"/>
                </RedButtons>
            </span>
        </div>
    </div>
</template>
<script setup>
import {onMounted, ref} from "vue"
import { formatDateToAgo } from "../../../helpers/format-date";
import BlueLinkAsButton from "../../../components/v2/BlueLinkAsButton.vue";
import BlackLinkAsButton from "../../../components/v2/BlackLinkAsButton.vue";
import RedButtons from "../../../components/v2/RedButtons.vue";
import {   PencilIcon, PlusIcon, TrashIcon } from "@heroicons/vue/24/outline";
import GoBackAdminButton from "../../../components/GoBackAdminButton.vue";
import Year from "../../../api/v2/Year";
const years = ref([])
const getYears = async () =>{
    const result = await Year.get()
    if(result.data){
        years.value = result.data
    }
}
const setStatus = async y =>{
    const result = await Year.toggleStatus(y.id)
    if(result.success){
        getYears()
    }
}
onMounted(()=>{
    getYears()
})
</script>