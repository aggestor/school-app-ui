<template>
     <DeleteDialog @cancel="showDeleteLog = false" @confirm="onDeleteLevel" v-if="showDeleteLog" title="Voulez-vous vraiment supprimer ce niveau ?" text="La suppression d'un niveau entrainera la de toutes informations qui y sont liées"/>
    <div class="w-[95%] mt-2 mx-auto">
        <div class="flex border-b mb-3 py-2 items-center justify-between">
            <div class="flex  items-center">
                <GoBackAdminButton/>
                <h1 class="text-lg font-semibold ml-2">Liste de niveaux</h1>
            </div>
           <div class="flex items-center">
            <span class="w-7 h-7 mr-2 rounded bg-gray-200 grid place-items-center">{{ data?.length}}</span>
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

        <div v-for="l,i of data" :class="` py-2 text-sm  flex items-center justify-between ${i % 2 != 0 ? 'bg-gray-100' :''}`">
            <span class="w-1/12">{{i+1 }}</span>
            <span class="w-3/12 flex justify-center">{{l.niveau }}</span>
            <span class="w-3/12 flex justify-center">{{l.code }}</span>
            <span class="w-3/12 flex ">{{formatDateToAgo(l.updated_at) }}</span>
            <span class="w-[10%] flex items-center justify-around">
                <BlackLinkAsButton :to="'/ui/admin/levels/'+l.id+'/update'">
                    <PencilIcon class="w-5 h-5"/>
                </BlackLinkAsButton>
                <RedButtons @press="deleteLevel(l)">
                    <TrashIcon class="w-5 h-5"/>
                </RedButtons>
            </span>
        </div>
    </div>
</template>
<script setup>
import {ref} from "vue"
import Level from "../../../api/v2/Level";
import { formatDateToAgo } from "../../../helpers/format-date";
import BlueLinkAsButton from "../../../components/v2/BlueLinkAsButton.vue";
import BlackLinkAsButton from "../../../components/v2/BlackLinkAsButton.vue";
import RedButtons from "../../../components/v2/RedButtons.vue";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/vue/24/outline";
import GoBackAdminButton from "../../../components/GoBackAdminButton.vue";
import useFetch from "../../../hooks/useFetch";
import DeleteDialog from "../../../components/v2/DeleteDialog.vue";

const currentLevel = ref({})
const showDeleteLog = ref(false)
const {data ,loading} = useFetch(Level.get)
const onDeleteLevel = async () =>{
    const result = await Level.remove(currentLevel.value.id)
    if(result.success){
        const r = await Level.get()
        if(r.data){
            data.value = r.data
            currentLevel.value = {}
            showDeleteLog.value = false
        }
    }
}
const deleteLevel = l =>{
    currentLevel.value = l
    showDeleteLog.value = true
}
</script>