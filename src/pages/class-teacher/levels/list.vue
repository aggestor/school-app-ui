<template>
    <div class="w-[95%] mt-2 mx-auto">
        <div class="flex border-b mb-3 py-2 items-center justify-between">
            <div class="flex  items-center">
                <GoBackAdminButton/>
                <h1 class="text-lg font-semibold ml-2">Liste de tous les niveaux</h1>
            </div>
           <div class="flex items-center">
            <span class="w-7 h-7 mr-2 rounded bg-gray-200 grid place-items-center">{{ levels.length}}</span>
            <BlueLinkAsButton to="/ui/admin/levels/create">
                <PlusIcon class="w-5 h-5 mr-1"/> Créer un niveau
            </BlueLinkAsButton>
           </div>
        </div>
        <div class="border-b pb-1  font-semibold flex items-center justify-between">
            <span class="w-1/12">#</span>
            <span class="w-3/12 flex justify-center">Niveau</span>
            <span class="w-3/12 flex justify-center">Code</span>
            <span class="w-3/12 ">Updated</span>
            <span class="w-[10%] flex justify-center text-center">Actions</span>
        </div>

        <div v-for="l of levels" :class="` py-2 text-sm  flex items-center justify-between ${levels.indexOf(l) % 2 != 0 ? 'bg-gray-100' :''}`">
            <span class="w-1/12">{{levels.indexOf(l)+1 }}</span>
            <span class="w-3/12 flex justify-center">{{l.niveau }}</span>
            <span class="w-3/12 flex justify-center">{{l.code }}</span>
            <span class="w-3/12 flex ">{{formatDateToAgo(l.updated_at) }}</span>
            <span class="w-[10%] flex items-center justify-around">
                <BlackLinkAsButton :to="'/ui/admin/levels/'+l.id+'/update'">
                    <PencilIcon class="w-5 h-5"/>
                </BlackLinkAsButton>
                <RedButtons @press="deleteLevel">
                    <TrashIcon class="w-5 h-5"/>
                </RedButtons>
                <!-- <BlueLinkAsButton :to="'/ui/admin/levels/'+l.id">
                    <ArrowRightIcon class="w-5 h-5"/>
                </BlueLinkAsButton> -->
            </span>
        </div>
    </div>
</template>
<script setup>
import {onMounted, ref} from "vue"
import Level from "../../../api/v2/Level";
import { formatDateToAgo } from "../../../helpers/format-date";
import BlueLinkAsButton from "../../../components/v2/BlueLinkAsButton.vue";
import BlackLinkAsButton from "../../../components/v2/BlackLinkAsButton.vue";
import RedButtons from "../../../components/v2/RedButtons.vue";
import {  ArrowRightIcon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/vue/24/outline";
import GoBackAdminButton from "../../../components/GoBackAdminButton.vue";
const levels = ref([])
const getLevels = async () =>{
    const result = await Level.get()
    if(result.data){
        levels.value = result.data
    }
}
onMounted(()=>{
    getLevels()
})
</script>