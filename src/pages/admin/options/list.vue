<template>
    <DeleteDialog @cancel="showDeleteLog = false" @confirm="onDeleteOption" v-if="showDeleteLog" title="Voulez-vous vraiment supprimer cette option ?" text="La suppression d'une option entrainera la de toutes informations qui y sont liées"/>
    <div class="w-[95%] mt-2 mx-auto">
        <div class="flex border-b mb-3 py-2 items-center justify-between">
            <div class="flex  items-center">
                <GoBackAdminButton/>
                <h1 class="text-lg font-semibold ml-2">Liste des options</h1>
            </div>
           <div class="flex items-center">
            <span class="w-7 h-7 mr-2 rounded bg-gray-200 grid place-items-center">{{ data?.length}}</span>
            <BlueLinkAsButton to="/ui/admin/options/create">
                <PlusIcon class="w-5 h-5 mr-1"/> Créer une option
            </BlueLinkAsButton>
           </div>
        </div>
        <div class="border-b pb-1  font-semibold flex items-center justify-between">
            <span class="w-1/12">#</span>
            <span class="w-3/12 flex justify-center">options</span>
            <span class="w-3/12 flex justify-center"></span>
            <span class="w-3/12 ">Maj</span>
            <span class="w-[10%] flex justify-center text-center">Actions</span>
        </div>

        <div v-for="o,i of data" :class="` py-2 text-sm  flex items-center justify-between ${i % 2 != 0 ? 'bg-gray-100' :''}`">
            <span class="w-1/12">{{i+1 }}</span>
            <span class="w-3/12 flex justify-center">{{o.option }}</span>
            <span class="w-3/12 flex justify-center"></span>
            <span class="w-3/12 flex ">{{formatDateToAgo(o.updated_at) }}</span>
            <span class="w-[10%] flex items-center justify-around">
                <BlackLinkAsButton :to="'/ui/admin/options/'+o.id+'/update'">
                    <PencilIcon class="w-5 h-5"/>
                </BlackLinkAsButton>
                <RedButtons @press="deleteOption(o)">
                    <TrashIcon class="w-5 h-5"/>
                </RedButtons>
            </span>
        </div>
    </div>
</template>
<script setup>
import {ref} from "vue"
import Option from "../../../api/v2/Option";
import { formatDateToAgo } from "../../../helpers/format-date";
import BlueLinkAsButton from "../../../components/v2/BlueLinkAsButton.vue";
import BlackLinkAsButton from "../../../components/v2/BlackLinkAsButton.vue";
import RedButtons from "../../../components/v2/RedButtons.vue";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/vue/24/outline";
import GoBackAdminButton from "../../../components/GoBackAdminButton.vue";
import DeleteDialog from "../../../components/v2/DeleteDialog.vue";
import useFetch from "../../../hooks/useFetch";

const {data,loading} = useFetch(Option.get)
const currentOption = ref({})
const showDeleteLog = ref(false)

const deleteOption = o =>{
    currentOption.value = o
    showDeleteLog.value = true
}
const onDeleteOption = async () =>{
    const result = await Option.remove(currentOption.value.id)
    if(result.success){
        const r = await Option.get()
        if(r.data){
            data.value = r.data
            currentOption.value = {}
            showDeleteLog.value = false
        }
    }
}
</script>